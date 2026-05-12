import worksData from "../../data/works.json";
import projectsData from "../../data/projects.json";
import muralsData from "../../data/murals.json";
import exhibitionsData from "../../data/exhibitions.json";
import collaborationsData from "../../data/collaborations.json";
import assetsData from "../../data/assets.json";
import pagesData from "../../data/pages.json";

export type Work = {
  id: string;
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
  alt: string;
};

export type Project = {
  id: string;
  title: string;
  year: string;
  location: string;
  type: string;
  client?: string;
  description: string;
  mainImage: string;
  gallery: string[];
  alt: string;
};

export type Mural = {
  id: string;
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

export const works = collection<Work>(worksDocument, "works");
export const projects = collection<Project>(projectsDocument, "projects");
export const murals = collection<Mural>(muralsDocument, "murals");
export const exhibitions = collection<Exhibition>(exhibitionsDocument, "exhibitions");
export const collaborations = collection<Collaboration>(collaborationsDocument, "collaborations");
export const assets = collection<AssetFolder>(assetsDocument, "assets");
export const pages = ((pagesDocument as { pages?: PageContent }).pages || {}) as PageContent;
