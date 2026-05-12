import { works, projects, murals, slugifySegment } from "./content";

const site = "https://hizeart.vercel.app";

const staticRoutes = [
  "/",
  "/works/",
  "/available-works/",
  "/murals/",
  "/projects/",
  "/vr-art/",
  "/exhibitions/",
  "/about/",
  "/contact/",
  "/privacy-policy/"
];

const routes = [
  ...staticRoutes,
  ...works.map((work) => `/works/${work.slug || slugifySegment(work.id || work.title || "work")}/`),
  ...projects.map((project) => `/projects/${project.slug || slugifySegment(project.id || project.title || "project")}/`),
  ...murals.map((mural) => `/murals/${mural.slug || slugifySegment(mural.id || mural.title || "mural")}/`)
];

export function buildSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${new URL(route, site).toString()}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;
}
