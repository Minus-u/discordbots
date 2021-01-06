const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  name: "remove",
  description: "Remove song from the queue",
  usage: "rm <number>",
  aliases: ["rm"],
  execute: async function(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue || queue.songs.length == 1)
      return sendError("There is no queue.", message.channel).catch(
        console.error
      );

    if (isNaN(args[0]) || !args.length)
      return sendError(
        "That's not a number! <:yon:789399503346204732>",
        message.channel
      );

    if (args[0] > queue.songs.length)
      return sendError(
        `The queue is only ${queue.songs.length} songs long! <:yon:789399503346204732>`,
        message.channel
      ).catch(console.error);

    try {
      const song = queue.songs.splice(args[0] - 1, 1);
      sendError(
        `Removed: **\`${song[0].title}\`** from the queue.`,
        queue.textChannel
      ).catch(console.error);
      message.react("✅");
    } catch (error) {
      return sendError(
        `An unexpected error occurred.\nPossible type: ${error}`,
        message.channel
      );
    }
  }
};
