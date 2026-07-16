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
/smartbot-help - Show available commands
/smartbot-catfact - Get a cat fact
/smartbot-dogfact - Get a dog fact`
  });
});

app.command("/smartbot-dogfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://dogapi.dog/api/v2/facts?limit=1");
    const dogFact = response.data.data[0].attributes.body;
    await respond({ text: `Dog Fact:\n${dogFact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a dog fact." });
  }
});


app.command("/smartbot-catpicture", async ({ ack, respond }) => {
  await ack();

  try {
    // Voláme API bez "?format=src", aby nám vrátilo JSON
    const response = await axios.get("https://api.thecatapi.com/v1/images/search");
    const catImageUrl = response.data[0].url;
    
    await respond({ text: `Cat Picture:\n${catImageUrl}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat picture." });
  }
});

app.command("/smartbot-duckpicture", async ({ ack, respond }) => {
  await ack();

  try {
    // Voláme API endpoint pro náhodnou kachnu
    const response = await axios.get("https://random-d.uk/api/v2/random");
    const duckImageUrl = response.data.url;
    
    await respond({ text: `Duck Picture:\n${duckImageUrl}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a duck picture." });
  }
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