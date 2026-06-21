// Browser automation - fill and submit forms
const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2];
  const fields = JSON.parse(process.argv[3]);

  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkdomcontentloaded', timeout: 30000 });

    // Fill each field
    for (const [selector, value] of Object.entries(fields)) {
      if (selector.startsWith('select:')) {
        const sel = selector.replace('select:', '');
        await page.selectOption(sel, value, { timeout: 10000 });
      } else if (selector.startsWith('check:')) {
        const sel = selector.replace('check:', '');
        if (value) await page.check(sel, { timeout: 10000 });
        else await page.uncheck(sel, { timeout: 10000 });
      } else if (selector.startsWith('click:')) {
        const sel = selector.replace('click:', '');
        await page.click(sel, { timeout: 10000 });
      } else {
        await page.fill(selector, value, { timeout: 10000 });
      }
    }

    await page.waitForTimeout(1000);
    const title = await page.title();
    const currentUrl = page.url();
    await browser.close();

    console.log(JSON.stringify({ success: true, title, url: currentUrl, fieldsFilled: Object.keys(fields).length }));
    process.exit(0);
  } catch (err) {
    console.error(JSON.stringify({ error: err.message }));
    process.exit(1);
  }
})();
