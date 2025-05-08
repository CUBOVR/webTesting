import { test, expect } from "@playwright/test";

test("test basico investing", async ({ page }) => {
  await page.goto("https://mx.investing.com/");
  const name = await page
    .getByRole("cell", { name: "S&P/BMV IPC" })
    .first()
    .allInnerTexts();
  const price = await page
    .getByRole("cell", { name: "56,720.12" })
    .first()
    .allInnerTexts(); //
  const alzabaja = await page
    .getByRole("cell", { name: "+338.12" })
    .first()
    .allInnerTexts();
  await page.getByRole("link", { name: "Mostrar todos los índices" }).click();
  console.log(`${name} | ${price} | ${alzabaja}`);
  await page.locator('[data-test="sign-up-dialog-close-button"] use').click();
});
