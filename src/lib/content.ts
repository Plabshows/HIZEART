import worksData from "../../data/works.json";
import projectsData from "../../data/projects.json";
import muralsData from "../../data/murals.json";
import exhibitionsData from "../../data/exhibitions.json";
import collaborationsData from "../../data/collaborations.json";
import assetsData from "../../data/assets.json";
import pagesData from "../../data/pages.json";

export type Work = {
  id: string;
  slug?: string;
  href?: string;
  title: string;
  year: string;
  category: string;
  technique: string;
  size: string;
  availability: string;
  price?: string;
  featured?: boolean;
  description: string;
  image: string;
  gallery?: string[];
  alt: string;
};

export type Project = {
  id: string;
  slug?: string;
  title: string;
  year: string;
  location: string;
  type: string;
  client?: string;
  description: string;
  mainImage: string;
  gallery: string[];
  video?: {
    youtubeId: string;
    title?: string;
    text?: string;
  };
  alt: string;
};

export type Mural = {
  id: string;
  slug?: string;
  title: string;
  location: string;
  year: string;
  technique: string;
  client?: string;
  description: string;
  image: string;
  gallery: string[];
  alt: string;
};

export type Exhibition = {
  year: string;
  title: string;
  type: string;
  location: string;
  description?: string;
};

export type Collaboration = {
  name: string;
  type: string;
};

export type AssetFolder = {
  category: string;
  path: string;
  files: string[];
};

export type PageContent = Record<string, any>;

export function slugifySegment(value: string, fallback = "item"): string {
  const slug = String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

function assignUniqueSlugs<T extends { id?: string; slug?: string; title?: string; name?: string }>(items: T[]): (T & { slug: string })[] {
  const seen = new Map<string, number>();

  return items.map((item, index) => {
    const base = slugifySegment(item.slug || item.id || item.title || item.name || `item-${index + 1}`);
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    const slug = count === 0 ? base : `${base}-${count + 1}`;
    return { ...item, slug };
  });
}

type ContentDocument =
  | "data/works.json"
  | "data/projects.json"
  | "data/murals.json"
  | "data/exhibitions.json"
  | "data/collaborations.json"
  | "data/assets.json"
  | "data/pages.json";

type RemoteDocument = {
  key: ContentDocument;
  content: unknown;
};

const fallbackDocuments: Record<ContentDocument, unknown> = {
  "data/works.json": worksData,
  "data/projects.json": projectsData,
  "data/murals.json": muralsData,
  "data/exhibitions.json": exhibitionsData,
  "data/collaborations.json": collaborationsData,
  "data/assets.json": assetsData,
  "data/pages.json": pagesData
};

const supabaseUrl =
  import.meta.env.PUBLIC_SUPABASE_URL ||
  import.meta.env.SUPABASE_URL ||
  "https://omhjbjvjzkxjmqqionbs.supabase.co";

const supabaseKey =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  "sb_publishable_nbqGkvXvIrKDKE0Mk3cIgg_RZA1exc9";

function collection<T>(data: unknown, key: string): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object" && Array.isArray((data as Record<string, unknown>)[key])) {
    return (data as Record<string, unknown>)[key] as T[];
  }
  return [];
}

async function fetchRemoteDocuments(): Promise<Partial<Record<ContentDocument, unknown>>> {
  if (!supabaseUrl || !supabaseKey) return {};

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/site_documents?select=key,content`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      },
      signal: AbortSignal.timeout(6000)
    });

    if (!response.ok) {
      console.warn(`Supabase content fetch failed with ${response.status}. Falling back to local JSON.`);
      return {};
    }

    const rows = (await response.json()) as RemoteDocument[];
    return rows.reduce<Partial<Record<ContentDocument, unknown>>>((documents, row) => {
      documents[row.key] = row.content;
      return documents;
    }, {});
  } catch (error) {
    console.warn("Supabase content fetch failed. Falling back to local JSON.", error);
    return {};
  }
}

const remoteDocuments = await fetchRemoteDocuments();

function documentFor<T>(key: ContentDocument): T {
  return (remoteDocuments[key] || fallbackDocuments[key]) as T;
}

const worksDocument = documentFor<typeof worksData>("data/works.json");
const projectsDocument = documentFor<typeof projectsData>("data/projects.json");
const muralsDocument = documentFor<typeof muralsData>("data/murals.json");
const exhibitionsDocument = documentFor<typeof exhibitionsData>("data/exhibitions.json");
const collaborationsDocument = documentFor<typeof collaborationsData>("data/collaborations.json");
const assetsDocument = documentFor<typeof assetsData>("data/assets.json");
const pagesDocument = documentFor<typeof pagesData>("data/pages.json");

export const works = assignUniqueSlugs(collection<Work>(worksDocument, "works"));
export const projects = assignUniqueSlugs(collection<Project>(projectsDocument, "projects"));
export const murals = assignUniqueSlugs(collection<Mural>(muralsDocument, "murals"));
const muralIdentityKeys = new Set(murals.flatMap((mural) => identityValues(mural)));
export const workDetailItems = works.filter((work) => !isDuplicateMuralWork(work));
export const worksCatalog = [
  ...workDetailItems,
  ...murals.map((mural) => {
    const slug = mural.slug || slugifySegment(mural.id || mural.title || "mural");
    return {
      id: `mural-${mural.id || slug}`,
      slug,
      href: `/murals/${slug}/`,
      title: mural.title,
      year: mural.year,
      category: "Murals",
      technique: mural.technique,
      size: "Site-specific",
      availability: "Commission archive",
      price: "Commission on request",
      featured: false,
      description: mural.description,
      image: mural.image,
      gallery: mural.gallery,
      alt: mural.alt
    } satisfies Work;
  })
];
export const exhibitions = collection<Exhibition>(exhibitionsDocument, "exhibitions");
export const collaborations = collection<Collaboration>(collaborationsDocument, "collaborations");
export const assets = collection<AssetFolder>(assetsDocument, "assets");
export const pages = ((pagesDocument as { pages?: PageContent }).pages || {}) as PageContent;

function isDuplicateMuralWork(work: Work): boolean {
  if (slugifySegment(work.category || "", "work") !== "murals") return false;
  return identityValues(work).some((value) => muralIdentityKeys.has(value));
}

function identityValues(item: { id?: string; slug?: string; title?: string }): string[] {
  return [item.id, item.slug, item.title].filter(Boolean).map((value) => slugifySegment(String(value), "item"));
}
