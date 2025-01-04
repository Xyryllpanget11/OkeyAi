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

      // Debug the full API response for clarity
      console.log("API Response:", response.data);

      if (response.data && response.data.response) {
        // Extract the AI's response and send it to the user
        api.sendMessage(response.data.response, event.sender.id);
      } else {
        api.sendMessage("Unexpected response from the AI. Please try again later.", event.sender.id);
      }
    } catch (err) {
      console.error("Error during API call:", err);
      api.sendMessage("An error occurred while processing your request. Please try again later.", event.sender.id);
    }
  }
};
