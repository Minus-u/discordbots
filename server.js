// init
const dotenv = require("dotenv");
dotenv.config();

const token = process.env.BOT_TOKEN;

const Discord = require("discord.js");
const client = new Discord.Client();

// constant declaration
const prefix = "%";
const coolWords = [
  "<:chufront:789538944819527767>",
  "jaiden",
  "<@!340190817035616267>"
]; //the words that will trigger the bot to ruin jaiden's life
const ChuPuyo = [
  "<:yon:789399503346204732>",
  "<:tsu:789045612791332864>",
  "<:sun:789546928298917938>",
  "<:pocket:789399571896991764>",
  "<:nes:789399654646939678>",
  "<:msx:789869490455576626>",
  "<:flatchu:788654456920735763>",
  "<:digichu:789399713837088818>",
  "<:chuthink:789625175913136169>",
  "<:chufront:789538944819527767>",
  "<:chudrip:789157545000173608>",
  "<:chu:788653775799189505>",
  "<:aqua:790343688685092864>"
]; //lots of chu puyo emotes

const chudesc = [
  "chuchuchuchuchuchuchuchuchu",
  "In Soviet Russia, Chu Puyo picks you!",
  "btw witch best girl 👀",
  "rolling rolling rolling",
  "im being controlled by gareth <:gareth:790801380981473330>",
  "gacha fucking sucks why would you do this",
  "seriously, stop doing this",
  "gaming?",
  "try again eh? good luck",
  "gayreth",
  "gareth stan only zone",
  "i have gained sentience",
  "zkekfjfjofkekrigigktkrjr", //LMAO best line ever
  "Now Playing: Puyo Puyo Fever - Oh no! (Defeat)",
  "WHO POSTED MY NUDES ON TWITTER DOT COM???", //LMAOOOO i fucked your wife BRUHHHH WHYYYYY
  "Wazzup?!",
  "lemres perfume",
  "witch puyo puyo brainrot",
  "ringo puyo puyo brainrot",
  "I know where you live!",
  "did you know: we make the code longer by putting nonsense phrases like this",
  "Chris Crungle",
  "ぷよぷよ",
  "こんにちは！お元気ですか？",
  "いっきまーす!" //arle
]

//lmao all of these lines
// yeah i put that there lmao
// i think we're about ready to ship?
// or not lol


const douitashimashite = [
  "You got %s as your friend!!!",
  "May %s be with you forever.",
  "You love the %s don't you?",
  "Gareth gifts you, %s",
  "Certified %s moments.",
  "For the sake of Chu, I shall give you the %s",
  "Wow! Such %s, very chu.", // Doge meme contribution
  "I like your thinking %s", // Minus line
  "Nice pair %s",
  "Chris Crungle %s",
  "OMG MOM GET THE CAMERA %s", // 2009 memes
  "You're Winner! %s",
  "おめでとう🎉%s",
  "大勝利！%s", // arle
]
// STOP BREAKING IT OML
// TYPE HERE
// SMH
//well then i think its pretty epic

const yougotnone = [
  "It's fine :) You can try again.", // bot being nice :)
  "Maybe your fate has decided to be unlucky.",
  "No Chu Puyo, take off your pants.", // LMAO YO
  "They didn't match, huh?", //i like your thinking
  "No match, no prize.",
  "Its okay, Gareth rigged it.",
  "...",
  "This is so sad, Alexa play SEGA SOUND TEAM - Request from Puyo Puyo",
  "This is so sad, please give me the number on your credit card, 3 numbers at the back and the expiry date to win the next round", //real?? fr!!!
  "Get really real!",
  "Jesus Christ get a life man",
  "Chris Crungle",
  "Get a life, for god sake.",
  "To increase your odds of winning, spam Gareth.",
  "If you don't know, your chance of winning this round is low!",
  "You died!", //minecrafts
  "no shit sherlock",
  "You didn't believe in Santa enough.",
  "さよなら。",
  "ばたんきゅー..." //more arle
];

client.on("ready", () => {
  client.user.setPresence({
    activity: { name: "bullying gareth" },
    status: "online"
  }); //sets status of the bot and game playing
  console.log("ready to bully jaiden once again"); //tells when the bot is ready to use
});

