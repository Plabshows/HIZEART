import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4321";
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const screenshotDir = path.resolve("artifacts/screenshots");
const pages = ["/", "/works/", "/available-works/", "/murals/", "/projects/", "/vr-art/", "/exhibitions/", "/about/", "/contact/"];
const errors = [];

await fs.mkdir(screenshotDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

async function withPage(viewport, callback) {
  const page = await browser.newPage();
  await page.setViewport(viewport);

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`Console error: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`Page error: ${error.message}`));
  page.on("requestfailed", (request) => {
    const failure = request.failure();
    errors.push(`Request failed: ${request.url()} ${failure?.errorText || ""}`);
  });

  try {
    await callback(page);
  } finally {
    await page.close();
  }
}

for (const route of pages) {
  await withPage({ width: 1440, height: 980, deviceScaleFactor: 1 }, async (page) => {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle0" });
    if (!response?.ok()) errors.push(`Bad status on ${route}: ${response?.status()}`);
    const h1 = await page.$eval("h1", (node) => node.textContent?.trim());
    if (!h1) errors.push(`Missing h1 on ${route}`);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
      window.scrollTo(0, 0);
    });
    const brokenImages = await page.$$eval("img", (images) =>
      images.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.getAttribute("src"))
    );
    if (brokenImages.length) errors.push(`Broken images on ${route}: ${brokenImages.join(", ")}`);
  });
}

await withPage({ width: 1440, height: 980, deviceScaleFactor: 1 }, async (page) => {
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: path.join(screenshotDir, "home-desktop.png"), fullPage: false });
});

await withPage({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }, async (page) => {
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: path.join(screenshotDir, "home-mobile.png"), fullPage: false });
  await page.click("[data-menu-toggle]");
  const menuState = await page.$eval("[data-menu-toggle]", (button) => button.getAttribute("aria-expanded"));
  const navOpen = await page.$eval("[data-site-nav]", (nav) => nav.classList.contains("is-open"));
  if (menuState !== "true" || !navOpen) errors.push("Mobile menu did not open correctly.");
  await page.screenshot({ path: path.join(screenshotDir, "home-mobile-menu.png"), fullPage: false });
});

await withPage({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }, async (page) => {
  await page.goto(`${baseUrl}/works/?filter=canvas`, { waitUntil: "networkidle0" });
  const active = await page.$eval('[data-filter-button="canvas"]', (button) => button.getAttribute("aria-pressed"));
  if (active !== "true") errors.push("Initial works filter did not activate from query string.");
  await page.click('[data-filter-button="available"]');
  const activeAvailable = await page.$eval('[data-filter-button="available"]', (button) => button.getAttribute("aria-pressed"));
  if (activeAvailable !== "true") errors.push("Available filter did not activate.");
  const visibleAvailableItems = await page.$$eval("[data-filter-item]:not([hidden])", (items) => items.length);
  if (visibleAvailableItems < 1) errors.push("Available filter did not show any works.");
});

await withPage({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }, async (page) => {
  await page.goto(`${baseUrl}/contact/`, { waitUntil: "networkidle0" });
  await page.type('input[name="name"]', "Test User");
  await page.type('input[name="email"]', "test@example.com");
  await page.select('select[name="type"]', "Mural commission");
  await page.type('textarea[name="message"]', "Testing the contact form.");
  const formReady = await page.$eval(".contact-form", (form) => form.getAttribute("data-netlify") === "true");
  if (!formReady) errors.push("Contact form is not Netlify-ready.");
});

await browser.close();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Browser checks passed for desktop, mobile menu, filters, images and contact form.");
process.exit(0);
