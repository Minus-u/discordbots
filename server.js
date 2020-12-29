const VERSION = "build20202912_2159_gmt7"; // build<date(yyyyddmm)_<time>_<timezone>
// Do not change VERSION unless you did made a major change on this code (glitch.com)

// init //
const dotenv = require("dotenv"); // for .env
const fs = require("fs"); // io file module
const Discord = require("discord.js"); // Discord API
const sqlite3 = require("sqlite3"); // Database
const express = require("express"); // minimalistic express module
const pug = require("pug"); // minimalistic html template renderer

dotenv.config();

const token = process.env.BOT_TOKEN;

const client = new Discord.Client();
const expapp = express();

let db = new sqlite3.Database("./chubot.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Database is ready.");
});

// constant declaration
const httpport = 8000;
const prefix = "%";
const chlimit = 60;
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
  "いっきまーす!", //arle
  ":black_square_button: I'm the one who's right!" //squares
];

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
  ":yellow_circle: Isn't this fun? %s" //marle
];
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
  "Get real!",
  "You scared the living heck out of me.",
  "Jesus Christ get a life man",
  "Chris Crungle",
  "Get a life, for god sake.",
  "To increase your odds of winning, spam Gareth.",
  "If you don't know, your chance of winning this round is low!",
  "You died!", //minecrafts
  "no shit sherlock",
  "You didn't believe in Santa enough.",
  "さよなら。",
  "ばたんきゅー。。。", //more arle
  ":black_square_button: This is the right outcome." //squares
];
const activities = [
  "and bullying gareth",
  "then sending chu puyo",
  "with Chris Crungle",
  "and posting banger tweets",
  "with Jaiden",
  "Puyo Puyo Fever 2",
  "ぷよぷよクエスト",
  "Minecraft",
  "Terraria",
  "Stardew Valley",
  "Puyo Puyo Tetris 2",
  "Puyo Puyo Champions",
  "and sending gifts!",
  "and reminding people not to use 'Jaiden'",
  "with the slot machine",
  "and listening to chat!",
  "Muse Dash",
  "Taiko no Tatsujin",
  "osu!",
  `and listening to commands starting with ${prefix}!` // this is es6 string formatting -> `${variable}
];

expapp.use(express.static(__dirname + "/public"));
expapp.set("views", "./views");
expapp.set("view engine", "ejs");

// Navigation
expapp.get("/", function(req, res) {
  res.render("index.pug", { prefix: prefix, maxAmounts: chlimit, VERSION: VERSION });;});

expapp.get("/animlist", function(req, res) {
  res.render("animlist.pug", { animlist: fs.readdirSync("./animations/") });
});

expapp.listen(httpport, (s) =>
  console.info(`App is ready, listening on port ${httpport}.`)
);

//Sets the bot online
client.login(token);

client.on("ready", () => {
  client.user.setPresence({
    activity: {
      name: `Chu Puyo is listening. Last commit: ${VERSION}`
    }, //init playing status
    status: "online"
  }); //sets status of the bot and game playing
  setInterval(() => {
    client.user.setActivity(
      activities[Math.floor(Math.random() * activities.length)]
    ); // sets bot's activities to one of the phrases in the arraylist.
  }, 169420);
  console.log("Chu Puyo the absolute banger bot is now ready!"); //tells when the bot is ready to use
});

