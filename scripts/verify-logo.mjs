import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();

// Desktop header + footer
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.locator("header").screenshot({ path: "scripts/out-header-desktop.png" });
await page.locator("footer").scrollIntoViewIfNeeded();
await page.locator("footer").screenshot({ path: "scripts/out-footer-desktop.png" });

// Mobile header + hamburger overlay
await page.setViewportSize({ width: 375, height: 800 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.locator("header").screenshot({ path: "scripts/out-header-mobile.png" });
await page.getByLabel("פתח תפריט").click();
await page.waitForTimeout(400);
await page.screenshot({ path: "scripts/out-overlay-mobile.png" });

await browser.close();
console.log("done");
