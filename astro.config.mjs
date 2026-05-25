import { defineConfig } from "astro/config";

const site = (process.env.PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.hizeart.com").replace(/\/+$/, "");

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always"
});