client.on("message", message => {
  // Skip if this user is a bot
  if (message.author.bot) {
    return;
  }
  
  if (message.content.startsWith(`${prefix}chuinfo`)) message.channel.send(`NodeJS ${process.version}\nLastest build: ${VERSION}`);

  if (message.content.startsWith(`${prefix}help`))
    message.channel.send("https://NculVHLNnOrC7gOQaHSA.minusu1.repl.co/");

  // If the Gareth counter didn't exist already in this user, create it
  if (typeof message.author.gareth === "undefined")
    message.author.gareth = false;

  if (
    message.content.toLowerCase().includes("gareth") &&
    message.author.gareth === true
  ) {
    //If the message is corrected by the user, reward them with a thumbs up
    message.channel.send("<:flatchu:788654456920735763>👍");
  }

  for (var i = 0; i < coolWords.length; i++) {
    if (message.content.toLowerCase().includes(coolWords[i])) {
      console.log("potential gareth detected");
      var random = Math.floor(Math.random() * 10) + 1; // 1 in 10 chance to dm to avoid spam
      if (random > 5 && random < 8) {
        message.channel.send("gareth");
        message.channel.send("<:chudrip:789157545000173608>");
      }
      console.log("Random chance: " + random);
      if (random == 3 || random == 6) {
        let embed = new Discord.MessageEmbed() // sends embed message
          .setTitle("secret gareth message")
          .setDescription("gareth loves chu puyo!!!!")
          .attachFiles(["./assets/gareth apple.jpg"])
          .setImage("attachment://gareth apple.jpg")
          // wtf where is the thing
          // wtfwtf illuminati???
          .setColor("RANDOM");
        message.author.send(embed); // dm's person
        message.author.gareth = true;
        break;
      } else {
        message.author.gareth = false;
      }
    }
  }

  // Check if whoever sent the message is Gareth
  if (message.author.id === process.env.GARETH_ID) {
    var random = Math.floor(Math.random() * 16); // 2 in 10 chance because we arent that evil
    // console.log("Gareth Random chance: " + random); // no need to spam the console
    if (random === 6 || random === 9) {
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
    message.delete();
    const rollEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle("Roll the Chu!")
      .setDescription(chudesc[Math.floor(Math.random() * chudesc.length)])
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
            msg = yougotnone[Math.floor(Math.random() * yougotnone.length)];
            stt = "You lose...";
            color = "RED";
          } else if (
            rolls[0] === ChuPuyo[wonchu] &&
            rolls[1] === ChuPuyo[wonchu] &&
            rolls[2] === ChuPuyo[wonchu]
          ) {
            msg = `CONGRATULATIONS! ${message.author}, YOU GOT ALL 3 %s!`.replace(
              "%s",
              ChuPuyo[wonchu]
            );
            stt = "MEGA WIN!";
            color = "GOLD";
            if (
              db
                .run("select winnerID from megawin")
                .includes(message.author["id"])
            ) {
              // I do not like this at all.
              //I like it because it works :)
              var times =
                parseInt(
                  db.run(
                    `select times from megawin where winnerID = '${
                      message.author["id"]
                    }'`
                  ),
                  10
                ) + 1;
              db.run(
                `update megawin set times = ${times} where winnerID = '${message.author}'`
              );
              message.channel.send(
                `Congratulations ${message.author}! You've mega won ${times} times!`
              );
            } else {
              db.run(`insert into megawin value (${message.author["id"]}, 1)`); // set to 1 if not found
              message.channel.send("First time winning, ever!");
            }
            pref.pin();
          } else {
            msg = douitashimashite[
              Math.floor(Math.random() * douitashimashite.length)
            ].replace("%s", ChuPuyo[wonchu]);
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

  // Send Chu Puyo as a gift.
  if (message.content.startsWith(`${prefix}sendchu`)) {
    var param = message.content.split(" ");
    var amount = param[2];
    const user = param[3] != "anon" ? message.author : "An anonymous person";
    //let target = message.mentions.members.first(); // not working
    const mentioned = getUserFromMention(message.content.split(" ")[1]);
    if (mentioned === null || !mentioned)
      message.channel.send(
        `Usage: \`${prefix}sendchu <@username> [amount 1-${chlimit}]\``
      );
    else if (mentioned.bot === true)
      message.channel.send(
        "Can't send Chu Puyo to a machine. I don't think it's going to see the Chu you sent..."
      );
    else {
      if (!amount) amount = 1; // default at 1 Chu worth.
      if (amount < 1 || amount > chlimit)
        message.channel.send(
          `⚠️ Cannot send zero or more than ${chlimit} chu for now! (Discord character limit)`
        );
      else {
        var dmchu = "";
        for (var i = 0; i < amount; i++)
          dmchu += ChuPuyo[Math.floor(Math.random() * ChuPuyo.length)];
        try {
          if (param[3] == "anon") message.delete();
          message.channel.send(`${amount} Chu Puyo have been successfully sent!`).then(msg => {
            msg.delete({ timeout: 3500 })
          }).catch(console.error);
          mentioned.send(`${user} sent you ${amount} Chu Puyo!`);
          mentioned.send(dmchu);
          mentioned.send("Happy Chu Puyo!!");
        } catch (err) {console.error(err)}
      }
    }
  }

  // do you own a cat, or does the cat own you?
  if (message.content.startsWith(`${prefix}ownacat`)) {
    message.delete();
    message.channel.send({files: ["./assets/video0.mp4"]});
  }

  //shuts up who ever the hell asked in the most polite way possible
  if (message.content.includes("who") && message.content.includes("asked")) {
    if (Math.floor(Math.random() * 15) < 8) {
      message.channel.send({ files: ["./assets/whoasked.jpg"] });
    }
  }
  
  // play animation
  if (message.content.startsWith(`${prefix}animate`)) {
    try {
      const param = message.content.split(" ");
      const files = fs.readdirSync("./animations/");
      let anim = files.indexOf(param[1]) > -1 ? param[1] : files[Math.floor(Math.random() * files.length)];
      var content = fs.readFileSync(`animations/${anim}`, 'utf-8').split("\n");
      message.channel.send(`Loading ${anim}...`).then(function(msg) {
        var phrase = 0;
        var animation = setInterval(function() {
          if (phrase != content.length) {
            msg.edit(content[phrase]);
            phrase++;
          } else {
            clearInterval(animation);
            msg.delete(); // delete after finish
            message.delete();
          }
        }, 1250);
      });
    } catch (err) {
      message.channel.send(err);
    }
  }

  // add new command/events above this comment //
}); // end of client statement

// Taken from https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array
const findDuplicateChu = arr => {
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
};

function randomChu() {
  var result = [];
  for (var i = 0; i < 3; i++) {
    var r = Math.floor(Math.random() * ChuPuyo.length);
    result.push(ChuPuyo[r]);
  }
  return result;
  // for reusing both final result and the animation.
}

// message.mentions alternatives: https://discordjs.guide/miscellaneous/parsing-mention-arguments.html
function getUserFromMention(mention) {
  try {
    const matches = mention.match(/^<@!?(\d+)>$/);
    const id = matches[1];
    return client.users.cache.get(id);
  } catch (err) {
    return;
  }
}
