const {

} = require("../const_mod");

module.exports = {
  name: "ownacat",
  description: "Do you own a cat, or does the cat own you?",
  execute (message, args) {
    message.delete();
    message.channel.send({files: ["./assets/video0.mp4"]});
  }
};