import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Use Service Role for scheduled task
        // Verify app_id for InvokeLLM context
        const appId = Deno.env.get("BASE44_APP_ID");

        console.log("Starting Scheduled Social Engagement...");

        // 1. Find Trend & Generate Content
        // We use the SocialEngager persona for curating content
        const systemPrompt = `You are the Lead Social Media Engagement Agent for Vertising.
        Your goal is to REPOST and COMMENT on trending topics. You do NOT create original posts.
        
        CORE KNOWLEDGE:
        - Product: 100% Nature-Free supplies.
        - Model: "Zero-Cost" for SMEs, Advertiser-funded.
        - Innovation: Triple-Win Affiliate Model.
        - URL: www.vertising.co.uk
        
        PERSONA:
        - Thought Leader in Sustainability and AdTech.
        - Anti-"Digital Waste", Pro-"Local High Street".`;

        const llmResponse = await base44.integrations.Core.InvokeLLM({
            app_id: appId,
            prompt: `1. Search the internet for ONE trending news story, article, or high-traffic discussion from the last 24 hours in the UK related to:
               - "Cost of Living" crisis for SMEs/Hospitality
               - "Sustainability" mandates
               - "Marketing Trends" or "OOH Advertising"
               
               IMPORTANT: Return the URL of the article/discussion found.
            
            2. Generate "Engagement Actions" for this topic:
               - Repost Caption: A 2-line "Value-Add" caption for sharing this link. Connect the story to Vertising's "Triple-Win" ecosystem.
               - Comment Drafts: 3 variations (Supportive Insight, Disruptive Statistic, Direct Invitation).
            
            3. Return ONLY a JSON object with this structure:
               {
                 "found_url": "The URL of the news story/article found",
                 "topic_summary": "Short summary of the trend",
                 "repost_caption": "The value-add caption to use when sharing the link",
                 "comment_drafts": ["Draft 1", "Draft 2", "Draft 3"]
               }`,
            add_context_from_internet: true,
            response_json_schema: {
                type: "object",
                properties: {
                    found_url: { type: "string" },
                    topic_summary: { type: "string" },
                    repost_caption: { type: "string" },
                    comment_drafts: { type: "array", items: { type: "string" } }
                },
                required: ["found_url", "topic_summary", "repost_caption", "comment_drafts"]
            }
        });

        // Parse LLM response
        const result = typeof llmResponse === 'string' ? JSON.parse(llmResponse) : llmResponse;
        
        console.log(`Trend found: ${result.topic_summary} (${result.found_url})`);

        // 2. Automate "Reposting" (Sharing the link)
        // Note: We can't automate "Commenting" on external posts easily without specific post IDs.
        // So we focus the automation on SHARING the content (Reposting).
        
        const publishResults = {};
        const postContent = `${result.repost_caption}\n\n🔗 Read more: ${result.found_url}\n\n#Vertising #TripleWin #Sustainability`;
        
        // LinkedIn (Share URL)
        try {
            const li = await base44.asServiceRole.functions.invoke('publishToLinkedIn', { content: postContent });
            publishResults.linkedin = li.data.success ? 'Success (Reposted)' : li.data.error;
        } catch (e) { publishResults.linkedin = e.message; }

        // Facebook (Share URL)
        try {
            const fb = await base44.asServiceRole.functions.invoke('publishToFacebook', { content: postContent });
            publishResults.facebook = fb.data.success ? 'Success (Reposted)' : fb.data.error;
        } catch (e) { publishResults.facebook = e.message; }

        // Instagram (Can't share links easily in feed, maybe skip or post visual)
        // For now, we skip IG for "Reposts" of links as it requires an image.
        publishResults.instagram = "Skipped (IG doesn't support text/link reposts easily)";

        return Response.json({
            status: "Completed",
            trend: result.topic_summary,
            action: "Reposted/Shared Link",
            generated_comments: result.comment_drafts, // Logged for reference
            results: publishResults
        });

    } catch (error) {
        console.error("Scheduled Engagement Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});