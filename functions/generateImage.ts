import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Authenticate
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { prompt } = await req.json();

        if (!prompt) {
            return Response.json({ error: 'Prompt is required' }, { status: 400 });
        }

        // Generate Image
        const result = await base44.integrations.Core.GenerateImage({
            prompt: prompt,
            app_id: Deno.env.get("BASE44_APP_ID") // Best practice to pass app_id if context needed, though SDK handles it usually
        });

        return Response.json(result);

    } catch (error) {
        console.error("Generate Image Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});