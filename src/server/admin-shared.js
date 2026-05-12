import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

export const editableFiles = [
  "data/pages.json",
  "data/works.json",
  "data/projects.json",
  "data/murals.json",
  "data/exhibitions.json",
  "data/collaborations.json",
  "data/assets.json"
];

const uploadFolders = new Set([
  "canvas",
  "murals",
  "graffiti",
  "vr-art",
  "projects",
  "about",
  "featured",
  "uncategorized",
  "uploads"
]);

const cookieName = "hize_admin_session";
const repo = process.env.GITHUB_REPO || "Plabshows/HIZEART";
const branch = process.env.GITHUB_BRANCH || "main";

export function sendJson(res, status, payload, headers = {}) {
  res.statusCode = status;
  for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

export async function readJson(req) {
  if (req.body) {
    return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export function methodAllowed(req, res, methods) {
  if (methods.includes(req.method)) return true;
  res.setHeader("Allow", methods.join(", "));
  sendJson(res, 405, { error: "Method not allowed" });
  return false;
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function sign(value) {
  const secret = process.env.SESSION_SECRET || "";
  if (secret.length < 24) throw new Error("Missing or weak SESSION_SECRET environment variable");
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function passwordHash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function safeCompare(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function parseCookies(req) {
  return Object.fromEntries(
    String(req.headers.cookie || "")
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

export function makeSession(email) {
  const payload = base64url(JSON.stringify({ email, exp: Date.now() + 1000 * 60 * 60 * 8 }));
  return `${payload}.${sign(payload)}`;
}

export function verifySession(req) {
  const token = parseCookies(req)[cookieName] || String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  if (!safeCompare(sign(payload), signature)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data.exp || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function requireAuth(req, res) {
  const session = verifySession(req);
  if (session) return session;
  sendJson(res, 401, { error: "Not authenticated" });
  return null;
}

export function sessionCookie(token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${cookieName}=${encodeURIComponent(token)}; Path=/; Max-Age=28800; HttpOnly; SameSite=Lax${secure}`;
}

export function expiredSessionCookie() {
  return `${cookieName}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`;
}

export function checkLogin(email, password) {
  const expectedEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const suppliedEmail = String(email || "").trim().toLowerCase();
  if (!expectedEmail || suppliedEmail !== expectedEmail) return false;

  const hash = process.env.ADMIN_PASSWORD_HASH || "";
  if (hash) return safeCompare(passwordHash(String(password || "")), hash.trim());

  const plain = process.env.ADMIN_PASSWORD || "";
  if (plain) return safeCompare(String(password || ""), plain);

  return false;
}

export function adminConfigStatus() {
  const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const hasPasswordHash = Boolean((process.env.ADMIN_PASSWORD_HASH || "").trim());
  const hasPassword = Boolean(process.env.ADMIN_PASSWORD);
  const sessionSecret = process.env.SESSION_SECRET || "";
  return {
    adminEmailConfigured: Boolean(adminEmail),
    adminEmail,
    passwordConfigured: hasPassword || hasPasswordHash,
    passwordMode: hasPasswordHash ? "hash" : hasPassword ? "plain" : "missing",
    sessionSecretConfigured: sessionSecret.length >= 24,
    githubRepoConfigured: Boolean(process.env.GITHUB_REPO || "Plabshows/HIZEART"),
    githubBranchConfigured: Boolean(process.env.GITHUB_BRANCH || "main"),
    githubTokenConfigured: Boolean(process.env.GITHUB_TOKEN)
  };
}

function githubHeaders() {
  if (!process.env.GITHUB_TOKEN) throw new Error("Missing GITHUB_TOKEN environment variable");
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json"
  };
}

async function github(pathname, options = {}) {
  const response = await fetch(`https://api.github.com/repos/${repo}/${pathname}`, {
    ...options,
    headers: { ...githubHeaders(), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `GitHub API error ${response.status}`);
  }
  return data;
}

export async function readRepoJson(filePath) {
  if (!process.env.GITHUB_TOKEN) {
    const local = await fs.readFile(path.join(process.cwd(), filePath), "utf8");
    return JSON.parse(local);
  }

  const data = await github(`contents/${encodeURIComponentPath(filePath)}?ref=${encodeURIComponent(branch)}`);
  return JSON.parse(Buffer.from(data.content, "base64").toString("utf8"));
}

export async function writeRepoFile(filePath, content, message) {
  if (!process.env.GITHUB_TOKEN) throw new Error("Missing GITHUB_TOKEN environment variable");

  let sha;
  try {
    const current = await github(`contents/${encodeURIComponentPath(filePath)}?ref=${encodeURIComponent(branch)}`);
    sha = current.sha;
  } catch (error) {
    if (!String(error.message || "").includes("Not Found")) throw error;
  }

  return github(`contents/${encodeURIComponentPath(filePath)}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
      sha
    })
  });
}

export function assertEditableFile(filePath) {
  if (!editableFiles.includes(filePath)) {
    throw new Error(`File is not editable: ${filePath}`);
  }
}

export function normalizeUploadTarget(folder, filename) {
  const safeFolder = String(folder || "uploads").replace(/[^a-z0-9-]/gi, "").toLowerCase() || "uploads";
  if (!uploadFolders.has(safeFolder)) throw new Error("Upload folder is not allowed");

  const ext = path.extname(filename || "").toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)) {
    throw new Error("Only jpg, png, webp and gif images are allowed");
  }

  const base = path
    .basename(filename, ext)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const safeName = `${base || "image"}-${stamp}${ext}`;
  const repoPath = `public/assets/images/uploads/${safeFolder}/${safeName}`;
  const publicPath = `/assets/images/uploads/${safeFolder}/${safeName}`;
  return { repoPath, publicPath };
}

function encodeURIComponentPath(filePath) {
  return filePath.split("/").map(encodeURIComponent).join("/");
}
