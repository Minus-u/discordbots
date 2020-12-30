const { ChuEmote, EmoteLimit } = require("../const_mod.js");
// Send Chu Puyo as a gift.
module.exports = {
  name: "sendchu",
  args: true,
  usage: "<user> <amount>",
  description: "Send Chu Puyo as a gift.",
  aliases: ['schu', 'sc'],
  execute(message, args) {
    var amount = args[2];
    const user = args[3] != "anon" ? message.author : "An anonymous person";
    const mentioned = getUserFromMention(message, args[1]);
    if (mentioned.bot === true)
      return message.channel.send(
        "Can't send Chu Puyo to a machine. I don't think it's going to see the Chu you sent..."
      );
    if (!amount) amount = 1; // default at 1 Chu worth.
    if (amount < 1 || amount > EmoteLimit)
      message.channel.send(
        `⚠️ Cannot send zero or more than ${EmoteLimit} chu for now! (Discord character limit)`
      );
    else {
      var dmchu = "";
      for (var i = 0; i < amount; i++)
        dmchu += ChuEmote[Math.floor(Math.random() * ChuEmote.length)];
      try {
        if (args[3] == "anon") message.delete();
        message.channel
          .send(`${amount} Chu Puyo have been successfully sent!`)
          .then(msg => {
            msg.delete({ timeout: 3500 });
          })
          .catch(console.error);
        mentioned.send(`${user} sent you ${amount} Chu Puyo!`);
        mentioned.send(dmchu);
        mentioned.send("Happy Chu Puyo!!");
      } catch (err) {
        console.error(err);
      }
    }
  }
};

// message.mentions alternatives: https://discordjs.guide/miscellaneous/parsing-mention-arguments.html
function getUserFromMention(message, mention) {
  try {
    const matches = mention.match(/^<@!?(\d+)>$/);
    const id = matches[1];
    return message.client.users.cache.get(id);
  } catch (err) {
    return;
  }
}
