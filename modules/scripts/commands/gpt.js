const axios = require("axios");

module.exports.config = {
  name: "ai",
  author: "Yan Maglinte",
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
      const response = await axios.post(
        "https://api.okeymeta.com.ng/api/ssailm/model/okeyai3.0-vanguard/okeyai",
        {
          prompt: prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.result) {
        api.sendMessage(response.data.result, event.sender.id);
      } else {
        api.sendMessage("Received an unexpected response from the AI.", event.sender.id);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while communicating with the AI.", event.sender.id);
    }
  } else if (event.type === "message_reply") {
    let prompt = `Message: "${args.join(" ")}"\n\nReplying to: ${event.message.reply_to.text}`;

    try {
      const response = await axios.post(
        "https://api.okeymeta.com.ng/api/ssailm/model/okeyai3.0-vanguard/okeyai",
        {
          prompt: prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.result) {
        api.sendMessage(response.data.result, event.sender.id);
      } else {
        api.sendMessage("Received an unexpected response from the AI.", event.sender.id);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while communicating with the AI.", event.sender.id);
    }
  }
};
