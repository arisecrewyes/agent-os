// Browser automation scraper using Playwright
const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2];
  const selector = process.argv[3];
  const waitFor = process.argv[4];

  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.goto(url, { waitUntil: 'networkdomcontentloaded', timeout: 30000 });
    
    if (waitFor) {
      await page.waitForSelector(waitFor, { timeout: 10000 });
    }

    let result;
    if (selector) {
      const elements = await page.$$eval(selector, els => els.map(el => ({
        text: el.textContent?.trim(),
        href: el.href || null,
        html: el.innerHTML
      })));
      result = { count: elements.length, elements };
    } else {
      const title = await page.title();
      const content = await page.content();
      result = { title, contentLength: content.length, url: page.url() };
    }

    await browser.close();
    console.log(JSON.stringify(result));
    process.exit(0);
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
})();
