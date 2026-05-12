import { adminConfigStatus, methodAllowed, sendJson } from "../../src/server/admin-shared.js";

export default async function handler(req, res) {
  if (!methodAllowed(req, res, ["GET"])) return;
  const status = adminConfigStatus();
  sendJson(res, 200, {
    ok:
      status.adminEmailConfigured &&
      status.passwordConfigured &&
      status.sessionSecretConfigured &&
      status.githubTokenConfigured,
    ...status
  });
}
