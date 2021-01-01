// Installed Modules //
const dotenv = require("dotenv"); // for .env
const fs = require("fs"); // io file module
const Discord = require("discord.js"); // Discord API
// const sqlite3 = require("sqlite3"); // Database
const express = require("express"); // minimalistic express module
const pug = require("pug"); // minimalistic html template renderer
// const os = require("os"); // os i/o module

dotenv.config();

const token = process.env.BOT_TOKEN;
const VERSION = fs.readFileSync(".version");

const client = new Discord.Client();
const expapp = express();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// import then handling the commands
const commandModule = fs
  .readdirSync("./modules/commands")
  .filter(fsCommand => fsCommand.endsWith(".js"));
for (const fsCommand of commandModule) {
  const command = require(`./modules/commands/${fsCommand}`);
  client.commands.set(command.name, command);
}

// import then handling the events
const eventModule = fs
  .readdirSync("./modules/events")
  .filter(fsEvent => fsEvent.endsWith(".js"));
for (const fsEvent of eventModule) {
  const events = require(`./modules/events/${fsEvent}`);
  client.events.set(events.name, events);
}

// const_mod.js deconstruction
const {
  gDetect,
  ChuEmote,
  BotPresence,
  chuFacts,
  prefix,
  EmoteLimit
} = require("./modules/const_mod.js");

expapp.use(express.static(__dirname + "/public"));
expapp.set("views", "./views");
expapp.set("view engine", "ejs");

// Navigation
expapp.get("/", function(req, res) {
  res.render("index.pug", {
    prefix: prefix,
    maxAmounts: EmoteLimit,
    VERSION: VERSION
  });
});

expapp.get("/animlist", function(req, res) {
  res.render("animlist.pug", { animlist: fs.readdirSync("./animations/") });
});

expapp.listen(8000, s =>
  console.info("Express App is ready to serve over HTTP(S).")
);

//Sets the bot online
client.login(token);

client.on("ready", () => {
  client.user.setPresence({
    activity: {
      name: `Chu Puyo is listening. Last successful build: ${VERSION}`
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

  // give user a gareth property
  if (typeof message.author.gareth === "undefined")
    message.author.gareth = false;

  // update build version /////////////////
  if (message.content.startsWith("!%buildDate:update")) {
    message.delete();
    const date = new Date();
    message.channel
      .send(
        "This will update the build date. Please make sure the bot is well tested before updating.\nReact ✅ to update, or wait to cancel."
      )
      .then(function(msg) {
        msg.react("✅");
        const filter = reaction => {
          return reaction.emoji.name === "✅";
        };
        const collector = msg.createReactionCollector(filter, { time: 5000 });
        collector.on("end", collected => {
          msg.reactions.removeAll();
          if (collected.size < 1) msg.edit("Update cancelled.");
          else {
            msg.edit("Please wait...");
            fs.writeFile(".version", date.toISOString(), function(err) {
              if (err) message.channel.send("```" + err + "```");
            });
            msg.edit("Task completed.");
          }
        });
      });
  }

  // input is a command
  if (message.content.startsWith(prefix)) {
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    const cmdInput = args.shift().toLowerCase();
    const command =
      client.commands.get(cmdInput) ||
      client.commands.find(
        cmd => cmd.aliases && cmd.aliases.includes(cmdInput)
      );

    try {
      if (command.args === true && !args.length)
        return message.channel.send(
          `Usage: \`${prefix}${command.name} ${command.usage}\``
        );
      command.execute(message, args);
    } catch (err) {
      console.error(err); // obviously handling for no reason
    }
  }

  // input is a normal message -> check if conditions satisfied
  else {
    const content = message.content
      .trim()
      .toLowerCase()
      .split(/ +/); // array object
    try {
      for (var i = 0; i < content.length; i++) {
        const event = client.events.filter(
          evn =>
            (evn.keyword && evn.keyword.includes(content[i])) ||
            (evn.requireUser && evn.requireUser.includes(message.author.id))
        );
        if (typeof event == "object") {
          event.forEach((value, key, map) => {
            value.execute(message);
          });
          break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});