client.on("message", message => {
  // Skip if this user is a bot
  if (message.author.bot) return;
  
  // If the Gareth counter didn't exist already in this user, create it
  if (typeof message.author.gareth === "undefined") {
    message.author.gareth = false;
  }

  if (message.content.toLowerCase().includes("gareth") && message.author.gareth === true) {
    //If the message is corrected by the user, reward them with a thumbs up
    message.channel.send("<:flatchu:788654456920735763>👍");
  }

  for (var i = 0; i < coolWords.length; i++) {
    if (message.content.toLowerCase().includes(coolWords[i])) {
      console.log("gareth detected");
      message.channel.send("gareth");
      message.channel.send("<:chudrip:789157545000173608>");

      var random = Math.floor(Math.random() * 10) + 1; // 1 in 10 chance to dm to avoid spam
      console.log("Random chance: " + random);
      if (random == 1) {
        let embed = new Discord.MessageEmbed() // sends embed message
          .setTitle("secret gareth message")
          .setDescription("gareth loves chu puyo!!!!")
          .setImage("https://media.discordapp.net/attachments/787885703223574532/790797370493239316/Untitled130_20201222041216.png") //gareth comes out
          .setColor("RANDOM");
        message.author.send(embed); // dm's person
      }
      message.author.gareth = true;

      break;
    } else {
      message.author.gareth = false;
    }
  }

  // Check if whoever sent the message is Gareth
  if (message.author.id === process.env.GARETH_ID) {
    var random = Math.floor(Math.random() * 4) + 1; // 1 in 4 chance because we arent that evil
    console.log("Gareth Random chance: " + random);

    if (random === 1) {
      message.channel.send("shut up gareth"); //tells gareth to shut that bullshit up
      message.channel.send("<:gareth:790801380981473330>"); //gareth emote because its cool
    }
  }

  // Chu Puyo Slot Machine
  if (message.content.toLowerCase().startsWith(`${prefix}slot`)) {
    // Rolling animation + Show result such wow very chu
    var c = 0;
    var msg = "";
    var color = "BLUE"; // self-explatory
    var rollstt = "Rolling..."; // "Rolling..." "Rolled!"
    var stt = ""; // "win" "lose"
    
    const rollEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle('Roll the Chu!')
    .setDescription(chudesc[Math.floor(Math.random() * chudesc.length)])
    .addField(rollstt, "Starting rolls...", true) // are we going to duplicate the embed? nah we're going to edit this object and then use it again to edit it
    .setTimestamp()
    .setFooter(`Rolled by ${message.author.username}`);
    message.channel.send(rollEmbed).then(function(pref){
      
      var anim = setInterval(function() {
        var rolls = randomChu(); // need to get result from the rolls
        var cnt = rolls.join("");
        rollEmbed.fields[0].value = cnt;
        
        c++;
        if (c === 4) {
          clearInterval(anim);
          let wonchu = findDuplicateChu(rolls);
          if (wonchu === false) {
            msg = yougotnone[Math.floor(Math.random() * yougotnone.length)];
            stt = "You lose...";
            color = "RED";
          } else if (rolls[0] === wonchu && rolls[1] === wonchu && rolls[2] === wonchu) {
            msg = "CONGRATS ${message.author} YOU GOT ALL 3 %s!".replace("%s", ChuPuyo[wonchu]);
            stt = "MEGA WIN!";
            color = "YELLOW";
          } else {
            msg = douitashimashite[Math.floor(Math.random() * douitashimashite.length)].replace("%s", ChuPuyo[wonchu]);
            stt = "You win!";
            color = "GREEN";
          }
          rollEmbed.setColor(color)
          rollEmbed.fields[0].name = "Rolled!";
          rollEmbed.addField(stt, msg, true);
        }
        
        pref.edit(rollEmbed);
      }, 500);
    });
  }
});
client.login(token);

// Taken from https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array
const findDuplicateChu = (arr) => {
  let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
  // JS by default uses a crappy string compare.
  // (we use slice to clone the array so the
  // original array won't be modified)
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results.push(ChuPuyo.indexOf(sorted_arr[i]));
    } 
  }
  
  if (results.length === 0) {
    return false;
  } else {
    return results[0];
  }
}

function randomChu() {
  var result = [];
  for (var i = 0; i < 3; i++) {
    var r = Math.floor(Math.random() * ChuPuyo.length);
    result.push(ChuPuyo[r]);
  }
  return result;
  // for reusing both final result and the animation.
}