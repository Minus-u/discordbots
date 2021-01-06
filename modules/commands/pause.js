const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  name: "pause",
  description: "To pause the current music in the server",
  usage: "[pause]",
  aliases: ["pause"],
  execute: async function(message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      try {
        serverQueue.connection.dispatcher.pause();
      } catch (error) {
        message.client.queue.delete(message.guild.id);
        return sendError(
          `:notes: The player has stopped and the queue has been cleared.: ${error}`,
          message.channel
        );
      }
      let paused = new MessageEmbed()
        .setDescription("Music is paused.")
        .setColor("YELLOW")
        .setTitle("Take a break.");
      return message.channel.send(paused);
    }
    return sendError(
      "There is nothing playing in this server. <:tsu:789045612791332864>",
      message.channel
    );
  }
};
