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
        const today = new Date().toISOString().split('T')[0];
        
        const processed = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const date = row[0];
            const topic = row[1];
            const status = row[2];

            // Check if date is today (or past pending) and status is not 'Posted'
            // Simple string compare for now. Assume format YYYY-MM-DD
            if (date === today && status !== 'Posted' && topic) {
                console.log(`Processing topic: ${topic}`);
                
                // 2. Generate Content
                // Use InvokeLLM to draft the post
                const llmResp = await base44.integrations.Core.InvokeLLM({
                    prompt: `Draft a professional social media post about: "${topic}". 
                    Include emojis and 3-5 hashtags. 
                    Keep it suitable for LinkedIn, Facebook, and Instagram.
                    Return ONLY the text content, no intro/outro.`,
                    app_id: Deno.env.get("BASE44_APP_ID")
                });
                const postContent = typeof llmResp === 'string' ? llmResp : JSON.stringify(llmResp);

                // 3. Generate Image
                const imgResp = await base44.integrations.Core.GenerateImage({
                    prompt: `Professional, modern, high-quality image representing: ${topic}`,
                    app_id: Deno.env.get("BASE44_APP_ID")
                });
                const imageUrl = imgResp.url;

                // 4. Publish to All Platforms
                const results = {};

                // LinkedIn
                try {
                    const liResp = await base44.asServiceRole.functions.invoke('publishToLinkedIn', { content: postContent, imageUrl });
                    results.linkedin = liResp.data.success ? 'Success' : 'Failed';
                } catch (e) { results.linkedin = 'Error'; }

                // Facebook
                try {
                    const fbResp = await base44.asServiceRole.functions.invoke('publishToFacebook', { content: postContent, imageUrl });
                    results.facebook = fbResp.data.success ? 'Success' : 'Failed';
                } catch (e) { results.facebook = 'Error'; }

                // Instagram
                try {
                    const igResp = await base44.asServiceRole.functions.invoke('publishToInstagram', { content: postContent, imageUrl });
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