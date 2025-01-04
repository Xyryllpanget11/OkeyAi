const axios = require("axios");

module.exports.config = {
  name: "ai",
  author: "okechukwu",
  version: "1.0",
  category: "AI",
  description: "Chat with OkeyAI",
  adminOnly: false,
  usePrefix: false,
  cooldown: 10,
};

module.exports.run = async function ({ event, args, api }) {
  if (!api || typeof api.sendMessage !== "function") {
    console.error("API object is missing or invalid. Using fallback.");
    api = {
      sendMessage: (message, recipientId) =>
        console.log(`Fallback: Sending message to ${recipientId}: ${message}`),
    };
  }

  if (event.type === "message") {
    let prompt = args.join(" ");
    if (!prompt) {
      return api.sendMessage("Please provide a prompt.", event.sender.id);
    }

    try {
      const response = await axios.get(
        `https://api.okeymeta.com.ng/api/ssailm/model/okeyai3.0-vanguard/okeyai?input=${encodeURIComponent(prompt)}`
      );

      if (response.data && response.data.result) {
        api.sendMessage(response.data.result, event.sender.id);
      } else {
        api.sendMessage("Unexpected response from the AI.", event.sender.id);
      }
    } catch (err) {
      console.error(err);
      api.sendMessage("An error occurred while processing your request.", event.sender.id);
    }
  }
};
