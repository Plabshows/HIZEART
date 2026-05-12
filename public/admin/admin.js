const files = {};
const dirtyFiles = new Set();
let activeSection = null;
let activeButton = null;
let currentUploadButton = null;

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
    description: "Describe the work here.",
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
    description: "Describe the project here.",
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
    description: "Describe the mural here.",
    image: "/assets/images/murals/mural-torreblanca.jpg",
    gallery: [],
    alt: "Hize abstract graffiti mural in a contemporary space"
  },
  exhibition: {
    year: "2026",
    title: "New Exhibition",
    type: "Exhibition",
    location: "International",
    description: "Describe the exhibition or collaboration here."
  },
  collaboration: {
    name: "New Collaboration",
    type: "Brand Collaboration"
  },
  asset: {
    category: "Uploads",
    path: "/assets/images/uploads",
    files: []
  }
};

const titleMap = {
  seoTitle: "SEO title",
  seoDescription: "SEO description",
  seoImage: "SEO image",
  heroTitle: "Hero title",
  heroImage: "Hero image",
  heroAlt: "Hero alt text",
  mainImage: "Main image",
  vrArt: "VR Art",
  availableWorks: "Available Works"
};

init();

async function init() {
  bindEvents();
  const session = await api("/api/admin/session/");
  if (session.authenticated) {
    await showDashboard();
  } else {
    showLogin();
  }
}

function bindEvents() {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus(loginStatus, "Checking credentials...");
    const form = new FormData(loginForm);
    try {
      await api("/api/admin/login/", {
        method: "POST",
        body: {
          email: form.get("email"),
          password: form.get("password")
        }
      });
      loginForm.reset();
      loginForm.email.value = "info@hizeart.com";
      await showDashboard();
    } catch (error) {
      setStatus(loginStatus, error.message, "error");
    }
  });

  saveButton.addEventListener("click", saveContent);
  logoutButton.addEventListener("click", async () => {
    await api("/api/admin/logout/", { method: "POST" }).catch(() => null);
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
  setStatus(globalStatus, "Loading content...");
  const data = await api("/api/admin/content/");
  Object.assign(files, data.files);
  renderNav();
  activateSection(sections[0], sectionNav.querySelector("button"));
  setStatus(globalStatus, "Content loaded.", "ok");
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
      ? "Edit the page copy, SEO text, buttons and section images."
      : "Edit list items. Uploaded images are saved to GitHub, then linked in these fields.";
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
  if (value && value.startsWith("/")) {
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
      throw new Error("The image is too large. Please upload an optimized image under 8 MB.");
    }

    setStatus(globalStatus, `Uploading ${file.name}...`);
    const contentBase64 = await readAsDataUrl(file);
    const folder = uploadFolderForPath(currentUploadButton.path);
    const result = await api("/api/admin/upload/", {
      method: "POST",
      body: { filename: file.name, folder, contentBase64 }
    });
    updateValue(currentUploadButton.file, currentUploadButton.path, result.path);
    setStatus(globalStatus, "Image uploaded. Now click Save changes to publish the image on the site.", "ok");
    renderEditor();
  } catch (error) {
    setStatus(globalStatus, error.message || "Image upload failed.", "error");
  }
}

async function saveContent() {
  setStatus(globalStatus, "Saving to GitHub...");
  try {
    await api("/api/admin/content/", {
      method: "PUT",
      body: {
        files: clone(files),
        message: "admin: update HIZE ART content"
      }
    });
    dirtyFiles.clear();
    setStatus(globalStatus, "Saved. Vercel will redeploy the site automatically.", "ok");
  } catch (error) {
    setStatus(globalStatus, error.message, "error");
  }
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || "GET",
    credentials: "include",
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
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
  return "uploads";
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

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
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
