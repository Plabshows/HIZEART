const DEFAULT_SITE_URL = "https://www.hizeart.com";

function normalizeSiteUrl(url: string | undefined): string {
  return String(url || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(import.meta.env.PUBLIC_SITE_URL || import.meta.env.SITE_URL);
export const DEFAULT_OG_IMAGE_PATH = "/assets/images/featured/hero-visitacastellon.jpg";

export function toAbsoluteSiteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
