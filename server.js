console.log("Please wait...");
// init //
const dotenv = require("dotenv"); // for .env
const fs = require("fs"); // io file module
const Discord = require("discord.js"); // Discord API
const express = require("express"); // minimalistic express module
const pug = require("pug"); // minimalistic html template renderer

console.log("Library imported. Initializing Chu Bot...");

dotenv.config();

const token = process.env.BOT_TOKEN;
const VERSION = fs.readFileSync(".version");

const client = new Discord.Client();
const expapp = express();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.queue = new Map();

client.config = {
  prefix: "%"
};

// import then handling the commands
fs.readdir("./modules/commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const command = require(`./modules/commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`[Commands] load ${file} > ${command.name}`);
  });
});

// import then handling the events
fs.readdir("./modules/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const events = require(`./modules/events/${file}`);
    client.events.set(events.name, events);
    console.log(
      `[Events] load ${file} > ${events.name} > ${events.keyword ||
        events.requireUser}`
    );
  });
});

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

// main page
expapp.get("/", (req, res) => {
  res.render("index.pug", {
    prefix: prefix,
    maxAmounts: EmoteLimit,
    VERSION: VERSION
  });
});

// animation list pages
expapp.get("/animlist", (req, res) => {
  res.render("animlist.pug", { animlist: fs.readdirSync("./animations/") });
});

expapp.listen(8000, s =>
  console.info("[Express] Help and bot manual is ready.")
);

//Sets the bot online
client.login(token);

client.on("ready", () => {
  client.user.setPresence({
    activity: {
      name: `Chu Puyo is listening. Last successful update: ${VERSION}`
    },
    status: "online"
  });
  setInterval(() => {
    client.user.setActivity(
      BotPresence[Math.floor(Math.random() * BotPresence.length)]
    );
  }, 169420);
  console.log("[Discord] Chu Bot is ready. Lastest " + VERSION);
});

client.on("message", async message => {
  // Skip if this user is a bot
  if (message.author.bot) return;

  // give user a gareth property
  if (typeof message.author.gareth === "undefined")
    message.author.gareth = false;

  // update build version ////////////////////////
  if (message.content.startsWith("!%buildDate")) {
    message.delete();
    const date = new Date();
    message.channel
      .send(
        "This will update the version name. Please make sure the bot is well tested before updating.\nReact ✅ to update, or wait to cancel."
      )
      .then(async msg => {
        msg.react("✅");
        const filter = reaction => {
          return reaction.emoji.name === "✅";
        };
        const collector = msg.createReactionCollector(filter, { time: 5000 });
        collector.on("end", collected => {
          msg.reactions.removeAll();
          if (collected.size < 1) msg.edit("Update cancelled.");
          else {
            fs.writeFile(".version", date.toISOString(), err => {
              if (err) message.channel.send("```" + err.toString() + "```");
            });
            msg.edit("Version name updated to " + date.toISOString());
            console.log("[Discord] Version name updated: " + date.toISOString());
          }
        });
      });
  }
  ///// for updating build version /////////////////

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
      await command.execute(message, args);
    } catch (err) {
      console.error(err); // obviously handling for no reason
    }
  }

  // input is a normal message
  else {
    const content = message.content
      .trim()
      .toLowerCase()
      .split(/ +/);

    try {
      for (var i = 0; i < content.length; i++) {
        const event = client.events.filter(
          evn =>
            (evn.keyword && evn.keyword.includes(content[i])) ||
            (evn.requireUser && evn.requireUser.includes(message.author.id))
        );
        if (typeof event == "object") {
          event.forEach(async (value, key, map) => {
            await value.execute(message);
          });
          break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});
