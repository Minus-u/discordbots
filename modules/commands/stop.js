const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  name: "stop",
  description: "To stop the music and clearing the queue",
  usage: "",
  aliases: [],
  execute: async function(message, args) {
    const member = message.mentions.members.first();
    if (member.roles.cache.some(role => role.name === "mods")) {
      const channel = message.member.voice.channel;
      if (!channel)
        return sendError(
          "I'm sorry but you need to be in a voice channel to play music!",
          message.channel
        );
      const serverQueue = message.client.queue.get(message.guild.id);
      if (!serverQueue)
        return sendError(
          "There is nothing playing that I could stop for you.",
          message.channel
        );
      if (!serverQueue.connection) return;
      if (!serverQueue.connection.dispatcher) return;
      try {
        serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        return sendError(
          `:notes: The player has stopped and the queue has been cleared.: ${error}`,
          message.channel
        );
      }
      message.client.queue.delete(message.guild.id);
      serverQueue.songs = [];
      message.channel.send("Alright, it's done. Everything is cleared.");
    }
  }
};
