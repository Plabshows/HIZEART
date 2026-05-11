import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const publicDir = path.resolve("public");
const files = [];
const issues = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    if (entry.isFile() && file.endsWith(".html")) files.push(file);
  }
}

walk(dist);

for (const file of files) {
  const rel = path.relative(dist, file);
  const html = fs.readFileSync(file, "utf8");
  const requiredMeta = [
    "<title>",
    'name="description"',
    'rel="canonical"',
    'property="og:title"',
    'property="og:description"',
    'property="og:image"',
    'name="twitter:card"'
  ];

  for (const needle of requiredMeta) {
    if (!html.includes(needle)) issues.push(`${rel}: missing ${needle}`);
  }

  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  for (const image of images) {
    if (!/\balt="[^"]+"/.test(image)) issues.push(`${rel}: image missing alt`);
    if (/alt="(?:image|photo|artwork|IMG_?\d*)"/i.test(image)) {
      issues.push(`${rel}: generic alt text`);
    }
  }

  const localAssets = [...html.matchAll(/(?:href|src|srcset)="(\/assets\/[^" ]+)/g)].map((match) => match[1]);
  for (const asset of localAssets) {
    if (!fs.existsSync(path.join(publicDir, asset))) {
      issues.push(`${rel}: missing asset ${asset}`);
    }
  }

  const localLinks = [...html.matchAll(/(?:href|src)="(\/[^"]+)"/g)]
    .map((match) => match[1])
    .filter((url) => !url.startsWith("/_astro/") && !url.startsWith("/assets/") && !url.includes("?") && !url.includes("#"))
    .filter((url) => !url.endsWith(".xml") && !url.endsWith(".txt") && !url.endsWith(".html"));

  for (const url of localLinks) {
    const normalized = url.replace(/^\//, "");
    const asDirectory = path.join(dist, normalized, "index.html");
    const asFile = path.join(dist, normalized);
    if (!fs.existsSync(asDirectory) && !fs.existsSync(asFile)) {
      issues.push(`${rel}: missing internal link ${url}`);
    }
  }
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log(`HTML QA passed for ${files.length} pages.`);
