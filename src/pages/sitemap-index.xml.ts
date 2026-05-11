import type { APIRoute } from "astro";
import { buildSitemap } from "../lib/sitemap";

export const GET: APIRoute = () => {
  return new Response(buildSitemap(), {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};
