import dotenv from "dotenv";
import puppeteer from "puppeteer";
import fs from "fs";

// Load the credentials from the .env file
dotenv.config();

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.goto("https://chat.openai.com/auth/login", {
    waitUntil: "domcontentloaded",
  });

  // Wait for the button with path 'document.querySelector("#__next > div > div > div.flex.flex-row.gap-3 > button:nth-child(1)")' to be visible and click on it
  const [loginButton] = await page.$x("//button[contains(text(), 'Log in')]");
  await loginButton.click();

  // Wait for path "document.querySelector("#username")" to be visible and type the value of the environment variable OPENAI_USERNAME into it
  await page.waitForSelector("#username");
  await page.type("#username", process.env.OPENAI_USERNAME);
  await page.keyboard.press("Enter");

  // Wait for path "document.querySelector("#password")" to be visible and type the value of the environment variable OPENAI_PASSWORD into it
  await page.waitForSelector("#password");
  await page.type("#password", process.env.OPENAI_PASSWORD);
  await page.keyboard.press("Enter");

  // wait for page change
  await page.waitForNavigation();
  // store cookies in a file for later use
  const cookies = await page.cookies();
  fs.writeFile(
    "user_data/cookies.json",
    JSON.stringify(
      cookies.filter(
        (cookie) => cookie.name === "__Secure-next-auth.session-token"
      )
    ),
    (err) => {
      if (err) throw err;
      console.log("Cookies saved to file.");
    }
  );

  // Send a message to the chat
  async function sendMessage(message) {
    await page.type(
      "#__next > div > div.flex.flex-1.flex-col.md\\:pl-52.h-full > main > div.sc-15plnpr-3.jqdtxi > form > div > div.sc-4snkpf-0.iLrIMi > textarea",
      message
    );
    await page.keyboard.press("Enter");
  }

  // When the browser receives a 200 response from the server called "moderations", display the payload preview in the console
  // page.on("response", (response) => {
  //   if (response.url().includes("moderations")) {
  //     let json = JSON.parse(response.request().postData());
  //     const messages = json.input.split("\n\n\n");
  //     // if message.lenght is odd, then the last message is from the user
  //     // if message.lenght is even, then the last message is from the bot
  //     if (messages.length % 2 === 0) {
  //       console.log("ChatGPT: ", messages[messages.length - 1]);
  //     } else {
  //       console.log("You: ", messages[messages.length - 1]);
  //     }
  //   }
  // });

  //TODO: 'Store a conversation history to get proper last message'

  //   await page.waitForSelector(
  //     "#__next > div > div.flex.flex-1.flex-col.md\\:pl-52.h-full > main > div.sc-15plnpr-3.jqdtxi > form > div > div.sc-4snkpf-0.iLrIMi > textarea"
  //   );
  //   await sendMessage("Hello, world!");

  //   browser.on("close", () => {
  //     process.exit(0);
  //   });
}
main();
