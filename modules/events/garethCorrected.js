module.exports = {
  name: "garethCorrected",
  description: "Detect if people say Gareth after warn then reward them.",
  keyword: ["gareth"],
  execute(message) {
    if (message.author.gareth == true) {
      message.react("<:flatchu:788654456920735763>").then(function(err) {
        if (err) console.log(err); // simply does not exist
        message.react("👍");
      });
    }
  }
};
