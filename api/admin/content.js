import {
  assertEditableFile,
  editableFiles,
  methodAllowed,
  readJson,
  readRepoJson,
  requireAuth,
  sendJson,
  writeRepoFile
} from "../../src/server/admin-shared.js";

export default async function handler(req, res) {
  if (!methodAllowed(req, res, ["GET", "PUT"])) return;
  if (!requireAuth(req, res)) return;

  try {
    if (req.method === "GET") {
      const files = {};
      for (const file of editableFiles) {
        files[file] = await readRepoJson(file);
      }
      sendJson(res, 200, { files });
      return;
    }

    const { files, message } = await readJson(req);
    if (!files || typeof files !== "object") {
      sendJson(res, 400, { error: "Missing files payload" });
      return;
    }

    const updated = [];
    for (const [filePath, value] of Object.entries(files)) {
      assertEditableFile(filePath);
      const content = `${JSON.stringify(value, null, 2)}\n`;
      await writeRepoFile(filePath, content, message || "admin: update site content");
      updated.push(filePath);
    }

    sendJson(res, 200, { ok: true, updated });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Content update failed" });
  }
}
