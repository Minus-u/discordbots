
const Discord = require("discord.js");

module.exports = {
  name: "whoAsked",
  description: "Chance to shut someone up if they say \"who asked.\"",
  keyword: ["who", "asked"],
  execute(message) {
     //shuts up who ever the hell asked in the most polite way possible
      if (Math.floor(Math.random() * 15) < 8) { // 50 percent chance to tell someone that the world doesnt revolve around them
        message.channel.send({ files: ["./assets/whoasked.jpg"] });
        console.log("win");
      } else {
        console.log("fail");
      }
  
  }
}