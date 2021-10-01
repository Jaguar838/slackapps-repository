const { App } = require("@slack/bolt");
const { config } = require("dotenv");
const LogLevel = require("loglevel");

config();
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.debug,
});

// Reverse all messages the app can hear
app.message(async ({ message, say }) => {
  const reversedText = [...message.text].reverse().join("");
  await say(reversedText);
});

app.message("hello", async ({ message, say }) => {
  await say(`Hello, <@${message.user}>!`);
});

// Start your app
(async () => {
  await app
    .start(process.env.PORT || 4200)
    .then(() => console.log("⚡️ Bolt app is running! ⚡️"));
})();
