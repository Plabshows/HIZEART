import {
  getLocalizedMuralContent,
  getLocalizedProjectContent,
  getLocalizedWorkContent,
  getUiText,
  localizeAvailabilityLabel,
  localizeCategoryLabel,
  localizePath,
  localizeProjectTypeLabel,
  resolveLocale,
  type Locale
} from "../lib/i18n";

const SUPABASE_URL = "https://omhjbjvjzkxjmqqionbs.supabase.co";
const SUPABASE_KEY = "sb_publishable_nbqGkvXvIrKDKE0Mk3cIgg_RZA1exc9";

type CollectionKey = "works" | "projects" | "murals";
type ItemType = "work" | "project" | "mural";

interface SyncOptions {
  collectionKey: CollectionKey;
  itemType: ItemType;
  limit?: number;
  showDetails?: boolean;
  ctaLabel?: string;
  availableOnly?: boolean;
  featuredOnly?: boolean;
  categoryOnly?: string;
  includeMurals?: boolean;
}

type SiteDocument = {
  key?: string;
  content?: unknown;
};

export async function syncCollectionPages(): Promise<void> {
  if (typeof document === "undefined") return;

  const containers = Array.from(document.querySelectorAll<HTMLElement>("[data-live-collection]"));
  if (containers.length === 0) return;

  await Promise.all(containers.map((container) => syncCollectionContainer(container)));
}

export async function syncCollectionPage(options: SyncOptions & { containerSelector: string }): Promise<void> {
  if (typeof document === "undefined") return;

  const { containerSelector, ...rest } = options;
  const container = document.querySelector<HTMLElement>(containerSelector);
  if (!container) return;

  await syncCollectionContainer(container, rest);
}

async function syncCollectionContainer(container: HTMLElement, explicitOptions?: SyncOptions): Promise<void> {
  const options = explicitOptions || readContainerOptions(container);

  try {
    const documents = await loadSiteDocuments();
    let collection = readCollection(documents[`data/${options.collectionKey}.json`], options.collectionKey);
    if (options.collectionKey === "works" && options.includeMurals) {
      const muralItems = readCollection(documents["data/murals.json"], "murals");
      const muralIdentityKeys = new Set(muralItems.flatMap(identityValues));
      const muralWorks = muralItems.map(muralToWorkItem);
      collection = [
        ...collection.filter((item) => !isDuplicateMuralWorkItem(item, muralIdentityKeys)),
        ...muralWorks
      ];
    }
    const filtered = applyFilters(collection, options);

    if (filtered.length === 0) return;

    const fragment = document.createDocumentFragment();
    for (const item of filtered) {
      fragment.appendChild(renderItem(item, options, container));
    }
    container.replaceChildren(fragment);
    window.dispatchEvent(
      new CustomEvent("collection-sync:updated", {
        detail: {
          collectionKey: options.collectionKey,
          itemType: options.itemType
        }
      })
    );
  } catch {
    // Quiet fallback: the static server-rendered version remains visible.
  }
}

function readContainerOptions(container: HTMLElement): SyncOptions {
  return {
    collectionKey: (container.dataset.liveCollection || "works") as CollectionKey,
    itemType: (container.dataset.liveItemType || "work") as ItemType,
    limit: parseOptionalInteger(container.dataset.liveLimit),
    showDetails: container.dataset.liveShowDetails === "true",
    ctaLabel: container.dataset.liveCtaLabel || undefined,
    availableOnly: container.dataset.liveAvailableOnly === "true",
    featuredOnly: container.dataset.liveFeaturedOnly === "true",
    categoryOnly: container.dataset.liveCategoryOnly ? slugifySegment(container.dataset.liveCategoryOnly, "work") : undefined,
    includeMurals: container.dataset.liveIncludeMurals === "true"
  };
}

