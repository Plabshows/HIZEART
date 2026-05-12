import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://omhjbjvjzkxjmqqionbs.supabase.co";
const SUPABASE_KEY =
  process.env.PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "sb_publishable_nbqGkvXvIrKDKE0Mk3cIgg_RZA1exc9";
const ADMIN_EMAIL = process.env.SUPABASE_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.SUPABASE_ADMIN_PASSWORD;

const documentKeys = [
  "data/pages.json",
  "data/works.json",
  "data/projects.json",
  "data/murals.json",
  "data/exhibitions.json",
  "data/collaborations.json",
  "data/assets.json"
];

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Missing SUPABASE_ADMIN_EMAIL or SUPABASE_ADMIN_PASSWORD.");
  console.error("Example:");
  console.error("SUPABASE_ADMIN_EMAIL=info@hizeart.com SUPABASE_ADMIN_PASSWORD='your-password' npm run supabase:seed");
  process.exit(1);
}

const session = await login();
const rows = await Promise.all(
  documentKeys.map(async (key) => ({
    key,
    content: JSON.parse(await fs.readFile(path.join(process.cwd(), key), "utf8"))
  }))
);

await request("/rest/v1/site_documents?on_conflict=key", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${session.access_token}`,
    Prefer: "resolution=merge-duplicates,return=minimal"
  },
  body: rows,
  expectJson: false
});

console.log(`Seeded ${rows.length} content documents to Supabase.`);

async function login() {
  return request("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    }
  });
}

async function request(pathname, options = {}) {
  const response = await fetch(`${SUPABASE_URL}${pathname}`, {
    method: options.method || "GET",
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    const message = detail.msg || detail.message || detail.error_description || detail.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (options.expectJson === false || response.status === 204) return {};
  return response.json();
}
