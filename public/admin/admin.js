const SUPABASE_URL = "https://omhjbjvjzkxjmqqionbs.supabase.co";
const SUPABASE_KEY = "sb_publishable_nbqGkvXvIrKDKE0Mk3cIgg_RZA1exc9";
const STORAGE_BUCKET = "hize-images";
const SESSION_KEY = "hize-admin-supabase-session";

const files = {};
const dirtyFiles = new Set();
let activeSection = null;
let activeButton = null;
let currentUploadButton = null;
let session = loadStoredSession();
let usingBootstrapContent = false;
let supabaseSetup = { table: false, bucket: false };

const loginView = document.querySelector("[data-login-view]");
const dashboardView = document.querySelector("[data-dashboard-view]");
const loginForm = document.querySelector("[data-login-form]");
const loginStatus = document.querySelector("[data-login-status]");
const sectionNav = document.querySelector("[data-section-nav]");
const editor = document.querySelector("[data-editor]");
const saveButton = document.querySelector("[data-save]");
const logoutButton = document.querySelector("[data-logout]");
const globalStatus = document.querySelector("[data-global-status]");
const currentKicker = document.querySelector("[data-current-kicker]");
const currentTitle = document.querySelector("[data-current-title]");
const currentHelp = document.querySelector("[data-current-help]");

const sections = [
  { group: "Pages", type: "page", title: "Home", file: "data/pages.json", path: ["pages", "home"] },
  { group: "Pages", type: "page", title: "Works Page", file: "data/pages.json", path: ["pages", "works"] },
  { group: "Pages", type: "page", title: "Available Works Page", file: "data/pages.json", path: ["pages", "availableWorks"] },
  { group: "Pages", type: "page", title: "Murals Page", file: "data/pages.json", path: ["pages", "murals"] },
  { group: "Pages", type: "page", title: "Projects Page", file: "data/pages.json", path: ["pages", "projects"] },
  { group: "Pages", type: "page", title: "VR Art Page", file: "data/pages.json", path: ["pages", "vrArt"] },
  { group: "Pages", type: "page", title: "Exhibitions Page", file: "data/pages.json", path: ["pages", "exhibitions"] },
  { group: "Pages", type: "page", title: "About Page", file: "data/pages.json", path: ["pages", "about"] },
  { group: "Pages", type: "page", title: "Contact Page", file: "data/pages.json", path: ["pages", "contact"] },
  { group: "Collections", type: "collection", title: "Works", file: "data/works.json", path: ["works"], template: "work" },
  { group: "Collections", type: "collection", title: "Projects", file: "data/projects.json", path: ["projects"], template: "project" },
  { group: "Collections", type: "collection", title: "Murals", file: "data/murals.json", path: ["murals"], template: "mural" },
  { group: "Collections", type: "collection", title: "Exhibitions", file: "data/exhibitions.json", path: ["exhibitions"], template: "exhibition" },
  { group: "Collections", type: "collection", title: "Collaborations", file: "data/collaborations.json", path: ["collaborations"], template: "collaboration" },
  { group: "Media", type: "collection", title: "Asset Folders", file: "data/assets.json", path: ["assets"], template: "asset" }
];

const templates = {
  work: {
    id: "new-work",
    title: "New Work",
    year: "2026",
    category: "Canvas",
    technique: "Mixed media on canvas",
    size: "Size on request",
    availability: "Available",
    price: "Price on request",
    featured: false,
    description: "Add the collector-facing artwork description here.",
    image: "/assets/images/canvas/canvas.jpg",
    alt: "Hize abstract graffiti artwork on canvas"
  },
  project: {
    id: "new-project",
    title: "New Project",
    year: "2026",
    location: "Spain",
    type: "Project",
    client: "",
    description: "Add the public project description here.",
    mainImage: "/assets/images/projects/streetxo.jpg",
    gallery: [],
    alt: "Hize contemporary urban art project"
  },
  mural: {
    id: "new-mural",
    title: "New Mural",
    location: "Spain",
    year: "2026",
    technique: "Spray paint and acrylic on wall",
    client: "",
    description: "Add the mural description here.",
    image: "/assets/images/murals/mural-torreblanca.jpg",
    gallery: [],
    alt: "Hize abstract graffiti mural in a contemporary space"
  },
  exhibition: {
    year: "2026",
    title: "New Exhibition",
    type: "Exhibition",
    location: "International",
    description: "Add the exhibition or collaboration note here."
  },
  collaboration: {
    name: "New Collaboration",
    type: "Brand Collaboration"
  },
  asset: {
    category: "Uploads",
    path: "supabase://hize-images/uploads",
    files: []
  }
};

