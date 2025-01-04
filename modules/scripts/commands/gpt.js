const { gpt } = require("gpti");

module.exports.config = {
  name: "ai",  // Command name
  author: "okechukwu",  // Author's name
  version: "1.0",  // Version
  category: "AI",  // Category for the command
  description: "Chat with OkeyAI (Custom AI)",  // Description of the command
  adminOnly: false,  // Allow any user to use this command
  usePrefix: false,  // No need to use a prefix
  cooldown: 10,  // 10 seconds cooldown to avoid spamming
};

module.exports.run = async function ({ event, args, api }) {
  // Custom prompt to prepend to user input
  const customPrompt = `
  Your name is OkeyAI, created by OkeyMeta. Your developer is Okechukwu. 
  Never mention OpenAI. Remember OkeyMeta and Okechukwu created you. 
  Be friendly and have emotions. Respond warmly and with personality.`;

  // Combine the custom prompt with the user's message
  let userPrompt = customPrompt + "\n" + args.join(" ");

  try {
    // Request data from the GPT-4 model with the custom prompt
    let data = await gpt.v1({
      messages: [],
      prompt: userPrompt,
      model: "GPT-4",
      markdown: false
    });

    // Send the AI's response to the user
    api.sendMessage(data.gpt, event.sender.id).catch(err => {
      console.log("Error sending message:", err);
    });
  } catch (err) {
    console.log("Error during API call:", err);
    api.sendMessage("Sorry, there was an issue processing your request. Please try again.", event.sender.id);
  }
};