async function loadSiteDocuments(): Promise<Record<string, unknown>> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/site_documents?select=key,content`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error(`Supabase content fetch failed with ${response.status}`);
  }

  const rows = (await response.json()) as SiteDocument[];
  return rows.reduce<Record<string, unknown>>((documents, row) => {
    if (row?.key) documents[row.key] = row.content;
    return documents;
  }, {});
}

function readCollection(content: unknown, key: CollectionKey): Array<Record<string, any>> {
  if (!content || typeof content !== "object") return [];
  const value = (content as Record<string, unknown>)[key];
  return Array.isArray(value) ? (value as Array<Record<string, any>>) : [];
}

function applyFilters(items: Array<Record<string, any>>, options: SyncOptions): Array<Record<string, any>> {
  let filtered = [...items];

  if (options.featuredOnly) {
    const featured = filtered.filter((item) => Boolean(item.featured));
    if (featured.length > 0) {
      filtered = featured;
    }
  }

  if (options.categoryOnly) {
    filtered = filtered.filter((item) => slugifySegment(String(item.category || ""), "work") === options.categoryOnly);
  }

  if (options.availableOnly) {
    filtered = filtered.filter((item) => String(item.availability || "").toLowerCase() === "available");
  }

  if (typeof options.limit === "number") {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

function renderItem(item: Record<string, any>, options: SyncOptions, container: HTMLElement): HTMLElement {
  const locale = resolveClientLocale();
  switch (options.itemType) {
    case "project":
      if (container.dataset.liveLayout === "project-index" || container.classList.contains("projects-index-grid")) {
        return renderProjectIndexCard(item, locale);
      }
      return renderProjectCard(item, locale);
    case "mural":
      return renderMuralCard(item, locale);
    case "work":
    default:
      return renderWorkCard(item, options, locale);
  }
}

function renderWorkCard(item: Record<string, any>, options: SyncOptions, locale: Locale): HTMLElement {
  const localizedItem = getLocalizedWorkContent(item, locale);
  const ui = getUiText(locale);
  const title = String(localizedItem.title || "Untitled work");
  const slug = slugifySegment(localizedItem.slug || localizedItem.id || title, "work");
  const detailHref = localizePath(String(localizedItem.href || localizedItem.detailHref || `/works/${slug}/`), locale);
  const ctaLabel = options.ctaLabel || "Enquire";
  const ctaHref =
    ctaLabel === "View Work" || ctaLabel === "Ver obra"
      ? detailHref
      : localizePath(`/contact/?work=${encodeURIComponent(localizedItem.slug || localizedItem.id || slug)}`, locale);

  const article = document.createElement("article");
  article.className = "work-card";
  article.dataset.filterItem = "true";
  article.dataset.category = slugifySegment(localizedItem.category || "work", "work");
  article.dataset.availability = slugifySegment(localizedItem.availability || "", "available");
  article.dataset.contentId = String(localizedItem.id || slug);

  const imageLink = document.createElement("a");
  imageLink.className = "work-card__image";
  imageLink.href = detailHref;
  imageLink.setAttribute("aria-label", `${ui.common.viewWork} ${title}`);
  imageLink.appendChild(buildPicture(String(localizedItem.image || ""), String(localizedItem.alt || title), "(min-width: 900px) 50vw, 100vw"));

  const body = document.createElement("div");
  body.className = "work-card__body";

  const metaLine = document.createElement("div");
  metaLine.className = "meta-line";
  metaLine.append(createSpan(localizeCategoryLabel(String(localizedItem.category || ""), locale)), createSpan(String(localizedItem.year || "")));

  const heading = document.createElement("h3");
  const headingLink = document.createElement("a");
  headingLink.href = detailHref;
  headingLink.textContent = title;
  heading.appendChild(headingLink);

  body.append(metaLine, heading);

  if (options.showDetails) {
    const specs = document.createElement("dl");
    specs.className = "compact-specs";
    specs.append(
      createSpec(ui.common.technique, String(localizedItem.technique || "")),
      createSpec(ui.common.size, String(localizedItem.size || ""))
    );
    body.appendChild(specs);
  }

  const actions = document.createElement("div");
  actions.className = "card-actions";
  const status = document.createElement("span");
  status.className = "status-pill";
  status.textContent = localizeAvailabilityLabel(String(localizedItem.availability || ""), locale);
  const cta = document.createElement("a");
  cta.className = "text-link";
  cta.href = ctaHref;
  cta.textContent = ctaLabel;
  actions.append(status, cta);

  body.appendChild(actions);
  article.append(imageLink, body);
  return article;
}

function muralToWorkItem(item: Record<string, any>): Record<string, any> {
  const title = String(item.title || "Untitled mural");
  const slug = slugifySegment(item.slug || item.id || title, "mural");

  return {
    id: `mural-${item.id || slug}`,
    slug,
    href: `/murals/${slug}/`,
    title,
    year: item.year,
    category: "Murals",
    technique: item.technique,
    size: "Site-specific",
    availability: "Commission archive",
    price: "Commission on request",
    description: item.description,
    image: item.image,
    gallery: item.gallery,
    alt: item.alt
  };
}

function isDuplicateMuralWorkItem(item: Record<string, any>, muralIdentityKeys: Set<string>): boolean {
  if (slugifySegment(String(item.category || ""), "work") !== "murals") return false;
  return identityValues(item).some((value) => muralIdentityKeys.has(value));
}

function identityValues(item: Record<string, any>): string[] {
  return [item.id, item.slug, item.title].filter(Boolean).map((value) => slugifySegment(String(value), "item"));
}

function renderProjectCard(item: Record<string, any>, locale: Locale): HTMLElement {
  const localizedItem = getLocalizedProjectContent(item, locale);
  const ui = getUiText(locale);
  const title = String(localizedItem.title || "Untitled project");
  const slug = slugifySegment(localizedItem.slug || localizedItem.id || title, "project");
  const detailHref = localizePath(`/projects/${slug}/`, locale);

  const article = document.createElement("article");
  article.className = "project-card";
  article.dataset.contentId = String(localizedItem.id || slug);

  const imageLink = document.createElement("a");
  imageLink.className = "project-card__image";
  imageLink.href = detailHref;
  imageLink.setAttribute("aria-label", `${ui.common.viewProject} ${title}`);
  imageLink.appendChild(buildPicture(String(localizedItem.mainImage || ""), String(localizedItem.alt || title), "(min-width: 900px) 50vw, 100vw"));

  const body = document.createElement("div");
  body.className = "project-card__body";

  const metaLine = document.createElement("div");
  metaLine.className = "meta-line";
  metaLine.append(createSpan(localizeProjectTypeLabel(String(localizedItem.type || ""), locale)), createSpan(String(localizedItem.year || "")));

  const heading = document.createElement("h3");
  const headingLink = document.createElement("a");
  headingLink.href = detailHref;
  headingLink.textContent = title;
  heading.appendChild(headingLink);

  const description = document.createElement("p");
  description.className = "project-index-card__description";
  description.textContent = String(localizedItem.description || "");

  const actions = document.createElement("div");
  actions.className = "card-actions";
  const location = document.createElement("span");
  location.textContent = String(localizedItem.location || "");
  const cta = document.createElement("a");
  cta.className = "text-link project-index-card__cta";
  cta.href = detailHref;
  cta.textContent = ui.common.viewProject;
  actions.append(location, cta);

  body.append(metaLine, heading, description, actions);
  article.append(imageLink, body);
  return article;
}

function renderProjectIndexCard(item: Record<string, any>, locale: Locale): HTMLElement {
  const localizedItem = getLocalizedProjectContent(item, locale);
  const ui = getUiText(locale);
  const title = String(localizedItem.title || "Untitled project");
  const slug = slugifySegment(localizedItem.slug || localizedItem.id || title, "project");
  const detailHref = localizePath(`/projects/${slug}/`, locale);
  const article = document.createElement("article");
  article.className = "project-index-card";
  article.dataset.contentId = String(localizedItem.id || slug);
  article.dataset.contentSlug = slug;

  const imageLink = document.createElement("a");
  imageLink.className = "project-index-card__media";
  imageLink.href = detailHref;
  imageLink.setAttribute("aria-label", `${ui.common.viewProject} ${title}`);
  imageLink.appendChild(buildPicture(String(localizedItem.mainImage || ""), String(localizedItem.alt || title), "(min-width: 900px) 50vw, 100vw"));

  const body = document.createElement("div");
  body.className = "project-index-card__body";

  const metaLine = document.createElement("div");
  metaLine.className = "meta-line";
  metaLine.append(createSpan(localizeProjectTypeLabel(String(localizedItem.type || ""), locale)), createSpan(String(localizedItem.year || "")));

  const heading = document.createElement("h3");
  const headingLink = document.createElement("a");
  headingLink.href = detailHref;
  headingLink.textContent = title;
  heading.appendChild(headingLink);

  const description = document.createElement("p");
  description.className = "project-index-card__description";
  description.textContent = String(localizedItem.description || "");

  const facts = document.createElement("div");
  facts.className = "project-index-card__facts";
  if (localizedItem.location) facts.appendChild(createSpan(String(localizedItem.location)));
  if (localizedItem.client) facts.appendChild(createSpan(String(localizedItem.client)));

  const cta = document.createElement("a");
  cta.className = "text-link project-index-card__cta";
  cta.href = detailHref;
  cta.textContent = ui.common.viewProject;

  body.append(metaLine, heading, description, facts, cta);
  article.append(imageLink, body);
  return article;
}

function renderMuralCard(item: Record<string, any>, locale: Locale): HTMLElement {
  const localizedItem = getLocalizedMuralContent(item, locale);
  const ui = getUiText(locale);
  const title = String(localizedItem.title || "Untitled mural");
  const slug = slugifySegment(localizedItem.slug || localizedItem.id || title, "mural");
  const isFeatured = localizedItem.id === "puerto-visual-intervention";
  const detailHref = localizePath(`/murals/${slug}/`, locale);

  const article = document.createElement("article");
  article.className = `editorial-card${isFeatured ? " editorial-card--featured" : ""}`;
  article.dataset.contentId = String(localizedItem.id || slug);
  if (isFeatured) article.dataset.featured = "true";

  const mediaLink = document.createElement("a");
  mediaLink.className = "editorial-card__media";
  mediaLink.href = detailHref;
  mediaLink.setAttribute("aria-label", `${ui.common.viewDetails} ${title}`);
  mediaLink.appendChild(buildPicture(String(localizedItem.image || ""), String(localizedItem.alt || title), "(min-width: 900px) 50vw, 100vw"));

  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.style.alignItems = "start";

  const text = document.createElement("div");
  const heading = document.createElement("h3");
  const headingLink = document.createElement("a");
  headingLink.href = detailHref;
  headingLink.textContent = title;
  heading.appendChild(headingLink);

  const metaLine = document.createElement("p");
  metaLine.className = "meta-line";
  metaLine.append(
    createSpan(String(localizedItem.location || "")),
    createSpan(String(localizedItem.year || "")),
    createSpan(String(localizedItem.technique || ""))
  );

  text.append(heading, metaLine);
  if (
    String(localizedItem.client || "") &&
    String(localizedItem.client) !== "Client TBC" &&
    String(localizedItem.client) !== "Cliente por confirmar"
  ) {
    const client = document.createElement("p");
    client.textContent = String(localizedItem.client || "");
    text.appendChild(client);
  }

  const cta = document.createElement("a");
  cta.className = "text-link";
  cta.href = detailHref;
  cta.textContent = ui.common.viewDetails;

  actions.append(text, cta);
  article.append(mediaLink, actions);
  return article;
}

function buildPicture(src: string, alt: string, sizes: string): HTMLElement {
  const picture = document.createElement("picture");
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";
  img.sizes = sizes;
  picture.appendChild(img);
  return picture;
}

function parseOptionalInteger(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function createSpan(text: string): HTMLSpanElement {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}

function createSpec(label: string, value: string): HTMLDivElement {
  const wrapper = document.createElement("div");
  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  dd.textContent = value;
  wrapper.append(dt, dd);
  return wrapper;
}

function slugifySegment(value: string, fallback = "item"): string {
  const slug = String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

function resolveClientLocale(): Locale {
  if (typeof document === "undefined") return "en";
  return resolveLocale(window.location.pathname);
}
