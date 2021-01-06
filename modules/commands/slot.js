const Discord = require("discord.js");
const {
  ChuEmote,
  ChuBotDescription,
  ChuSlotWin,
  ChuSlotLose
} = require("../const_mod.js");

module.exports = {
  name: "chuslot",
  args: false,
  description: "Chu Puyo Slot Machine",
  aliases: ["slot", "roll", "csl"],
  execute: async function (message, args) {
    // Rolling animation + Show result such wow very chu
    var counter = 0;
    var msg = "";
    var color = "BLUE"; // self-explatory
    var rollStatus = "Rolling..."; // "Rolling..." "Rolled!"
    var status = ""; // "win" "lose"

    message.delete();

    // make a new embed object
    const rollEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("Roll the Chu!")
      .setDescription(
        ChuBotDescription[Math.floor(Math.random() * ChuBotDescription.length)]
      )
      .addField(rollStatus, "Starting rolls...", true)
      .setTimestamp()
      .setFooter(`Rolled by ${message.author.username}`);

    // send it
    message.channel.send(rollEmbed).then(async pref => {
      var anim = setInterval(async () => {
        var rolls = randomChu(); //get result from the roll
        var content = rolls.join("");
        rollEmbed.fields[0].value = content; 
        counter++; 

        if (counter === 4) {
          clearInterval(anim);
          let wonchu = findDuplicateChu(rolls);
          if (wonchu === false) {
            msg = ChuSlotLose[Math.floor(Math.random() * ChuSlotLose.length)];
            status = "You lose...";
            color = "RED";
          } else if (
            rolls[0] === ChuEmote[wonchu] &&
            rolls[1] === ChuEmote[wonchu] &&
            rolls[2] === ChuEmote[wonchu]
          ) {
            msg = `CONGRATULATIONS! ${message.author}, YOU GOT ALL 3 %s!`.replace(
              "%s",
              ChuEmote[wonchu]
            );
            status = "MEGA WIN!";
            color = "GOLD";
            pref.pin();
          } else {
            msg = ChuSlotWin[
              Math.floor(Math.random() * ChuSlotWin.length)
            ].replace("%s", ChuEmote[wonchu]);
            status = "You win!";
            color = "GREEN";
          }
          rollEmbed.setColor(color);
          rollEmbed.fields[0].name = "Rolled!";
          rollEmbed.addField(status, msg, true);
        }

        await pref.edit(rollEmbed);
      }, 500);
    });
  }
};

// Taken from https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array
const findDuplicateChu = arr => {
  let sorted_arr = arr.slice().sort(); // You can define the comparing function here.
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(ChuEmote.indexOf(sorted_arr[i]));
    }
  }

  if (results.length === 0) {
    return false;
  } else {
    return results[0];
  }
};

function randomChu() {
  var result = [];
  for (var i = 0; i < 3; i++) {
    var r = Math.floor(Math.random() * ChuEmote.length);
    result.push(ChuEmote[r]); 
  } 
  return result;
}
