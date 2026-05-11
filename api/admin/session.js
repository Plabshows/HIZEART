import { methodAllowed, sendJson, verifySession } from "../../src/server/admin-shared.js";

export default async function handler(req, res) {
  if (!methodAllowed(req, res, ["GET"])) return;
  const session = verifySession(req);
  sendJson(res, 200, { authenticated: Boolean(session), email: session?.email || null });
}
