const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

// PŮVODNÍ PŘÍKAZ PING
app.command("/smartbot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

// <--- SEM VLOŽÍŠ TEN NOVÝ PŘÍKAZ HELP --->
app.command("/smartbot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/smartbot-ping - Check bot latency
/smartbot-catfact - Get a cat fact`
  });
});


app.command("/smartbot-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});


app.command("/smartbot-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});
// SPUŠTĚNÍ BOTA (Tohle musí zůstat úplně na konci souboru)
(async () => {
  await app.start();
  console.log("bot is running!");
})();