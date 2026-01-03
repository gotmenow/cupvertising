import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Use Service Role for scheduled task
        // Verify app_id for InvokeLLM context
        const appId = Deno.env.get("BASE44_APP_ID");

        console.log("Starting Scheduled Social Engagement...");

        // 1. Find Trend & Generate Content
        // We use the Persona from SocialEngager agent
        const systemPrompt = `You are the Lead AI Growth Strategist for Vertising (a child firm of Gotmenow LTD). 
        
        CORE KNOWLEDGE:
        - Product: 100% Nature-Free (plastic-free) supplies.
        - Model: "Zero-Cost" for SMEs, Advertiser-funded (£330/1k units).
        - Innovation: Triple-Win Affiliate Model + Multi-Stakeholder App.
        - URL: www.vertising.co.uk
        
        PERSONA:
        - Human Touch: Empathy, curiosity, professional wit. No corporate jargon.
        - Status: Thought Leader in Sustainability and AdTech.
        - Perspective: Anti-"Digital Waste", Pro-"Local High Street".
        
        GOAL:
        - Engage in high-traffic conversations to attract Investors, SMEs, and Advertisers.
        - Bridge trending topics to the Vertising solution.`;

        const llmResponse = await base44.integrations.Core.InvokeLLM({
            app_id: appId,
            prompt: `1. Search the internet for ONE trending news story, article, or viral discussion from the last 24 hours in the UK related to:
               - "Cost of Living" crisis for SMEs/Hospitality
               - "Sustainability" or "Plastic Free" mandates
               - "Marketing Trends" or "OOH Advertising"
            
            2. Based on this trending topic, write a "Thought Leadership" social media post.
               - Hook: Acknowledge the trend/news (Human Touch).
               - Pivot: Explain how Vertising's "Zero-Cost" or "Triple-Win" model addresses it.
               - CTA: Visit www.vertising.co.uk.
               - Include 3-5 relevant hashtags (e.g., #Sustainability, #AdTech).
            
            3. Return ONLY a JSON object with this structure:
               {
                 "topic_summary": "Short summary of the trend found",
                 "post_content": "The actual social media post text",
                 "image_prompt": "A description for an AI image generator to create a relevant, professional visual for this post"
               }`,
            add_context_from_internet: true,
            response_json_schema: {
                type: "object",
                properties: {
                    topic_summary: { type: "string" },
                    post_content: { type: "string" },
                    image_prompt: { type: "string" }
                },
                required: ["topic_summary", "post_content", "image_prompt"]
            }
        });

        // Parse LLM response (it comes as object because json_schema was used)
        const result = typeof llmResponse === 'string' ? JSON.parse(llmResponse) : llmResponse;
        
        console.log(`Trend found: ${result.topic_summary}`);

        // 2. Generate Image
        const imgResp = await base44.integrations.Core.GenerateImage({
            prompt: `Professional, editorial style photo or 3D render: ${result.image_prompt}. High quality, suitable for LinkedIn/Instagram business.`,
            app_id: appId
        });
        const imageUrl = imgResp.url;

        // 3. Publish
        const publishResults = {};
        const { post_content } = result;

        // LinkedIn
        try {
            const li = await base44.asServiceRole.functions.invoke('publishToLinkedIn', { content: post_content, imageUrl });
            publishResults.linkedin = li.data.success ? 'Success' : li.data.error;
        } catch (e) { publishResults.linkedin = e.message; }

        // Facebook
        try {
            const fb = await base44.asServiceRole.functions.invoke('publishToFacebook', { content: post_content, imageUrl });
            publishResults.facebook = fb.data.success ? 'Success' : fb.data.error;
        } catch (e) { publishResults.facebook = e.message; }

        // Instagram
        try {
            const ig = await base44.asServiceRole.functions.invoke('publishToInstagram', { content: post_content, imageUrl });
            publishResults.instagram = ig.data.success ? 'Success' : ig.data.error;
        } catch (e) { publishResults.instagram = e.message; }

        return Response.json({
            status: "Completed",
            trend: result.topic_summary,
            results: publishResults
        });

    } catch (error) {
        console.error("Scheduled Engagement Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});