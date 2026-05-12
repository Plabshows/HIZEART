const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://omhjbjvjzkxjmqqionbs.supabase.co";
const SUPABASE_KEY =
  process.env.PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "sb_publishable_nbqGkvXvIrKDKE0Mk3cIgg_RZA1exc9";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@hizeart.com";

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Robots-Tag", "noindex, nofollow");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const authorization = request.headers.authorization || "";
  if (!authorization.startsWith("Bearer ")) {
    return response.status(401).json({ error: "Missing Supabase session token" });
  }

  try {
    const user = await verifySupabaseUser(authorization);
    if (user.email !== ADMIN_EMAIL) {
      return response.status(403).json({ error: "This Supabase user is not allowed to trigger deploys" });
    }

    const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (!hookUrl) {
      return response.status(200).json({
        ok: true,
        skipped: true,
        message: "VERCEL_DEPLOY_HOOK_URL is not configured."
      });
    }

    const deployResponse = await fetch(hookUrl, { method: "POST" });
    if (!deployResponse.ok) {
      const message = await deployResponse.text().catch(() => "");
      return response.status(502).json({
        error: message || `Vercel deploy hook failed with status ${deployResponse.status}`
      });
    }

    return response.status(200).json({ ok: true, skipped: false });
  } catch (error) {
    return response.status(401).json({ error: error.message || "Invalid Supabase session" });
  }
}

async function verifySupabaseUser(authorization) {
  const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: authorization
    }
  });

  if (!userResponse.ok) {
    throw new Error("Invalid Supabase session");
  }

  return userResponse.json();
}
