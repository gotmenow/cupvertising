import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { content, imageUrl } = await req.json();

        if (!content) {
            return Response.json({ error: 'Content is required' }, { status: 400 });
        }

        const pageAccessToken = Deno.env.get("FB_PAGE_ACCESS_TOKEN");
        const pageId = Deno.env.get("FB_PAGE_ID");

        if (!pageAccessToken || !pageId) {
            return Response.json({ error: 'Facebook configuration missing' }, { status: 500 });
        }

        let url;
        let body;

        if (imageUrl) {
            url = `https://graph.facebook.com/v19.0/${pageId}/photos`;
            body = {
                url: imageUrl,
                message: content,
                access_token: pageAccessToken
            };
        } else {
            url = `https://graph.facebook.com/v19.0/${pageId}/feed`;
            body = {
                message: content,
                access_token: pageAccessToken
            };
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Facebook API Error:", data);
            return Response.json({ error: data.error?.message || 'Failed to publish to Facebook' }, { status: 500 });
        }

        return Response.json({ success: true, id: data.id || data.post_id });

    } catch (error) {
        console.error("Facebook Publish Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});