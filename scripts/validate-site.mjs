import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const distDir = path.join(root, "dist");
const dataFiles = ["works.json", "projects.json", "murals.json"];
const requiredRoutes = [
  "index.html",
  "works/index.html",
  "available-works/index.html",
  "murals/index.html",
  "projects/index.html",
  "vr-art/index.html",
  "exhibitions/index.html",
  "about/index.html",
  "contact/index.html",
  "privacy-policy/index.html",
  "404.html"
];

const errors = [];

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, "data", file), "utf8"));
}

function assertImageExists(url, context) {
  if (!url || !url.startsWith("/assets/")) return;
  const file = path.join(publicDir, url);
  if (!fs.existsSync(file)) {
    errors.push(`Missing image for ${context}: ${url}`);
  }
}

for (const file of dataFiles) {
  const items = readJson(file);
  for (const item of items) {
    assertImageExists(item.image || item.mainImage, `${file}:${item.id || item.title}`);
    for (const image of item.gallery || []) {
      assertImageExists(image, `${file}:${item.id || item.title}:gallery`);
    }
    if (!item.alt && !item.description) {
      errors.push(`Missing alt/description context in ${file}:${item.id || item.title}`);
    }
  }
}

if (fs.existsSync(distDir)) {
  for (const route of requiredRoutes) {
    if (!fs.existsSync(path.join(distDir, route))) {
      errors.push(`Missing built route: ${route}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Site data and core routes validated.");
