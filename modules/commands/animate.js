// init
const fs = require("fs");

const animDirectory = fs.readdirSync("animations");

module.exports = {
  name: "animate",
  description: "Play an animation",
  args: false,
  aliases: ["anim"],
  execute: async function (message, args) {
    try {
      let anim =
        animDirectory.indexOf(args[1]) > -1
          ? args[1]
          : animDirectory[Math.floor(Math.random() * animDirectory.length)];
      var content = fs.readFileSync(`animations/${anim}`, "utf-8").split("\n");
      message.channel.send(`Loading ${anim}...`).then(msg => {
        let phrase = 0;
        let animation = setInterval(async () => {
          if (phrase != content.length) {
            await msg.edit(content[phrase]);
            phrase++;
          } else {
            clearInterval(animation);
            msg.delete();
            message.delete();
          }
        }, 1250);
      });
    } catch (err) {
      message.channel.send(err);
    }
  }
};
