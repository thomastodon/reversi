const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

describe('app', () => {

  let browser, page;

  beforeEach(async () => {

    const app = express();
    app.use(express.static(path.join(__dirname, '..', '..', '..', 'dist')));
    app.listen(3000, () => console.log('App listening on port 3000!'));

    browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
      args: ['--disable-extensions']
    });

    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  describe('when the user clicks the button', () => {

    beforeEach(async () => {
      await page.click('#button');
      await page.waitFor(1000);
    });

    it('renders the response on the page', async () => {
      expect(await page.content()).toContain('Dominique Francon')
    });
  });

  afterEach(async () => {
    await browser.close();
  });
});
