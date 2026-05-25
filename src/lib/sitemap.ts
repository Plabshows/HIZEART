import { workDetailItems, projects, murals, slugifySegment } from "./content";
import { SITE_URL } from "./site";

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

const localizedStaticRoutes = staticRoutes.flatMap((route) => [route, route === "/" ? "/es/" : `/es${route}`]);

const routes = [
  ...localizedStaticRoutes,
  ...workDetailItems.flatMap((work) => {
    const path = `/works/${work.slug || slugifySegment(work.id || work.title || "work")}/`;
    return [path, `/es${path}`];
  }),
  ...projects.flatMap((project) => {
    const path = `/projects/${project.slug || slugifySegment(project.id || project.title || "project")}/`;
    return [path, `/es${path}`];
  }),
  ...murals.flatMap((mural) => {
    const path = `/murals/${mural.slug || slugifySegment(mural.id || mural.title || "mural")}/`;
    return [path, `/es${path}`];
  })
];

export function buildSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${new URL(route, SITE_URL).toString()}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;
}
