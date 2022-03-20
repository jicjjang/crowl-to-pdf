import puppeteer from "puppeteer";

puppeteer.launch().then(async (browser) => {
  const page = await browser.newPage();

  await page.goto("https://jicjjang.github.io/posts/raffle", {
    waitUntil: "networkidle2",
  });

  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewport({ width: bodyWidth, height: bodyHeight });

  await page.waitForTimeout(1000);

  // image
  await page.screenshot({
    fullPage: true,
    quality: 100,
    path: `test-${new Date().toISOString().substr(0, 10)}.jpeg`,
  });

  // pdf
  await page.pdf({ path: "hn.pdf", format: "a4" });

  await browser.close();
});
