import { works, projects, murals } from "./content";

const site = "https://hizeart.com";

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
  ...works.map((work) => `/works/${work.id}/`),
  ...projects.map((project) => `/projects/${project.id}/`),
  ...murals.map((mural) => `/murals/${mural.id}/`)
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
