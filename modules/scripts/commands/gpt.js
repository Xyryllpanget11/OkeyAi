const axios = require("axios");

module.exports.config = {
  name: "ai",
  author: "okechukwu",
  version: "1.0",
  category: "AI",
  description: "Interact with OkeyAI Vanguard",
  adminOnly: false,
  usePrefix: false,
  cooldown: 3,
};

module.exports.run = async function ({ event, args, api }) {
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
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      api.sendMessage(
        `An error occurred: ${error.response?.data?.message || error.message}`,
        event.sender.id
      );
    }
  } else if (event.type === "message_reply") {
    let prompt = `Message: "${args.join(" ")}"\n\nReplying to: ${event.message.reply_to.text}`;

    try {
      const response = await axios.get(
        `https://api.okeymeta.com.ng/api/ssailm/model/okeyai3.0-vanguard/okeyai?input=${encodeURIComponent(prompt)}`
      );

      if (response.data && response.data.result) {
        api.sendMessage(response.data.result, event.sender.id);
      } else {
        api.sendMessage("Unexpected response from the AI.", event.sender.id);
      }
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      api.sendMessage(
        `An error occurred: ${error.response?.data?.message || error.message}`,
        event.sender.id
      );
    }
  }
};
