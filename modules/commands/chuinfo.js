const fs = require("fs");
// template for commands and events
module.exports = {
  name: "chuinfo",
  description: "Show info about the version of the bot.",
  args: false,
  execute(message, args) {
    message.channel.send(
      `NodeJS ${process.version}\nLastest build: ${fs.readFileSync(
        ".version"
      )}\nUptime: ${process.uptime()}s`
    );
  }
};