const titleMap = {
  seoTitle: "SEO title",
  seoDescription: "SEO description",
  seoImage: "SEO image",
  heroTitle: "Hero title",
  heroImage: "Hero image",
  mainImage: "Main image",
  portraitImage: "Portrait image",
  vrArt: "VR Art",
  availableWorks: "Available Works"
};

init();

async function init() {
  bindEvents();
  if (!session) {
    showLogin();
    return;
  }

  try {
    await verifySession();
    await showDashboard();
  } catch (error) {
    clearStoredSession();
    setStatus(loginStatus, "Session expired. Please sign in again.", "error");
    showLogin();
  }
}

function bindEvents() {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(loginStatus, "Checking credentials...");
    const form = new FormData(loginForm);

    try {
      const data = await supabaseRequest("/auth/v1/token?grant_type=password", {
        method: "POST",
        body: {
          email: String(form.get("email") || ""),
          password: String(form.get("password") || "")
        }
      });
      storeSession(data);
      loginForm.reset();
      loginForm.email.value = "info@hizeart.com";
      await showDashboard();
    } catch (error) {
      setStatus(loginStatus, authErrorMessage(error), "error");
    }
  });

  saveButton.addEventListener("click", saveContent);
  logoutButton.addEventListener("click", async () => {
    await signOut();
    showLogin();
  });
}

function showLogin() {
  dashboardView.hidden = true;
  loginView.hidden = false;
}

async function showDashboard() {
  loginView.hidden = true;
  dashboardView.hidden = false;
  setStatus(globalStatus, "Loading content from Supabase...");
  try {
    const data = await loadContentDocuments();
    Object.keys(files).forEach((key) => delete files[key]);
    Object.assign(files, data);
    renderNav();
    activateSection(sections[0], sectionNav.querySelector("button"));
    await checkSupabaseSetup();
    if (supabaseSetup.table && supabaseSetup.bucket) {
      setStatus(globalStatus, "Content loaded from Supabase.", "ok");
    }
  } catch (error) {
    setStatus(globalStatus, contentErrorMessage(error), "error");
  }
}

async function loadContentDocuments() {
  try {
    const rows = await supabaseRequest("/rest/v1/site_documents?select=key,content", {
      headers: await authHeaders()
    });

    if (Array.isArray(rows) && rows.length > 0) {
      usingBootstrapContent = false;
      return rows.reduce((documents, row) => {
        documents[row.key] = row.content;
        return documents;
      }, {});
    }

    usingBootstrapContent = true;
    const bootstrap = await fetch("/admin/bootstrap-content.json", { cache: "no-store" });
    if (!bootstrap.ok) throw new Error("No content found in Supabase and bootstrap content is missing.");
    setStatus(globalStatus, "Supabase is empty. Starter content loaded; click Save changes once to seed the database.", "ok");
    return bootstrap.json();
  } catch (error) {
    if (!/site_documents|schema cache|could not find the table/i.test(error.message)) {
      throw error;
    }

    usingBootstrapContent = true;
    const bootstrap = await fetch("/admin/bootstrap-content.json", { cache: "no-store" });
    if (!bootstrap.ok) throw error;
    setStatus(
      globalStatus,
      "Supabase content table is not installed yet. Starter content loaded locally, but saves will only work after the SQL migration runs.",
      "ok"
    );
    return bootstrap.json();
  }
}

