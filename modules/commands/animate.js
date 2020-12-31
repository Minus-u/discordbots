// init
const fs = require("fs");

const animDirectory = fs.readdirSync("animations");

module.exports = {
  name: "animate",
  description: "Play an animation",
  args: false,
  aliases: ["play", "anim"],
  execute(message, args) {
    try {
      let anim =
        animDirectory.indexOf(args[1]) > -1
          ? args[1]
          : animDirectory[Math.floor(Math.random() * animDirectory.length)];
      var content = fs.readFileSync(`animations/${anim}`, "utf-8").split("\n");
      message.channel.send(`Loading ${anim}...`).then(function(msg) {
        var phrase = 0;
        var animation = setInterval(function() {
          if (phrase != content.length) {
            msg.edit(content[phrase]);
            phrase++;
          } else {
            clearInterval(animation);
            msg.delete(); // delete after finish
            message.delete();
          }
        }, 1250);
      });
    } catch (err) {
      message.channel.send(err);
    }
  }
};
