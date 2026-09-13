import { test, expect } from "@playwright/test";

test("landing page loads", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/NoteFlow/i);
  await expect(page.locator("#root")).not.toBeEmpty();
});
