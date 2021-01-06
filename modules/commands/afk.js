const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
const fs = require("fs");

module.exports = {
  name: "afk",
  description: "24/7",
  usage: "[afk]",
  aliases: ["24/7"],
  execute: async function(message, args) {
    const member = message.mentions.members.first();
    if (member.roles.cache.some(role => role.name === "mods")) {
      let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
      if (!afk[message.guild.id])
        afk[message.guild.id] = {
          afk: false
        };
      var serverQueue = afk[message.guild.id];
      if (serverQueue) {
        serverQueue.afk = !serverQueue.afk;
        message.channel.send({
          embed: {
            color: "GREEN",
            description: `💤  **|**  AFK is **\`${
              serverQueue.afk === true ? "enabled" : "disabled"
            }\`**`
          }
        });
        return fs.writeFile("./afk.json", JSON.stringify(afk), err => {
          if (err) console.error(err);
        });
      }
      return sendError(
        "There is nothing playing in this server.",
        message.channel
      );
    }
  }
};
