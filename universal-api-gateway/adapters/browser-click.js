// Browser automation - click/interact with elements
const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2];
  const selector = process.argv[3];
  const action = process.argv[4] || 'click';
  const value = process.argv[5] || '';

  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkdomcontentloaded', timeout: 30000 });

    switch (action) {
      case 'click':
        await page.click(selector, { timeout: 10000 });
        break;
      case 'fill':
        await page.fill(selector, value, { timeout: 10000 });
        break;
      case 'select':
        await page.selectOption(selector, value, { timeout: 10000 });
        break;
      case 'type':
        await page.type(selector, value, { timeout: 10000 });
        break;
      case 'hover':
        await page.hover(selector, { timeout: 10000 });
        break;
      default:
        await page.click(selector, { timeout: 10000 });
    }

    // Wait a moment for any resulting changes
    await page.waitForTimeout(1000);

    const title = await page.title();
    const currentUrl = page.url();
    await browser.close();

    console.log(JSON.stringify({ success: true, title, url: currentUrl, action, selector }));
    process.exit(0);
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
})();
