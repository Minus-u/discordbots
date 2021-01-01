const Discord = require("discord.js");

module.exports = {
  name: "garethDetector",
  description:
    "Checks if the message is Gareth, if so, there is a chance to shut him up.",
  requireUser: ["340190817035616267"],
  execute(message) {
    const random = Math.floor(Math.random() * 16);
    if ([3, 6, 9, 15].includes(random)) {
      message.channel.send("shut up gareth");
      message.channel.send("<:gareth:790801380981473330>");
    }
  }
};
