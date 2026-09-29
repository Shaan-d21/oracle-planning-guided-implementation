import { chromium } from "playwright";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });

await page.goto("http://127.0.0.1:3000/learn?track=implementation", { waitUntil: "networkidle" });
await page.screenshot({ path: ".ppt-build/dashboard.png", fullPage: false });

await browser.close();
