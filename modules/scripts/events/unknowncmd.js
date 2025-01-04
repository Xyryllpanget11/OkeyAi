module.exports.config = {
  name: "UnknownCommandEvent",
  author: "modified by XyryllPanget",
  version: "1.0",
  description: "Handles any unknown messages and prompts the user to use /help for available commands.",
  selfListen: false,
};

module.exports.run = async function ({ event, args }) {
  if (event.type === "message") {
    // List of valid commands from the help menu
    const validCommands = [
      "get", "ai", "greet", "/help", "image"
    ];

    const userMessage = event.message.text.trim().toLowerCase();  // Get user message and convert to lowercase

    // Check if the user's message starts with any valid command
    const isValidCommand = validCommands.some(command => userMessage.startsWith(command));

    if (!isValidCommand) {
      // Send a friendly message for any unrecognized input, including simple words like "hello"
      const responseMessage = `Hello User! thank you for using our bot! You can view all commands by typing help.`;
      api.sendMessage(responseMessage, event.sender.id);
    }
  }
};
