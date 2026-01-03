import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { GoogleSpreadsheet } from 'npm:google-spreadsheet@4.1.1'; // We need to use raw fetch or this package if it supports raw token

// Using raw fetch for Google Sheets to avoid complex auth setup with service accounts
// We are using the User/App Connector Token

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // This is a scheduled task, so it runs as "admin" / service role usually, 
        // OR we need to impersonate the user who owns the sheet.
        // App Connectors are tied to the APP OWNER/DEVELOPER.
        // So we use base44.asServiceRole.connectors.getAccessToken('googlesheets')
        
        const accessToken = await base44.asServiceRole.connectors.getAccessToken('googlesheets');
        if (!accessToken) {
            return Response.json({ error: 'Google Sheets not authorized' }, { status: 500 });
        }

        const spreadsheetId = Deno.env.get("GOOGLE_SHEET_ID");
        if (!spreadsheetId) {
            return Response.json({ error: 'GOOGLE_SHEET_ID not set' }, { status: 500 });
        }

        // 1. Get Sheet Data
        // Assume Sheet1, Columns: Date (A), Topic (B), Status (C)
        const range = 'Sheet1!A2:C'; // Skip header
        const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;
        
        const getResp = await fetch(getUrl, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        
        if (!getResp.ok) {
            return Response.json({ error: 'Failed to read sheet' }, { status: 500 });
        }

        const data = await getResp.json();
        const rows = data.values || [];
        
        // Format today as DD/MM/YYYY
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yyyy = now.getFullYear();
        const todayDDMMYYYY = `${dd}/${mm}/${yyyy}`;
        
        const processed = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const date = row[0]; // Expecting DD/MM/YYYY
            const topic = row[1];
            const status = row[2];

            // Check if date is today (exact string match) and status is not 'Posted'
            if (date === todayDDMMYYYY && status !== 'Posted' && topic) {
                console.log(`Processing topic: ${topic}`);
                
                // 2. Generate Content - Separate for each platform
                const llmResp = await base44.integrations.Core.InvokeLLM({
                    prompt: `Draft 3 distinct social media posts about: "${topic}".
                    1. LinkedIn: Professional tone, industry insights, business hashtags.
                    2. Facebook: Engaging, community-focused, casual but professional.
                    3. Instagram: Visual storytelling style, catchy hook, 15-20 relevant hashtags.
                    
                    Return a JSON object with keys: linkedin, facebook, instagram.`,
                    app_id: Deno.env.get("BASE44_APP_ID"),
                    response_json_schema: {
                        type: "object",
                        properties: {
                            linkedin: { type: "string" },
                            facebook: { type: "string" },
                            instagram: { type: "string" }
                        },
                        required: ["linkedin", "facebook", "instagram"]
                    }
                });

                // Handle response - InvokeLLM with schema returns object directly
                const posts = typeof llmResp === 'string' ? JSON.parse(llmResp) : llmResp;

                // 3. Generate Image
                const imgResp = await base44.integrations.Core.GenerateImage({
                    prompt: `Professional, high-quality photorealistic image representing: ${topic}. Clean composition, suitable for social media.`,
                    app_id: Deno.env.get("BASE44_APP_ID")
                });
                const imageUrl = imgResp.url;

                // 4. Publish to All Platforms with specific content
                const results = {};

                // LinkedIn
                try {
                    const liResp = await base44.asServiceRole.functions.invoke('publishToLinkedIn', { content: posts.linkedin, imageUrl });
                    results.linkedin = liResp.data.success ? 'Success' : 'Failed';
                } catch (e) { results.linkedin = 'Error'; }

                // Facebook
                try {
                    const fbResp = await base44.asServiceRole.functions.invoke('publishToFacebook', { content: posts.facebook, imageUrl });
                    results.facebook = fbResp.data.success ? 'Success' : 'Failed';
                } catch (e) { results.facebook = 'Error'; }

                // Instagram
                try {
                    const igResp = await base44.asServiceRole.functions.invoke('publishToInstagram', { content: posts.instagram, imageUrl });
                    results.instagram = igResp.data.success ? 'Success' : 'Failed';
                } catch (e) { results.instagram = 'Error'; }

                // 5. Update Status in Sheet
                // Row index is i + 2 (header + 0-based)
                const rowIndex = i + 2;
                const updateRange = `Sheet1!C${rowIndex}`;
                
                await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${updateRange}?valueInputOption=RAW`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ values: [['Posted']] })
                });

                processed.push({ topic, results });
            }
        }

        return Response.json({ processed });

    } catch (error) {
        console.error("Scheduler Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});