function renderNav() {
  sectionNav.innerHTML = "";
  let group = "";
  for (const section of sections) {
    if (section.group !== group) {
      group = section.group;
      const heading = document.createElement("div");
      heading.className = "nav-section";
      heading.textContent = group;
      sectionNav.appendChild(heading);
    }

    const button = document.createElement("button");
    button.className = "nav-item";
    button.type = "button";
    button.textContent = section.title;
    button.addEventListener("click", () => activateSection(section, button));
    sectionNav.appendChild(button);
  }
}

function activateSection(section, button) {
  activeSection = section;
  activeButton?.classList.remove("is-active");
  activeButton = button;
  activeButton?.classList.add("is-active");
  currentKicker.textContent = section.group;
  currentTitle.textContent = section.title;
  currentHelp.textContent =
    section.type === "page"
      ? "Edit page copy, SEO text, buttons and section images. Image uploads go to Supabase Storage."
      : "Edit list items. Image uploads go to Supabase Storage and are linked in the selected field.";
  renderEditor();
}

function renderEditor() {
  editor.innerHTML = "";
  if (!activeSection) return;
  if (activeSection.type === "page") {
    renderPageEditor();
    return;
  }
  renderCollectionEditor();
}

function renderPageEditor() {
  const value = getValue(activeSection.file, activeSection.path);
  const card = createCard(activeSection.title, "Page content");
  card.appendChild(renderValue(activeSection.file, activeSection.path, value, activeSection.title));
  editor.appendChild(card);
}

function renderCollectionEditor() {
  const items = getValue(activeSection.file, activeSection.path) || [];
  const toolbar = document.createElement("div");
  toolbar.className = "collection-toolbar";
  toolbar.innerHTML = `<p class="notice">${items.length} items</p>`;
  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.textContent = `Add ${activeSection.title.slice(0, -1) || "item"}`;
  addButton.addEventListener("click", () => {
    items.unshift(clone(templates[activeSection.template] || {}));
    markDirty(activeSection.file);
    renderEditor();
  });
  toolbar.appendChild(addButton);
  editor.appendChild(toolbar);

  items.forEach((item, index) => {
    const title = item.title || item.name || `${activeSection.title} ${index + 1}`;
    const card = createCard(title, `Item ${index + 1}`);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "secondary danger small-button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      if (!confirm(`Remove "${title}"?`)) return;
      items.splice(index, 1);
      markDirty(activeSection.file);
      renderEditor();
    });
    card.querySelector(".editor-card__header").appendChild(remove);
    card.appendChild(renderValue(activeSection.file, [...activeSection.path, index], item, title));
    editor.appendChild(card);
  });
}

function createCard(title, kicker) {
  const card = document.createElement("article");
  card.className = "editor-card";
  const header = document.createElement("div");
  header.className = "editor-card__header";
  header.innerHTML = `<div><p class="eyebrow">${escapeHtml(kicker)}</p><h2>${escapeHtml(title)}</h2></div>`;
  card.appendChild(header);
  return card;
}

function renderValue(file, path, value, label) {
  if (Array.isArray(value)) return renderArray(file, path, value, label);
  if (value && typeof value === "object") return renderObject(file, path, value, label);
  return renderPrimitive(file, path, value, label);
}

function renderObject(file, path, value, label) {
  const wrapper = document.createElement("div");
  wrapper.className = "field-group";
  const heading = document.createElement("div");
  heading.className = "field-label";
  heading.textContent = cleanLabel(label);
  wrapper.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "nested-grid";
  for (const [key, nestedValue] of Object.entries(value)) {
    grid.appendChild(renderValue(file, [...path, key], nestedValue, key));
  }
  wrapper.appendChild(grid);
  return wrapper;
}

