const VERSION = "build20203012_1310_gmt7"; // build<date(yyyyddmm)_<time>_<timezone>
// Do not change VERSION unless you did made a major change on this code (glitch.com)

// Installed Modules //
const dotenv = require("dotenv"); // for .env
const fs = require("fs"); // io file module
const Discord = require("discord.js"); // Discord API
const sqlite3 = require("sqlite3"); // Database
const express = require("express"); // minimalistic express module
const pug = require("pug"); // minimalistic html template renderer
const os = require("os"); // os i/o module

dotenv.config();

const token = process.env.BOT_TOKEN;

const client = new Discord.Client();
const expapp = express();

client.commands = new Discord.Collection();
// import then handling the commands
const commandModule = fs.readdirSync('./modules/commands').filter(file => file.endsWith('.js'));
for (const file of commandModule) {
	const command = require(`./modules/commands/${file}`);
	client.commands.set(command.name, command);
}

// const eventModule = fs.readdirSync('./modules/events').filter(file => file.endsWith('.js'));

let db = new sqlite3.Database("./chubot.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Database is ready.");
});

// const_mod.js deconstruction
const {
  gDetect,
  ChuEmote,
  BotPresence,
  prefix,
  EmoteLimit
} = require("./modules/const_mod.js");

expapp.use(express.static(__dirname + "/public"));
expapp.set("views", "./views");
expapp.set("view engine", "ejs");

// Navigation
expapp.get("/", function(req, res) {
  res.render("index.pug", { prefix: prefix, maxAmounts: EmoteLimit, VERSION: VERSION });;});

expapp.get("/animlist", function(req, res) {
  res.render("animlist.pug", { animlist: fs.readdirSync("./animations/") });
});

expapp.listen(8000, (s) =>
  console.info("Express App is ready to serve over HTTP(S).")
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
      BotPresence[Math.floor(Math.random() * BotPresence.length)]
    ); // sets bot's activities to one of the phrases in the arraylist.
  }, 169420);
  console.log("Chu Puyo the absolute banger bot is now ready!"); //tells when the bot is ready to use
});

client.on("message", message => {
  // Skip if this user is a bot
  if (message.author.bot) return;
  // input is a command
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmdInput = args.shift().toLowerCase();
    const command = client.commands.get(cmdInput) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdInput));
    if (command.args && !args.length) return message.channel.send(`❌ No argument provided.`);
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.channel.send("Something wrong happened.");
    }
  }
  
  
  // esssential commands that should not belongs to any modules
  if (message.content.startsWith(`${prefix}chuinfo`)) message.channel.send(`NodeJS ${process.version}\nLastest build: ${VERSION}\nUptime: ${process.uptime()}s`);
  if (message.content.startsWith(`${prefix}help`)) message.channel.send("https://NculVHLNnOrC7gOQaHSA.minusu1.repl.co/");

  // events
  // If the Gareth counter didn't exist already in this user, create it
  if (typeof message.author.gareth === "undefined")
    message.author.gareth = false;

  if (
    message.content.toLowerCase().includes("gareth") &&
    message.author.gareth === true
  ) {
    //If the message is corrected by the user, reward them with a thumbs up
    message.react("788654456920735763");
    message.react("👍");
  }

  for (var i = 0; i < gDetect.length; i++) {
    if (message.content.toLowerCase().includes(gDetect[i])) {
      var random = Math.floor(Math.random() * 10) + 1; // 1 in 10 chance to dm to avoid spam
      if (random > 5 && random < 8) {
        message.channel.send("gareth");
        message.channel.send("<:chudrip:789157545000173608>");
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
  
  //shuts up who ever the hell asked in the most polite way possible
  if (message.content.includes("who") && message.content.includes("asked")) {
    if (Math.floor(Math.random() * 15) < 8) {
      message.channel.send({ files: ["./assets/whoasked.jpg"] });
    }
  } 
  
  // add new command/events above this comment //
 // end of client statement
});

