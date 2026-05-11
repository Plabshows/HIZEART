import { expiredSessionCookie, methodAllowed, sendJson } from "../../src/server/admin-shared.js";

export default async function handler(req, res) {
  if (!methodAllowed(req, res, ["POST"])) return;
  sendJson(res, 200, { ok: true }, { "Set-Cookie": expiredSessionCookie() });
}
