const Discord = require("discord.js");
const {
  ChuEmote,
  ChuSlotDescription,
  ChuSlotWin,
  ChuSlotLose
} = require("../const_mod.js");

module.exports = {
  name: "chuslot",
  args: false,
  description: "Chu Puyo Slot Machine",
  aliases: ["slot", "roll", "csl"],
  execute(message, args) {
    // Rolling animation + Show result such wow very chu
    var c = 0;
    var msg = "";
    var color = "BLUE"; // self-explatory
    var rollstt = "Rolling..."; // "Rolling..." "Rolled!"
    var stt = ""; // "win" "lose"
    message.delete();
    const rollEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("Roll the Chu!")
      .setDescription(
        ChuSlotDescription[
          Math.floor(Math.random() * ChuSlotDescription.length)
        ]
      )
      .addField(rollstt, "Starting rolls...", true) // are we going to duplicate the embed? nah we're going to edit this object and then use it again to edit it
      .setTimestamp()
      .setFooter(`Rolled by ${message.author.username}`);
    message.channel.send(rollEmbed).then(function(pref) {
      var anim = setInterval(function() {
        var rolls = randomChu(); // need to get result from the rollshttps://glitch.com/
        var cnt = rolls.join("");
        rollEmbed.fields[0].value = cnt;

        c++;
        if (c === 4) {
          clearInterval(anim);
          let wonchu = findDuplicateChu(rolls);
          if (wonchu === false) {
            msg = ChuSlotLose[Math.floor(Math.random() * ChuSlotLose.length)];
            stt = "You lose...";
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
            stt = "MEGA WIN!";
            color = "GOLD";
            pref.pin();
          } else {
            msg = ChuSlotWin[
              Math.floor(Math.random() * ChuSlotWin.length)
            ].replace("%s", ChuEmote[wonchu]);
            stt = "You win!";
            color = "GREEN";
          }
          rollEmbed.setColor(color);
          rollEmbed.fields[0].name = "Rolled!";
          rollEmbed.addField(stt, msg, true);
        }

        pref.edit(rollEmbed);
      }, 500);
    });
  }
};

// Taken from https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array
const findDuplicateChu = arr => {
  let sorted_arr = arr.slice().sort(); // You can define the comparing function here.
  // JS by default uses a crappy string compare.
  // (we use slice to clone the array so the
  // original array won't be modified)
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
  // for reusing both final result and the animation.
}