function renderArray(file, path, value, label) {
  const wrapper = document.createElement("div");
  wrapper.className = "field-group";
  const heading = document.createElement("div");
  heading.className = "editor-card__header";
  heading.innerHTML = `<div><p class="eyebrow">List</p><h3>${escapeHtml(cleanLabel(label))}</h3></div>`;
  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "secondary small-button";
  addButton.textContent = "Add item";
  addButton.addEventListener("click", () => {
    value.push(defaultArrayItem(label, value));
    markDirty(file);
    renderEditor();
  });
  heading.appendChild(addButton);
  wrapper.appendChild(heading);

  const list = document.createElement("div");
  list.className = "array-list";
  value.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "array-item";
    row.appendChild(renderValue(file, [...path, index], item, `${label} ${index + 1}`));
    const actions = document.createElement("div");
    actions.className = "array-actions";
    const duplicate = smallButton("Duplicate", () => {
      value.splice(index + 1, 0, clone(item));
      markDirty(file);
      renderEditor();
    });
    const remove = smallButton("Remove", () => {
      value.splice(index, 1);
      markDirty(file);
      renderEditor();
    }, "danger");
    actions.append(duplicate, remove);
    row.appendChild(actions);
    list.appendChild(row);
  });
  wrapper.appendChild(list);
  return wrapper;
}

function renderPrimitive(file, path, value, label) {
  const row = document.createElement("label");
  row.className = "field-row";
  const span = document.createElement("span");
  span.textContent = cleanLabel(label);
  row.appendChild(span);

  if (typeof value === "boolean") {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = value;
    input.addEventListener("change", () => updateValue(file, path, input.checked));
    row.appendChild(input);
    return row;
  }

  const stringValue = value == null ? "" : String(value);
  const input = shouldUseTextarea(label, stringValue) ? document.createElement("textarea") : document.createElement("input");
  input.value = stringValue;
  if (input.tagName === "INPUT") input.type = "text";
  input.addEventListener("input", () => updateValue(file, path, input.value));
  row.appendChild(input);

  if (isImageField(label, stringValue)) {
    row.appendChild(renderImageTools(file, path, stringValue));
  }

  return row;
}

function renderImageTools(file, path, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "image-actions";
  if (value && (value.startsWith("/") || value.startsWith("http"))) {
    const img = document.createElement("img");
    img.className = "image-preview";
    img.src = value;
    img.alt = "";
    wrapper.appendChild(img);
  }

  const upload = smallButton("Upload image", () => {
    currentUploadButton = { file, path };
    const picker = document.createElement("input");
    picker.className = "hidden-input";
    picker.type = "file";
    picker.accept = "image/jpeg,image/png,image/webp,image/gif";
    picker.addEventListener("change", async () => {
      await handleUpload(picker.files?.[0]);
      picker.remove();
    });
    document.body.appendChild(picker);
    picker.click();
  });
  wrapper.appendChild(upload);
  return wrapper;
}

async function handleUpload(file) {
  if (!file || !currentUploadButton) return;
  try {
    if (file.size > 8 * 1024 * 1024) {
      throw new Error("The image is too large. Upload an optimized image under 8 MB.");
    }

    if (!supabaseSetup.bucket) {
      throw new Error("Supabase bucket hize-images is missing. Run the SQL migration in supabase/migrations to create the bucket before uploading images.");
    }

    setStatus(globalStatus, `Uploading ${file.name} to Supabase Storage...`);
    const folder = uploadFolderForPath(currentUploadButton.path);
    const result = await uploadImage(file, folder);
    updateValue(currentUploadButton.file, currentUploadButton.path, result.publicUrl);
    setStatus(globalStatus, "Image uploaded. Click Save changes to publish this image in the content database.", "ok");
    renderEditor();
  } catch (error) {
    setStatus(globalStatus, error.message || "Image upload failed.", "error");
  }
}

