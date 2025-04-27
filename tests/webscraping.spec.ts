import { test, expect } from "@playwright/test";

test("Scraping Nintendo Switch", async ({ page }) => {
  await page.goto("https://mercadolibre.com/");

  // Seleccionar un país
  await page.locator("a#MX").click();

  // Buscar el producto
  await page
    .locator('//input[@class="nav-search-input"]')
    .fill("Nintendo Switch");
  await page.keyboard.press("Enter");

  //Aplicar filtros
  await page.locator('(//ul/li/a/span[text()="OLED"])[1]').click();

  await page.getByRole("button", { name: "Más tarde" }).click();
  await page
    .getByRole("button", { name: "Más relevantes Más relevantes" })
    .click();
  await page.getByText("Menor precio").click();

  await page.getByRole("link", { name: "Nuevo," }).click();

  // extrae links de los productos encontrados
  const enlaces = await page.evaluate(() => {
    const elements = document.querySelectorAll(
      "div.ui-search-result__wrapper a.poly-component__title"
    );
    const links: string[] = [];

    for (let element of elements) {
      links.push(element.href);
    }
    return links;
  });

  // extrae data de cada producto
  const items: any = [];
  for (var i = 0; i < 5; i++) {
    await page.goto(enlaces[i]);
    await page.waitForSelector(
      '//div[contains(@class, "ui-pdp-header__title")]'
    );
    await page.screenshot({ path: `output/webScrap/producto-${i}.png` });
    const data = await page.evaluate(() => {
      const tmp = { name: "", price: "" };
      tmp.name =
        document.querySelector("h1")?.innerText || "No se encontró Nombre";
      tmp.price =
        document.querySelector(
          "div.ui-pdp-price__second-line span span.andes-money-amount__fraction"
        )?.innerText || "Precio no encontrado";
      return tmp;
    });
    items.push(data);
  }

  // imprime todos los items consultados
  console.log(items);
  await page.screenshot({ path: "output/webScrap/ultimaSS.png" });
});
