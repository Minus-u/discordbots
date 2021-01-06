const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  name: "resume",
  description: "To resume the paused music",
  usage: "",
  aliases: [],
  execute: async function(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
        .setDescription("Resumed the music")
        .setColor("YELLOW")
        .setAuthor("Music is now being played.");
      return message.channel.send(xd);
    }
    return sendError(
      "There is nothing to resume.",
      message.channel
    );
  }
};
