import { Selector } from "testcafe";
import { url, checkElementScreenshot } from "../../helper";

const title = "Top Menu Screenshot";

fixture`${title}`.page`${url}`.beforeEach(async (t) => {
});

test("Top menu on designer tab", async (t) => {
  await t.resizeWindow(1920, 1080);

  const topBarElement = Selector(".svc-top-bar");

  await checkElementScreenshot("top-menu-designer-tab.png", topBarElement, t);

  await t.hover(Selector(".svc-tabbed-menu-item").nth(1));
  await checkElementScreenshot("top-menu-preview-hover.png", topBarElement, t);

  await t
    .click(Selector(".svc-toolbox"))
    .click(Selector(".svc-toolbox"));
  await checkElementScreenshot("top-menu-undo-active.png", topBarElement, t);

  await t
    .click(Selector("#icon-undo .sv-action-bar-item"))
    .click(Selector(".svc-side-bar .spg-row").nth(1));
  await checkElementScreenshot("top-menu-undo-and-redo-active.png", topBarElement, t);

  await t
    .click(Selector("#icon-undo .sv-action-bar-item"))
    .click(Selector(".svc-side-bar .spg-row").nth(1));
  await checkElementScreenshot("top-menu-redo-active.png", topBarElement, t);
});
