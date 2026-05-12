import { adminConfigStatus, methodAllowed, readRepoJson, sendJson } from "../../src/server/admin-shared.js";

export default async function handler(req, res) {
  if (!methodAllowed(req, res, ["GET"])) return;
  const status = adminConfigStatus();
  let githubContentRead = false;
  let githubReadError = null;

  if (status.githubTokenConfigured) {
    try {
      await readRepoJson("data/works.json");
      githubContentRead = true;
    } catch (error) {
      githubReadError = error.message || "GitHub content read failed";
    }
  }

  sendJson(res, 200, {
    ok:
      status.adminEmailConfigured &&
      status.passwordConfigured &&
      status.sessionSecretConfigured &&
      status.githubTokenConfigured &&
      githubContentRead,
    ...status,
    githubContentRead,
    githubReadError
  });
}
