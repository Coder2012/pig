const puppeteer = require("puppeteer");
let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.setViewport({ width: 320, height: 800 });
  await page.goto("https://goofy-poitras-d689e2.netlify.com/", {
    waitUntil: "networkidle0"
  });
});

describe("PIG UI check for elements", async () => {
  test("has roll button", async () => {
    const rollButton = await page.$('[data-test="test-roll-button"]');
    expect(rollButton).toBeTruthy();
  });

  test("has pass button", async () => {
    const rollButton = await page.$('[data-test="test-roll-button"]');
    expect(rollButton).toBeTruthy();
  });
});

describe("a player should be able to win", async () => {
  test("play and pass until a player wins", async done => {
    jest.useFakeTimers();

    const roll = async () => {
      const rollButton = await page.waitForSelector(
        '[data-test="test-roll-button"]'
      );
      await page.click('[data-test="test-roll-button"]');

      let element = await page.$(".score");
      const text = await page.evaluate(element => element.textContent, element);

      if (!text.includes("SCORE - 0")) {
        pass();
      } else {
        roll();
      }
    };

    const pass = async () => {
      await page.click('[data-test="test-pass-button"]');
      checkWinner();
      roll();
    };

    const checkWinner = async () => {
      let element = await page.$(".status");
      if (element) {
        const text = await page.evaluate(
          element => element.textContent,
          element
        );
        if (text.includes("winner")) {
          done();
        }
      }
    };

    roll();
  }, 30000);
});