async function uploadImage(file, folder) {
  const objectPath = `${folder}/${Date.now()}-${sanitizeFilename(file.name)}`;
  const encodedPath = objectPath.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${encodedPath}`, {
    method: "POST",
    headers: {
      ...(await authHeaders()),
      "Content-Type": file.type || "application/octet-stream",
      "x-upsert": "false"
    },
    body: file
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.message || detail.error || `Upload failed with status ${response.status}`);
  }

  return {
    path: objectPath,
    publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${encodedPath}`
  };
}

async function saveContent() {
  if (!Object.keys(files).length) return;
  setStatus(globalStatus, "Saving content to Supabase...");
  saveButton.disabled = true;

  try {
    if (!supabaseSetup.table) {
      throw new Error("Supabase table site_documents is missing. Run the SQL migration in supabase/migrations before saving content.");
    }
    await saveDocuments();
    dirtyFiles.clear();
    const redeploy = await triggerRedeploy();
    if (redeploy.skipped) {
      setStatus(globalStatus, "Saved in Supabase. VERCEL_DEPLOY_HOOK_URL is not configured yet, so redeploy Vercel manually to publish.", "ok");
    } else {
      setStatus(globalStatus, "Saved in Supabase. Vercel rebuild has been triggered.", "ok");
    }
  } catch (error) {
    if (usingBootstrapContent && /site_documents|schema cache|could not find the table/i.test(error.message)) {
      setStatus(
        globalStatus,
        "The admin is showing starter content, but Supabase still needs the SQL migration from supabase/migrations/20260512170000_hize_admin_content.sql before saving can work.",
        "error"
      );
      return;
    }
    setStatus(globalStatus, error.message || "Save failed.", "error");
  } finally {
    saveButton.disabled = false;
  }
}

async function saveDocuments() {
  const rows = Object.entries(files).map(([key, content]) => ({ key, content }));
  await supabaseRequest("/rest/v1/site_documents?on_conflict=key", {
    method: "POST",
    headers: {
      ...(await authHeaders()),
      Prefer: "resolution=merge-duplicates,return=minimal"
    },
    body: rows,
    expectJson: false
  });
}

async function triggerRedeploy() {
  const headers = await authHeaders();
  const response = await fetch("/api/admin/redeploy/", {
    method: "POST",
    headers
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Content saved, but Vercel redeploy could not be triggered.");
  return data;
}

async function verifySession() {
  await supabaseRequest("/auth/v1/user", {
    headers: await authHeaders()
  });
}

async function checkSupabaseSetup() {
  supabaseSetup = {
    table: await hasSiteDocumentsTable(),
    bucket: await hasStorageBucket()
  };

  if (!supabaseSetup.table || !supabaseSetup.bucket) {
    const missing = [];
    if (!supabaseSetup.table) missing.push("site_documents table");
    if (!supabaseSetup.bucket) missing.push("hize-images bucket");
    setStatus(
      globalStatus,
      `Supabase setup incomplete: missing ${missing.join(" and ")}. Run the SQL migration in supabase/migrations/20260512170000_hize_admin_content.sql.`,
      "error"
    );
  }
}

async function hasSiteDocumentsTable() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/site_documents?select=key&limit=1`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${session.access_token}`
    }
  });
  if (response.ok) return true;
  const detail = await response.json().catch(() => ({}));
  return !/could not find the table|schema cache/i.test(detail.message || detail.error || "");
}

async function hasStorageBucket() {
  const response = await fetch(`${SUPABASE_URL}/storage/v1/bucket/${STORAGE_BUCKET}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${session.access_token}`
    }
  });
  if (response.ok) return true;
  const detail = await response.json().catch(() => ({}));
  return !/bucket not found/i.test(detail.message || detail.error || "");
}

async function signOut() {
  if (session?.access_token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${session.access_token}`
      }
    }).catch(() => null);
  }
  clearStoredSession();
}

async function authHeaders() {
  await ensureSession();
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${session.access_token}`,
    "Content-Type": "application/json"
  };
}

