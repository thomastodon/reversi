const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

describe('app', () => {

  let browser, page;

  beforeAll(() => {
    const app = express();
    app.use(express.static(path.join(__dirname, '..', '..', '..', 'dist')));
    app.listen(3000, () => console.log('App listening on port 3000!'));
  });

  describe('when the page loads', () => {

    beforeEach(async () => {

      browser = await puppeteer.launch({
        headless: true,
        slowMo: 0,
        args: ['--disable-extensions']
      });

      page = await browser.newPage();
      await page.goto('http://localhost:3000');
    });

    it('renders the title on the page', async () => {
      expect(await page.content()).toContain('reversi');
    });

    it('renders a button', async () => {
      expect(await page.$('#button')).toBeTruthy();
    });

    it('renders the board', async () => {
      expect(await page.$('.board')).toBeTruthy();
    });

    describe('when the user clicks the fountainhead button', () => {

      beforeEach(async () => {
        await page.click('#button');
        await page.waitFor(1000);
      });

      it('learns about the fountainhead', async () => {
        expect(await page.content()).toContain('Dominique Francon');
      });
    });

    describe('when the user clicks the end game button', () => {

      beforeEach(async () => {
        await page.click('#end-game');
        await page.waitFor(500);
      });

      it('routes to a new view', async () => {
        const url = await page.evaluate('location.href');
        expect(url.split("/").pop()).toBe('game_over');
      });
    });

    afterEach(async () => {
      await browser.close();
    });
  });
});
