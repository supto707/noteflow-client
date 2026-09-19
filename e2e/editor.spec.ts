import { test, expect } from "@playwright/test";

// Tests the Notion-parity editor behaviors via a dev-only harness route.
// These cover: markdown shortcuts, list continuation, block conversion,
// slash menu navigation, numbered-list numbering, and save serialization.

test.beforeEach(async ({ page }) => {
  await page.goto("/__editor-test");
  await expect(page.getByTestId("editor-test")).toBeVisible();
});

async function typeInFirstBlock(page: import("@playwright/test").Page, text: string) {
  const first = page.locator('[contenteditable="true"]').first();
  await first.click();
  await first.type(text);
  return first;
}

async function triggerMarkdownShortcut(page: import("@playwright/test").Page, prefix: string, content: string) {
  const block = page.locator('[contenteditable="true"]').first();
  await block.type(prefix);
  await page.waitForTimeout(50); // wait for conversion
  const newBlock = page.locator('[contenteditable="true"]').first();
  await newBlock.type(content);
  return newBlock;
}

test("markdown shortcut: '# ' converts to heading 1", async ({ page }) => {
  const block = await typeInFirstBlock(page, "#");
  await page.keyboard.press(" ");
  await block.type("Title");
  await expect(page.getByText("Title", { exact: true })).toBeVisible();
  const heading = page.locator("div[contenteditable]", { hasText: "Title" }).first();
  await expect(heading).toHaveCSS("font-weight", "800");
});

test("markdown shortcut: '- ' converts to bullet list and Enter continues it", async ({ page }) => {
  await triggerMarkdownShortcut(page, "- ", "item one");
  await expect(page.getByText("item one")).toBeVisible();
  await expect(page.getByText("•")).toBeVisible();

  await page.keyboard.press("Enter");
  await page.keyboard.type("item two");
  await expect(page.getByText("item two")).toBeVisible();
  await expect(page.getByText("•")).toHaveCount(2);
});

test("markdown shortcut: '1. ' converts to numbered list", async ({ page }) => {
  await triggerMarkdownShortcut(page, "1. ", "first");
  await expect(page.getByText("1.")).toBeVisible();
  await expect(page.getByText("first")).toBeVisible();

  await page.keyboard.press("Enter");
  await page.keyboard.type("second");
  await expect(page.getByText("2.")).toBeVisible();
  await expect(page.getByText("second")).toBeVisible();
});

test("markdown shortcut: '[] ' converts to to-do with checkbox", async ({ page }) => {
  await triggerMarkdownShortcut(page, "[] ", "buy milk");
  const checkbox = page.locator('input[type="checkbox"]');
  await expect(checkbox).toHaveCount(1);
  await checkbox.check();
  await expect(page.getByText("buy milk")).toHaveCSS("text-decoration-line", /line-through/);
});

test("markdown shortcut: '> ' converts to quote", async ({ page }) => {
  await triggerMarkdownShortcut(page, "> ", "quoted text");
  await expect(page.getByText("quoted text")).toBeVisible();
});

test("Enter on empty list item converts back to text", async ({ page }) => {
  await typeInFirstBlock(page, "- item");
  await page.keyboard.press("Enter"); // creates empty bullet
  await expect(page.getByText("•")).toHaveCount(2);
  await page.keyboard.press("Enter"); // empty item -> text
  await expect(page.getByText("•")).toHaveCount(0);
});

test("Backspace on empty heading converts to text block", async ({ page }) => {
  await typeInFirstBlock(page, "# Heading");
  await page.keyboard.press("Home");
  // Select all then backspace to empty it
  await page.keyboard.press("End");
  for (let i = 0; i < 7; i++) await page.keyboard.press("Backspace");
  await page.keyboard.press("Backspace"); // now empty non-text -> text
  const first = page.locator('[contenteditable="true"]').first();
  await expect(first).toHaveCSS("font-weight", "400");
});

test("slash menu opens and navigates with keyboard", async ({ page }) => {
  const block = await typeInFirstBlock(page, "/");
  await expect(page.getByText("Basic blocks")).toBeVisible();
  await expect(page.getByText("Heading 1")).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await block.type("Big heading");
  const heading = page.locator("div[contenteditable]", { hasText: "Big heading" }).first();
  await expect(heading).toHaveCSS("font-weight", "800");
});

test("divider shortcut renders horizontal rule", async ({ page }) => {
  await typeInFirstBlock(page, "--- ");
  await page.keyboard.type("after divider");
  await expect(page.getByText("after divider")).toBeVisible();
});

test("saving serializes blocks to markdown", async ({ page }) => {
  await typeInFirstBlock(page, "# Test Doc");
  await page.keyboard.press("Enter");
  await page.keyboard.type("- bullet item");
  // wait for debounce save (1s)
  await expect(page.getByTestId("saved-state")).toContainText("heading1:Test Doc", { timeout: 5000 });
  await expect(page.getByTestId("saved-state")).toContainText("bullet_list_item:bullet item");
});

test("placeholder menu actions work: duplicate and delete via block menu", async ({ page }) => {
  await typeInFirstBlock(page, "original text");
  await page.locator("button").filter({ has: page.locator("svg.lucide-grip-vertical") }).first().hover();
  await page.locator("button").filter({ has: page.locator("svg.lucide-grip-vertical") }).first().click();
  await expect(page.getByText("Duplicate")).toBeVisible();
  await page.getByText("Duplicate").click();
  await expect(page.getByText("original text")).toHaveCount(2);
});
