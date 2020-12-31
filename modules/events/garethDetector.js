const Discord = require("discord.js");

module.exports = {
  name: "garethDetector",
  description: "Checks if the message is Gareth, if so, there is a chance to shut him up.",
  execute(message) {
      if (message.author.id === 340190817035616267) { //// Check if whoever sent the message is Gareth
      var random = Math.floor(Math.random() * 16); // 2 in 10 chance because we arent that evil
    // console.log("Gareth Random chance: " + random); // no need to spam the console
      if (random === 6 || random === 9) {
      message.channel.send("shut up gareth"); //tells gareth to shut that bullshit up
      message.channel.send("<:gareth:790801380981473330>"); //gareth emote because its cool
      }
    }
  }
};
