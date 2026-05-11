import worksData from "../../data/works.json";
import projectsData from "../../data/projects.json";
import muralsData from "../../data/murals.json";
import exhibitionsData from "../../data/exhibitions.json";
import collaborationsData from "../../data/collaborations.json";
import assetsData from "../../data/assets.json";

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

function collection<T>(data: unknown, key: string): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object" && Array.isArray((data as Record<string, unknown>)[key])) {
    return (data as Record<string, unknown>)[key] as T[];
  }
  return [];
}

export const works = collection<Work>(worksData, "works");
export const projects = collection<Project>(projectsData, "projects");
export const murals = collection<Mural>(muralsData, "murals");
export const exhibitions = collection<Exhibition>(exhibitionsData, "exhibitions");
export const collaborations = collection<Collaboration>(collaborationsData, "collaborations");
export const assets = collection<AssetFolder>(assetsData, "assets");
