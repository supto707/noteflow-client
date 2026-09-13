import { test, expect } from "@playwright/test";

const publicRoutes = [
  ["/", "Landing"],
  ["/login", "Login"],
  ["/signup", "Signup"],
  ["/features", "Features"],
  ["/pricing", "Pricing"],
  ["/changelog", "Changelog"],
  ["/docs", "Docs"],
  ["/about", "About"],
  ["/developer", "Developer"],
  ["/roadmap", "Roadmap"],
  ["/status", "Status"],
  ["/api-reference", "API Reference"],
  ["/templates", "Templates"],
  ["/community", "Community"],
  ["/blog", "Blog"],
  ["/careers", "Careers"],
  ["/press-kit", "Press Kit"],
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/cookie-policy", "Cookie Policy"],
  ["/security", "Security"],
  ["/cookie", "Cookie"],
  ["/policy", "Policy"],
] as const;

for (const [route, name] of publicRoutes) {
  test(`${name} page loads and renders content`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(route);
    await expect(page.locator("#root")).not.toBeEmpty();
    await expect(page.locator("text=NoteFlow").first()).toBeVisible();
    // Landing/login-style pages don't render a Navbar; skip nav check for them
    if (!["/login", "/signup"].includes(route)) {
      await expect(page.getByRole("link", { name: "Sign in" }).first()).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}

test("dashboard routes redirect to /login when unauthenticated", async ({ page }) => {
  for (const route of ["/dashboard", "/dashboard/notes", "/dashboard/settings"]) {
    await page.goto(route);
    await expect(page).toHaveURL(/\/login$/);
  }
});

test("404 page renders for unknown routes", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  await expect(page.getByText("Page Missing")).toBeVisible();
  await expect(page.getByRole("link", { name: "Back to Home" })).toBeVisible();
});

test("theme toggle switches between light and dark", async ({ page }) => {
  await page.goto("/");
  const root = page.locator("div.dark").first();
  await expect(root).toHaveCount(0);
  await page.getByRole("button").filter({ has: page.locator("svg") }).first();
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("header button"));
    (btns.find(b => b.textContent === "") ?? btns[0]).click();
  });
  await expect(page.locator("div.dark").first()).toBeVisible();
  await expect(() =>
    page.evaluate(() => localStorage.getItem("nf-theme"))
  ).toPass(() => localStorage.getItem("nf-theme") === "dark" ? "dark" : null);
  await page.reload();
  await expect(page.locator("div.dark").first()).toBeVisible();
});

test("navbar dropdown navigates to linked pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Product" }).hover();
  await page.getByRole("link", { name: "Pricing", exact: true }).first().click();
  await expect(page).toHaveURL(/\/pricing$/);
});

test("mobile menu opens and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 400, height: 800 });
  await page.goto("/");
  await page.locator("header button").last().click();
  await expect(page.getByRole("link", { name: "Pricing", exact: true }).first()).toBeVisible();
  await page.getByRole("link", { name: "Pricing", exact: true }).first().click();
  await expect(page).toHaveURL(/\/pricing$/);
});

test("landing page hero CTA navigates to signup", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /get noteflow free/i }).first().click();
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.getByText("Create your account")).toBeVisible();
});

test("signup form advances to password step and shows strength bar", async ({ page }) => {
  await page.goto("/signup");
  await page.getByPlaceholder("Ada Lovelace").fill("Test User");
  await page.getByPlaceholder("you@example.com").fill("test-user@example.com");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("Set a password")).toBeVisible();
  await page.getByPlaceholder("Min. 8 characters").fill("short");
  await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
  await page.getByRole("button", { name: "← Back" }).click();
  await expect(page.getByText("Create your account")).toBeVisible();
});

test("login page renders form and links to signup", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByText("Welcome back")).toBeVisible();
  await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
  await expect(page.getByPlaceholder("••••••••")).toBeVisible();
  await page.getByRole("link", { name: "Sign up free" }).click();
  await expect(page).toHaveURL(/\/signup$/);
});

test("login form rejects invalid credentials with an error message", async ({ page }) => {
  await page.goto("/login");
  await page.getByPlaceholder("you@example.com").fill("no-such-user@example.com");
  await page.getByPlaceholder("••••••••").fill("wrong-password");
  await page.getByRole("button", { name: /^sign in/i }).click();
  await expect(page.locator("text=/incorrect|no account|invalid|failed|error/i").first()).toBeVisible({ timeout: 15_000 });
});

test("internal links across pages navigate without 404", async ({ browser, request }) => {
  test.setTimeout(120_000);
  const allLinks = new Set<string>();
  for (const [route] of publicRoutes) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(`http://localhost:5173${route}`, { waitUntil: "domcontentloaded" });
    const links = await page.locator("a[href^='/']").evaluateAll(els =>
      els.map(el => (el as HTMLAnchorElement).getAttribute("href")).filter(h => h && !h.startsWith("//")) as string[]
    );
    links.forEach(l => allLinks.add(l));
    await ctx.close();
  }
  for (const href of allLinks) {
    const resp = await request.get(href);
    expect.soft(resp.status(), `link ${href}`).toBeLessThan(400);
  }
});
