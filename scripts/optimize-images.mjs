import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/assets/images");
const extensions = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(fullPath) : fullPath;
    })
  );
  return files.flat();
}

const files = (await walk(root)).filter((file) => extensions.has(path.extname(file).toLowerCase()));

for (const file of files) {
  const output = file.replace(/\.(jpe?g|png)$/i, ".webp");
  const image = sharp(file).rotate();
  const metadata = await image.metadata();
  const width = metadata.width && metadata.width > 1800 ? 1800 : metadata.width;

  await image
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(output);
}

console.log(`Optimized ${files.length} images to WebP.`);
