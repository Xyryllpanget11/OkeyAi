const axios = require('axios');  // Import axios for making HTTP requests

module.exports.config = {
  name: "ai",  // Name of the command
  author: "okechukwu",  // Author's name
  version: "1.0",  // Version of the command
  category: "AI",  // Category for the command
  description: "Chat with OkeyAI",  // Description of what the command does
  adminOnly: false,  // Whether it's for admin only
  usePrefix: false,  // Whether to use a prefix for the command
  cooldown: 10,  // Cooldown time in seconds
};

module.exports.run = async function ({ event, args, api }) {
  // If no message is provided, prompt the user
  let userPrompt = args.join(" ");
  if (!userPrompt) {
    return api.sendMessage("Please provide a message to chat with OkeyAI.", event.sender.id);
  }

  try {
    // Make the request to the OkeyAI API with the user input
    const response = await axios.get(`https://api.okeymeta.com.ng/api/ssailm/model/okeyai3.0-vanguard/okeyai?input=${encodeURIComponent(userPrompt)}`);

    // Check if the API returns a response and extract it
    if (response.data && response.data.response) {
      // Send the AI's response back to the user
      api.sendMessage(response.data.response, event.sender.id);
    } else {
      // Handle case where the API response does not contain the expected data
      api.sendMessage("Sorry, I couldn't get a response from the AI. Please try again.", event.sender.id);
    }
  } catch (err) {
    // Catch any errors and send an error message
    console.error("Error during API call:", err);
    api.sendMessage("An error occurred while communicating with the AI. Please try again later.", event.sender.id);
  }
};
