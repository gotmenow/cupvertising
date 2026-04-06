import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // 1. Authenticate User
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Parse Payload
        const { content, imageUrl, visibility = "PUBLIC" } = await req.json();

        if (!content) {
            return Response.json({ error: 'Content is required' }, { status: 400 });
        }

        // 3. Get LinkedIn Access Token
        // using service role to get the connector token for the user (app owner context in this simplified flow, 
        // or user context if the connector is user-linked. Base44 connectors are currently app-owner linked).
        // NOTE: App Connectors connect the APP BUILDER's account. 
        // If this is for the end-user, we might need a different approach, but for now assuming this is an internal tool or the user IS the builder.
        const accessToken = await base44.asServiceRole.connectors.getAccessToken("linkedin");
        
        if (!accessToken) {
            return Response.json({ error: 'LinkedIn not connected. Please authorize LinkedIn in the dashboard.' }, { status: 400 });
        }

        // 4. Get User's LinkedIn URN (ID)
        const profileResp = await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!profileResp.ok) {
             const errorText = await profileResp.text();
             console.error("LinkedIn Profile Error:", errorText);
             return Response.json({ error: 'Failed to fetch LinkedIn profile', details: errorText }, { status: 500 });
        }

        const profileData = await profileResp.json();
        const personUrn = profileData.sub; // 'sub' is the unique identifier in OpenID Connect

        // 5. Handle Image Upload (if present)
        let assetUrn = null;

        if (imageUrl) {
            // A. Register Upload
            const registerBody = {
                "registerUploadRequest": {
                    "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
                    "owner": `urn:li:person:${personUrn}`,
                    "serviceRelationships": [{
                        "relationshipType": "OWNER",
                        "identifier": "urn:li:userGeneratedContent"
                    }]
                }
            };

            const registerResp = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerBody)
            });

            if (!registerResp.ok) {
                const err = await registerResp.text();
                console.error("LinkedIn Asset Register Error:", err);
                // Continue without image or fail? Let's fail to let user know.
                return Response.json({ error: 'Failed to register image upload', details: err }, { status: 500 });
            }

            const registerData = await registerResp.json();
            const uploadUrl = registerData.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl;
            assetUrn = registerData.value.asset;

            // B. Download Image
            const imageResp = await fetch(imageUrl);
            if (!imageResp.ok) throw new Error("Failed to download generated image");
            const imageBlob = await imageResp.blob();

            // C. Upload Image to LinkedIn
            const uploadResp = await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                body: imageBlob
            });

            if (!uploadResp.ok) {
                const err = await uploadResp.text();
                console.error("LinkedIn Image Upload Error:", err);
                return Response.json({ error: 'Failed to upload image binary', details: err }, { status: 500 });
            }
        }

        // 6. Publish Post
        const shareContent = {
            shareCommentary: {
                text: content
            },
            shareMediaCategory: assetUrn ? "IMAGE" : "NONE"
        };

        if (assetUrn) {
            shareContent.media = [{
                status: "READY",
                description: { text: "Generated Image" },
                media: assetUrn,
                title: { text: "Image" }
            }];
        }

        const postBody = {
            author: `urn:li:person:${personUrn}`,
            lifecycleState: "PUBLISHED",
            specificContent: {
                "com.linkedin.ugc.ShareContent": shareContent
            },
            visibility: {
                "com.linkedin.ugc.MemberNetworkVisibility": visibility
            }
        };

        const postResp = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        });

        if (!postResp.ok) {
            const errorText = await postResp.text();
            console.error("LinkedIn Publish Error:", errorText);
            return Response.json({ error: 'Failed to publish to LinkedIn', details: errorText }, { status: 500 });
        }

        const postData = await postResp.json();

        return Response.json({ 
            success: true, 
            message: 'Published successfully', 
            postId: postData.id 
        });

    } catch (error) {
        console.error("Function Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});