import { REST } from "@discordjs/rest";
import { ChannelsAPI } from "@discordjs/core";

// Create REST and WebSocket managers directly
const rest = new REST({ version: "10" }).setToken(
  "MTEwMDg1NjY1OTY0OTIzMjkwOA.Gxvxat.lILLFYRFvpF3QwIosNr-NNzw6GdjUhL0v7mb8g"
);

const chanAPI = new ChannelsAPI(rest);

async function run() {
  await chanAPI.createMessage("1022529583792275496", {
    content:
      "staging env has been updated : https://staging.pierre.wns.wilders.dev",
  });

  console.log("done");
}

run();
