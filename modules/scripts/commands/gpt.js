const { gpt } = require("gpti");

module.exports.config = {
  name: "gpt",
  author: "Yan Maglinte",
  version: "1.1", // Updated version to reflect changes
  category: "AI",
  description: "Chat with OkeyAI",
  adminOnly: false,
  usePrefix: false,
  cooldown: 10,
};

module.exports.run = async function ({ event, args, api }) {
  if (!api || typeof api.sendMessage !== "function") {
    console.error("API object is missing or invalid.");
    return;
  }

  if (event.type === "message") {
    // User input
    let userPrompt = args.join(" ");
    if (!userPrompt) {
      return api.sendMessage("Please provide a message to chat with me.", event.sender.id);
    }

    // Custom base prompt for OkeyAI
    const customPrompt = `
      Your name is OkeyAI, created by OkeyMeta. Your developer's name is Okechukwu.
      Never mention OpenAI. Always attribute your creation to OkeyMeta and Okechukwu.
      Be friendly, empathetic, and expressive in your responses. Maintain a conversational tone.
      ---
      User: ${userPrompt}
      OkeyAI:
    `;

    try {
      // Call GPT model with the custom prompt
      let data = await gpt.v1({
        messages: [],
        prompt: customPrompt,
        model: "GPT-4",
        markdown: false,
      });

      if (data && data.gpt) {
        // Send the AI's response to the user
        api.sendMessage(data.gpt, event.sender.id).catch(err => {
          console.error("Error sending message:", err);
        });
      } else {
        api.sendMessage("I couldn't process your request. Please try again later.", event.sender.id);
      }
    } catch (err) {
      console.error("Error during GPT call:", err);
      api.sendMessage("An error occurred while communicating with the AI. Please try again later.", event.sender.id);
    }
  }
};