async function ensureSession() {
  if (session?.access_token && session.expires_at && Date.now() < session.expires_at - 30000) return;
  if (!session?.refresh_token) throw new Error("Session expired. Please sign in again.");

  const data = await supabaseRequest("/auth/v1/token?grant_type=refresh_token", {
    method: "POST",
    body: { refresh_token: session.refresh_token },
    skipAuth: true
  });
  storeSession(data);
}

async function supabaseRequest(path, options = {}) {
  const headers = {
    apikey: SUPABASE_KEY,
    ...(options.headers || {})
  };

  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.msg || detail.message || detail.error_description || detail.error || `Request failed with status ${response.status}`);
  }

  if (options.expectJson === false || response.status === 204) return {};
  return response.json();
}

function storeSession(data) {
  const expiresIn = Number(data.expires_in || 3600);
  session = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + expiresIn * 1000
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function loadStoredSession() {
  try {
    const value = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (!value?.access_token) return null;
    return value;
  } catch {
    return null;
  }
}

function clearStoredSession() {
  session = null;
  localStorage.removeItem(SESSION_KEY);
}

function authErrorMessage(error) {
  if (/invalid login/i.test(error.message)) {
    return "Invalid email or password. Check that this user exists in Supabase Auth.";
  }
  return error.message || "Login failed.";
}

function contentErrorMessage(error) {
  if (/site_documents|schema cache|could not find the table/i.test(error.message)) {
    return "Supabase login works, but the content table is not installed yet. Run the SQL migration in supabase/migrations, then reload this admin.";
  }
  return error.message || "Could not load content from Supabase.";
}

function updateValue(file, path, value) {
  setValue(file, path, value);
  markDirty(file);
}

function markDirty(file) {
  dirtyFiles.add(file);
}

function getValue(file, path) {
  return path.reduce((value, key) => value?.[key], files[file]);
}

function setValue(file, path, value) {
  const target = path.slice(0, -1).reduce((object, key) => object[key], files[file]);
  target[path[path.length - 1]] = value;
}

function cleanLabel(label) {
  const key = String(label);
  if (titleMap[key]) return titleMap[key];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .trim();
}

function isImageField(label, value) {
  return /(image|mainImage|seoImage|portraitImage|heroImage|src)$/i.test(String(label)) || /\.(jpe?g|png|webp|gif)$/i.test(value);
}

function shouldUseTextarea(label, value) {
  return value.length > 80 || /(description|intro|text|lead|quote|subtitle|paragraph|alt)$/i.test(String(label));
}

function defaultArrayItem(label, array) {
  if (array.length) return clone(array[array.length - 1]);
  const key = String(label).toLowerCase();
  if (key.includes("gallery") || key.includes("files")) return "";
  if (key.includes("visual")) return { src: "/assets/images/vr-art/hize-vr-5.jpg", alt: "Hize visual artwork" };
  if (key.includes("discipline")) return { eyebrow: "New discipline", title: "New title", text: "Description text." };
  if (key.includes("path")) return { eyebrow: "New path", title: "New title", text: "Description text." };
  return { title: "New item", text: "Description text." };
}

function uploadFolderForPath(path) {
  const joined = path.join("-").toLowerCase();
  if (joined.includes("mural")) return "murals";
  if (joined.includes("project")) return "projects";
  if (joined.includes("vrart") || joined.includes("vr-art") || joined.includes("visual")) return "vr-art";
  if (joined.includes("about") || joined.includes("portrait")) return "about";
  if (joined.includes("hero") || joined.includes("featured")) return "featured";
  if (joined.includes("canvas") || joined.includes("work")) return "canvas";
  return "uploads";
}

function sanitizeFilename(filename) {
  const cleaned = filename
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "upload.jpg";
}

function smallButton(label, onClick, extraClass = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `secondary small-button ${extraClass}`.trim();
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function setStatus(element, message, type = "") {
  element.textContent = message || "";
  element.classList.toggle("is-error", type === "error");
  element.classList.toggle("is-ok", type === "ok");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}
