import { checkLogin, makeSession, methodAllowed, readJson, sendJson, sessionCookie } from "../../src/server/admin-shared.js";

export default async function handler(req, res) {
  if (!methodAllowed(req, res, ["POST"])) return;

  try {
    const { email, password } = await readJson(req);
    if (!checkLogin(email, password)) {
      sendJson(res, 401, { error: "Invalid email or password" });
      return;
    }

    const token = makeSession(String(email).trim().toLowerCase());
    sendJson(res, 200, { ok: true }, { "Set-Cookie": sessionCookie(token) });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Login failed" });
  }
}
