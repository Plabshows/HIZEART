import { methodAllowed, normalizeUploadTarget, readJson, requireAuth, sendJson, writeRepoFile } from "../../src/server/admin-shared.js";

export default async function handler(req, res) {
  if (!methodAllowed(req, res, ["POST"])) return;
  if (!requireAuth(req, res)) return;

  try {
    const { filename, folder, contentBase64 } = await readJson(req);
    if (!filename || !contentBase64) {
      sendJson(res, 400, { error: "Missing image filename or content" });
      return;
    }

    const cleanBase64 = String(contentBase64).replace(/^data:image\/[a-z0-9.+-]+;base64,/i, "");
    const buffer = Buffer.from(cleanBase64, "base64");
    if (!buffer.length) {
      sendJson(res, 400, { error: "Uploaded image is empty" });
      return;
    }
    if (buffer.length > 8 * 1024 * 1024) {
      sendJson(res, 413, { error: "Image is too large. Please upload an optimized image under 8 MB." });
      return;
    }

    const target = normalizeUploadTarget(folder, filename);
    await writeRepoFile(target.repoPath, buffer, `admin: upload ${target.repoPath}`);
    sendJson(res, 200, { ok: true, path: target.publicPath, repoPath: target.repoPath });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Image upload failed" });
  }
}
