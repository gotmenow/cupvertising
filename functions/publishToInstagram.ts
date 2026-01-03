import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { content, imageUrl } = await req.json();

        if (!imageUrl) {
            return Response.json({ error: 'Image URL is required for Instagram' }, { status: 400 });
        }

        const accessToken = Deno.env.get("FB_PAGE_ACCESS_TOKEN"); // Same token usually works if linked
        const igAccountId = Deno.env.get("IG_ACCOUNT_ID");

        if (!accessToken || !igAccountId) {
            return Response.json({ error: 'Instagram configuration missing' }, { status: 500 });
        }

        // 1. Create Media Container
        const containerUrl = `https://graph.facebook.com/v19.0/${igAccountId}/media`;
        const containerResp = await fetch(containerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image_url: imageUrl,
                caption: content,
                access_token: accessToken
            })
        });

        const containerData = await containerResp.json();

        if (!containerResp.ok) {
            console.error("IG Container Error:", containerData);
            return Response.json({ error: containerData.error?.message }, { status: 500 });
        }

        const creationId = containerData.id;

        // 2. Publish Media
        const publishUrl = `https://graph.facebook.com/v19.0/${igAccountId}/media_publish`;
        const publishResp = await fetch(publishUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                creation_id: creationId,
                access_token: accessToken
            })
        });

        const publishData = await publishResp.json();

        if (!publishResp.ok) {
            console.error("IG Publish Error:", publishData);
            return Response.json({ error: publishData.error?.message }, { status: 500 });
        }

        return Response.json({ success: true, id: publishData.id });

    } catch (error) {
        console.error("Instagram Publish Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});