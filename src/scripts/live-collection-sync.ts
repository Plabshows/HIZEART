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
    const collection = readCollection(documents[`data/${options.collectionKey}.json`], options.collectionKey);
    const filtered = applyFilters(collection, options);

    if (filtered.length === 0) return;

    const fragment = document.createDocumentFragment();
    for (const item of filtered) {
      fragment.appendChild(renderItem(item, options));
    }
    container.replaceChildren(fragment);
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
    featuredOnly: container.dataset.liveFeaturedOnly === "true"
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

  if (options.availableOnly) {
    filtered = filtered.filter((item) => String(item.availability || "").toLowerCase() === "available");
  }

  if (typeof options.limit === "number") {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

function renderItem(item: Record<string, any>, options: SyncOptions): HTMLElement {
  switch (options.itemType) {
    case "project":
      return renderProjectCard(item);
    case "mural":
      return renderMuralCard(item);
    case "work":
    default:
      return renderWorkCard(item, options);
  }
}

function renderWorkCard(item: Record<string, any>, options: SyncOptions): HTMLElement {
  const title = String(item.title || "Untitled work");
  const slug = slugifySegment(item.slug || item.id || title, "work");
  const ctaLabel = options.ctaLabel || "Enquire";
  const ctaHref = ctaLabel === "View Work" ? `/works/${slug}/` : `/contact/?work=${encodeURIComponent(item.slug || item.id || slug)}`;

  const article = document.createElement("article");
  article.className = "work-card";
  article.dataset.filterItem = "true";
  article.dataset.category = slugifySegment(item.category || "work", "work");
  article.dataset.availability = slugifySegment(item.availability || "", "available");
  article.dataset.contentId = String(item.id || slug);

  const imageLink = document.createElement("a");
  imageLink.className = "work-card__image";
  imageLink.href = `/works/${slug}/`;
  imageLink.setAttribute("aria-label", `View ${title}`);
  imageLink.appendChild(buildPicture(String(item.image || ""), String(item.alt || title), "(min-width: 900px) 50vw, 100vw"));

  const body = document.createElement("div");
  body.className = "work-card__body";

  const metaLine = document.createElement("div");
  metaLine.className = "meta-line";
  metaLine.append(createSpan(String(item.category || "")), createSpan(String(item.year || "")));

  const heading = document.createElement("h3");
  const headingLink = document.createElement("a");
  headingLink.href = `/works/${slug}/`;
  headingLink.textContent = title;
  heading.appendChild(headingLink);

  body.append(metaLine, heading);

  if (options.showDetails) {
    const specs = document.createElement("dl");
    specs.className = "compact-specs";
    specs.append(
      createSpec("Technique", String(item.technique || "")),
      createSpec("Size", String(item.size || ""))
    );
    body.appendChild(specs);
  }

  const actions = document.createElement("div");
  actions.className = "card-actions";
  const status = document.createElement("span");
  status.className = "status-pill";
  status.textContent = String(item.availability || "");
  const cta = document.createElement("a");
  cta.className = "text-link";
  cta.href = ctaHref;
  cta.textContent = ctaLabel;
  actions.append(status, cta);

  body.appendChild(actions);
  article.append(imageLink, body);
  return article;
}

function renderProjectCard(item: Record<string, any>): HTMLElement {
  const title = String(item.title || "Untitled project");
  const slug = slugifySegment(item.slug || item.id || title, "project");

  const article = document.createElement("article");
  article.className = "project-card";
  article.dataset.contentId = String(item.id || slug);

  const imageLink = document.createElement("a");
  imageLink.className = "project-card__image";
  imageLink.href = `/projects/${slug}/`;
  imageLink.setAttribute("aria-label", `View ${title}`);
  imageLink.appendChild(buildPicture(String(item.mainImage || ""), String(item.alt || title), "(min-width: 900px) 50vw, 100vw"));

  const body = document.createElement("div");
  body.className = "project-card__body";

  const metaLine = document.createElement("div");
  metaLine.className = "meta-line";
  metaLine.append(createSpan(String(item.type || "")), createSpan(String(item.year || "")));

  const heading = document.createElement("h3");
  const headingLink = document.createElement("a");
  headingLink.href = `/projects/${slug}/`;
  headingLink.textContent = title;
  heading.appendChild(headingLink);

  const description = document.createElement("p");
  description.textContent = String(item.description || "");

  const actions = document.createElement("div");
  actions.className = "card-actions";
  const location = document.createElement("span");
  location.textContent = String(item.location || "");
  const cta = document.createElement("a");
  cta.className = "text-link";
  cta.href = `/projects/${slug}/`;
  cta.textContent = "View Project";
  actions.append(location, cta);

  body.append(metaLine, heading, description, actions);
  article.append(imageLink, body);
  return article;
}

function renderMuralCard(item: Record<string, any>): HTMLElement {
  const title = String(item.title || "Untitled mural");
  const slug = slugifySegment(item.slug || item.id || title, "mural");

  const article = document.createElement("article");
  article.className = "editorial-card";
  article.dataset.contentId = String(item.id || slug);

  const mediaLink = document.createElement("a");
  mediaLink.className = "editorial-card__media";
  mediaLink.href = `/murals/${slug}/`;
  mediaLink.setAttribute("aria-label", `View ${title}`);
  mediaLink.appendChild(buildPicture(String(item.image || ""), String(item.alt || title), "(min-width: 900px) 50vw, 100vw"));

  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.style.alignItems = "start";

  const text = document.createElement("div");
  const heading = document.createElement("h3");
  const headingLink = document.createElement("a");
  headingLink.href = `/murals/${slug}/`;
  headingLink.textContent = title;
  heading.appendChild(headingLink);

  const metaLine = document.createElement("p");
  metaLine.className = "meta-line";
  metaLine.append(
    createSpan(String(item.location || "")),
    createSpan(String(item.year || "")),
    createSpan(String(item.technique || ""))
  );

  text.append(heading, metaLine);
  if (String(item.client || "") && String(item.client) !== "Client TBC") {
    const client = document.createElement("p");
    client.textContent = String(item.client || "");
    text.appendChild(client);
  }

  const cta = document.createElement("a");
  cta.className = "text-link";
  cta.href = `/murals/${slug}/`;
  cta.textContent = "View Details";

  actions.append(text, cta);
  article.append(mediaLink, actions);
  return article;
}

function buildPicture(src: string, alt: string, sizes: string): HTMLElement {
  const picture = document.createElement("picture");
  const webp = candidateWebp(src);
  if (webp) {
    const source = document.createElement("source");
    source.type = "image/webp";
    source.srcset = webp;
    source.sizes = sizes;
    picture.appendChild(source);
  }

  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";
  img.sizes = sizes;
  picture.appendChild(img);
  return picture;
}

function candidateWebp(src: string): string | null {
  if (!src || !src.startsWith("/")) return null;
  if (!/\.(jpe?g|png)$/i.test(src)) return null;
  return src.replace(/\.(jpe?g|png)$/i, ".webp");
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
