//spit some chufacts
const { ChuFacts } = require("../const_mod");

module.exports = {
  name: "chufact",
  args: false,
  description: "Chu Bot spits out a random fact.",
  aliases: ["cfact", "cf"],
  execute(message, args) {
    message.delete();
    message.channel.send(ChuFacts[Math.floor(Math.random() * ChuFacts.length)]);
  }
};
