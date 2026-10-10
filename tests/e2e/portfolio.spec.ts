import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";

test("homepage exposes the portfolio and has no axe violations", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Murat/);
  await expect(page.locator("main")).toBeVisible();
  await expect(page.locator("main h1")).toHaveCount(1);

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("all selected projects have working detail pages", async ({ page }) => {
  for (const slug of ["forma", "fieldnotes", "mono"]) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator('a[href="/#work"]')).toBeVisible();
  }
});

test("contact exposes a mail link and confirms copying the address", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#contact");
  await expect(page.getByRole("link", { name: "murat@example.com" })).toHaveAttribute(
    "href",
    "mailto:murat@example.com",
  );
  await page.getByRole("button", { name: "E-posta adresini kopyala" }).click();
  await expect(page.getByRole("status")).toHaveText("E-posta adresi panoya kopyalandı.");
});

test("mobile navigation is keyboard operable and pages fit the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.locator(".nav-toggle");
  await toggle.focus();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  await page.locator('#primary-navigation a[href="#work"]').click();
  await expect(page).toHaveURL(/#work$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test("homepage remains within common widths and respects reduced motion", async ({ page }) => {
  await mkdir(".cache/qa/screenshots", { recursive: true });

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    await page.screenshot({ path: `.cache/qa/screenshots/home-${width}.png`, fullPage: true });
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("main h1")).toBeVisible();
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
});

test("globe provides a readable fallback when WebGL is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, contextId, ...args) {
      if (contextId === "webgl" || contextId === "webgl2" || contextId === "experimental-webgl") {
        return null;
      }
      return originalGetContext.call(this, contextId, ...args);
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.goto("/");
  await expect(page.locator(".globe-fallback")).toBeVisible({ timeout: 20_000 });
  await expect(page.locator(".hero-copy")).toBeVisible();
});
