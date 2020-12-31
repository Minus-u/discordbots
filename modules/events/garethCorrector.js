const Discord = require("discord.js");
const { gDetect } = require("../const_mod.js");

module.exports = {
  name: "garethCorrector",
  description: "Dectect Jaiden/Gareth to roast.",
  keyword: gDetect,
  execute(message) {
    for (var i = 0; i < gDetect.length; i++) {
      if (message.content.toLowerCase().includes(gDetect[i])) {
        var random = Math.floor(Math.random() * 10) + 1; // 1 in 10 chance to dm to avoid spam
        if (random > 5 && random < 8) {
          message.channel.send("gareth");
          message.channel.send("<:chudrip:789157545000173608>");
          let embed = new Discord.MessageEmbed() // sends embed message
            .setTitle("secret gareth message")
            .attachFiles(["../assets/gareth apple.jpg"])
            .setImage("attachment://gareth apple.jpg")
            .setDescription("gareth loves chu puyo!!!!")
            .setColor("RANDOM");
          message.author.send(embed); // dm's person
          message.author.gareth = true;
          break;
        } else {
          message.author.gareth = false;
        }
      }
    }
  }
};
