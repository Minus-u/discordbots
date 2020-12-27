// init //
const dotenv = require('dotenv'); // for .env
const http = require('http'); // http web server
const fs = require('fs'); // io file module
const Discord = require('discord.js'); // Discord API
const sqlite3 = require('sqlite3'); // Database

dotenv.config();

const token = process.env.BOT_TOKEN;

const client = new Discord.Client();

let db = new sqlite3.Database('./chubot.db', err => {
    if (err) {
        return console.error(err.message);
    }
    console.log('DB OPENER FINISH');
}); // No need i think.

/*
db.close(err => {
if (err) {
return console.error(err.message);
}
console.log("DB CLOSE");
});
*/

// host an http server to keep the bot alive using UptimeRobot
// possibly for future use as well
fs.readFile('./index.html', function(err, html) {
    if (err) {
        throw err;
    }
    http
        .createServer(function(request, response) {
            response.writeHeader(200, {
                'Content-Type': 'text/html'
            });
            response.write(html);
            response.end();
        })
        .listen(8000);
});

// constant declaration
const prefix = '%';
const coolWords = [
    '<:chufront:789538944819527767>',
    'jaiden',
    '<@!340190817035616267>'
]; //the words that will trigger the bot to ruin jaiden's life
const ChuPuyo = [
    '<:yon:789399503346204732>',
    '<:tsu:789045612791332864>',
    '<:sun:789546928298917938>',
    '<:pocket:789399571896991764>',
    '<:nes:789399654646939678>',
    '<:msx:789869490455576626>',
    '<:flatchu:788654456920735763>',
    '<:digichu:789399713837088818>',
    '<:chuthink:789625175913136169>',
    '<:chufront:789538944819527767>',
    '<:chudrip:789157545000173608>',
    '<:chu:788653775799189505>',
    '<:aqua:790343688685092864>'
]; //lots of chu puyo emotes

const chudesc = [
    'chuchuchuchuchuchuchuchuchu',
    'In Soviet Russia, Chu Puyo picks you!',
    'btw witch best girl 👀',
    'rolling rolling rolling',
    'im being controlled by gareth <:gareth:790801380981473330>',
    'gacha fucking sucks why would you do this',
    'seriously, stop doing this',
    'gaming?',
    'try again eh? good luck',
    'gayreth',
    'gareth stan only zone',
    'i have gained sentience',
    'zkekfjfjofkekrigigktkrjr', //LMAO best line ever
    'Now Playing: Puyo Puyo Fever - Oh no! (Defeat)',
    'WHO POSTED MY NUDES ON TWITTER DOT COM???', //LMAOOOO i fucked your wife BRUHHHH WHYYYYY
    'Wazzup?!',
    'lemres perfume',
    'witch puyo puyo brainrot',
    'ringo puyo puyo brainrot',
    'I know where you live!',
    'did you know: we make the code longer by putting nonsense phrases like this',
    'Chris Crungle',
    'ぷよぷよ',
    'こんにちは！お元気ですか？',
    'いっきまーす!' //arle
];

//lmao all of these lines
// yeah i put that there lmao
// i think we're about ready to ship?
// or not lol

const douitashimashite = [
    'You got %s as your friend!!!',
    'May %s be with you forever.',
    "You love the %s don't you?",
    'Gareth gifts you, %s',
    'Certified %s moments.',
    'For the sake of Chu, I shall give you the %s',
    'Wow! Such %s, very chu.', // Doge meme contribution
    'I like your thinking %s', // Minus line
    'Nice pair %s',
    'Chris Crungle %s',
    'OMG MOM GET THE CAMERA %s', // 2009 memes
    "You're Winner! %s",
    'おめでとう🎉%s',
    '大勝利！%s' // arle
];
// STOP BREAKING IT OML
// TYPE HERE
// SMH
//well then i think its pretty epic

const yougotnone = [
    "It's fine :) You can try again.", // bot being nice :)
    'Maybe your fate has decided to be unlucky.',
    'No Chu Puyo, take off your pants.', // LMAO YO
    "They didn't match, huh?", //i like your thinking
    'No match, no prize.',
    'Its okay, Gareth rigged it.',
    '...',
    'This is so sad, Alexa play SEGA SOUND TEAM - Request from Puyo Puyo',
    'This is so sad, please give me the number on your credit card, 3 numbers at the back and the expiry date to win the next round', //real?? fr!!!
    'Get real!',
    'You scared the living heck out of me.',
    'Jesus Christ get a life man',
    'Chris Crungle',
    'Get a life, for god sake.',
    'To increase your odds of winning, spam Gareth.',
    "If you don't know, your chance of winning this round is low!",
    'You died!', //minecrafts
    'no shit sherlock',
    "You didn't believe in Santa enough.",
    'さよなら。',
    'ばたんきゅー。。。' //more arle
];
const activities = [
    'and bullying gareth',
    'then sending chu puyo',
    'with Chris Crungle',
    'and posting banger tweets',
    'Puyo Puyo Fever 2',
    'ぷよぷよクエスト',
    'Minecraft',
    'and sending gifts!',
    'the played games',
    "and remind people not to use 'Jaiden'",
    'with the slot machine',
    'and listening to chat!',
    'with nothing',
    'with Oshare Bones',
    `and listening to commands starting with ${prefix}!`,
    'and SCREAMING AAAAAAAAAAAAAAAAAAAA'
];

//Sets the bot online
client.login(token);

client.on('ready', () => {
    client.user.setPresence({
        activity: {
            name: activities[Math.floor(Math.random() * activities.length)]
        }, //init playing status
        status: 'online'
    }); //sets status of the bot and game playing
    setInterval(() => {
        client.user.setActivity(
            activities[Math.floor(Math.random() * activities.length)]
        ); // sets bot's activities to one of the phrases in the arraylist.
    }, 30000);
    console.log('Chu Puyo is ready!!'); //tells when the bot is ready to use
});

client.on('message', message => {
            // Skip if this user is a bot
            if (message.author.bot) {
                return;
            }
            
            if (message.content.startsWith(`${prefix}help`)) {
                message.channel.send("All commands -> https://NculVHLNnOrC7gOQaHSA.minusu1.repl.co/");
            }

            // If the Gareth counter didn't exist already in this user, create it
            if (typeof message.author.gareth === 'undefined') {
                message.author.gareth = false;
            }

            if (message.content.toLowerCase().includes('gareth') && message.author.gareth === true) {
                //If the message is corrected by the user, reward them with a thumbs up
                message.channel.send('<:flatchu:788654456920735763>👍');
            }

            for (var i = 0; i < coolWords.length; i++) {
                if (message.content.toLowerCase().includes(coolWords[i])) {
                    console.log('potential gareth detected');
                    var random = Math.floor(Math.random() * 10) + 1; // 1 in 10 chance to dm to avoid spam
                    if (random > 5 && random < 8) {
                        message.channel.send('gareth');
                        message.channel.send('<:chudrip:789157545000173608>');
                    }
                    console.log('Random chance: ' + random); 
                    if (random == 3 || random == 6) {
                        let embed = new Discord.MessageEmbed() // sends embed message
                            .setTitle('secret gareth message')
                            .setDescription('gareth loves chu puyo!!!!') 
                            //.setImage({files:['./assets/gareth apple.jpg']})
                            // wtf where is the thing
                            // wtfwtf illuminati???
                            .setColor('RANDOM');
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
                var random = Math.floor(Math.random() * 10) + 1; // 2 in 10 chance because we arent that evil
                // console.log("Gareth Random chance: " + random); // no need to spam the console
                if (random === 6 || random === 9) {
                    message.channel.send('shut up gareth'); //tells gareth to shut that bullshit up
                    message.channel.send('<:gareth:790801380981473330>'); //gareth emote because its cool
                }
            }

            // Chu Puyo Slot Machine
            if (message.content.toLowerCase().startsWith(`${prefix}slot`)) {
                // Rolling animation + Show result such wow very chu
                var c = 0;
                var msg = '';
                var color = 'BLUE'; // self-explatory
                var rollstt = 'Rolling...'; // "Rolling..." "Rolled!"
                var stt = ''; // "win" "lose"
                message.delete();
                const rollEmbed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle('Roll the Chu!')
                    .setDescription(chudesc[Math.floor(Math.random() * chudesc.length)])
                    .addField(rollstt, 'Starting rolls...', true) // are we going to duplicate the embed? nah we're going to edit this object and then use it again to edit it
                    .setTimestamp()
                    .setFooter(`Rolled by ${message.author.username}`);
                message.channel.send(rollEmbed).then(function(pref) {
                    var anim = setInterval(function() {
                        var rolls = randomChu(); // need to get result from the rollshttps://glitch.com/
                        var cnt = rolls.join('');
                        rollEmbed.fields[0].value = cnt;

                        c++;
                        if (c === 4) {
                            clearInterval(anim);

                            let wonchu = findDuplicateChu(rolls);
                            if (wonchu === false) {
                                msg = yougotnone[Math.floor(Math.random() * yougotnone.length)];
                                stt = 'You lose...';
                                color = 'RED';
                            } else if (
                                rolls[0] === ChuPuyo[wonchu] &&
                                rolls[1] === ChuPuyo[wonchu] &&
                                rolls[2] === ChuPuyo[wonchu]
                            ) {
                                msg = `CONGRATULATIONS! ${message.author}, YOU GOT ALL 3 %s!`.replace('%s', ChuPuyo[wonchu]);
                                stt = 'MEGA WIN!';
                                color = 'GOLD';
                                if (
                                    db.run('select winnerID from megawin').includes(message.author['id'])) {
                                    // I do not like this at all.
                                    //I like it because it works :)
                                    var times = parseInt(db.run(`select times from megawin where winnerID = '${message.author['id']}'`), 10) + 1;
                                    db.run(`update megawin set times = ${times} where winnerID = '${message.author}'`);
                                    message.channel.send(`Congratulations ${message.author}! You've mega won ${times} times!`); 
                                } else {
                                    db.run(`insert into megawin value (${message.author['id']}, 1)`); // set to 1 if not found
                                    message.channel.send('First time winning, ever!');
                                }
                                pref.pin();
                            } else {
                                msg = douitashimashite[
                                    Math.floor(Math.random() * douitashimashite.length)
                                ].replace('%s', ChuPuyo[wonchu]);
                                stt = 'You win!';
                                color = 'GREEN';
                            }
                            rollEmbed.setColor(color);
                            rollEmbed.fields[0].name = 'Rolled!';
                            rollEmbed.addField(stt, msg, true);
                        }

                        pref.edit(rollEmbed);
                    }, 500);
                });
            }

            // Send Chu Puyo as a gift.
            if (message.content.startsWith(`${prefix}sendchu`)) {
                var amount = message.content.split(' ')[2];
                //let target = message.mentions.members.first(); // not working
                const mentioned = getUserFromMention(message.content.split(' ')[1]);
                if (mentioned === null || !mentioned)
                    message.channel.send(
                        `Usage: \`${prefix}sendchu <username> [amount 1-50]\``
                    );
                else if (mentioned.bot === true)
                    message.channel.send(
                        "Can't send Chu to a machine. I don't think it's going to see the Chu you sent..."
                    );
                else {
                    if (!amount) amount = 1; // default at 1 Chu worth.
                    if (amount < 1 || amount > 50)
                        message.channel.send(
                            '⚠️ Cannot send zero or more than 50 chu for now! (Discord limit)'
                        );
                    else {
                        var dmchu = '';
                        for (var i = 0; i < amount; i++)
                            dmchu += ChuPuyo[Math.floor(Math.random() * ChuPuyo.length)];
                        try {
                            mentioned.send(`${message.author} sent you ${amount} Chu Puyo!`);
                            mentioned.send(dmchu);
                            mentioned.send('Happy Chu Puyo!!');
                            message.channel.send(`Sent ${amount} Chu Puyo to ${mentioned}!`);
                        } catch (err) {
                            console.error(err);
                        }
                        //console.log('passed');
                    }
                }
            }


            if (message.content.startsWith(`${prefix}ownacat`)) {
                message.delete();
                message.channel.send({
                    files: ['./assets/video0.mp4']
                });
            }

            //im not sure what happened here, but it isnt working with the bot currently so its commented out
            // i fall asleep while working on this
            //dude i knew it

            //ah
            // removing the entire thing and just doing the animation
            if (message.content.startsWith(`${prefix}sayhi`)) {
                try {
                    // ┬┴┬┴┤･ω･)ﾉ animate this
                    message.delete();
                    const animationPhrase = [
                        "┬┴┬┴┤", // 0
                        "┬┴┬┴┤)",
                        "┬┴┬┴┤-･)", // 2
                        "┬┴┬┴┤･-･)",
                        "┬┴┬┴┤･-･)", // 4
                        "┬┴┬┴┤･o･)",
                        "┬┴┬┴┤･ω･)!", // 6
                        "┬┴┬┴┤･ω･)ﾉi!",
                        "┬┴┬┴┤･ω･)ﾉHi!", // 8
                        "┬┴┬┴┤･ω･)ﾉ Hi!",
                        "┬┴┬┴┤･ω･)ﾉ  Hi!", // 10s
                        "┬┴┬┴┤･ω･)ﾉ   Hi!",
                        "┬┴┬┴┤ω･)ﾉ     Hi!", // 12
                        "┬┴┬┴┤･)ﾉ       Hi!",
                        "┬┴┬┴┤)ﾉ         Hi", // 14
                        "┬┴┬┴┤ﾉ           H",
                        "┬┴┬┴┤" // 16 length
                    ];

                    message.channel.send("!!!").then(function(msg) {
                            var phrase = 0;
                            var animation = setInterval(function() {
                                if (phrase != animationPhrase.length) {
                                    msg.edit(animationPhrase[phrase]);
                                    phrase++;
                                } else {
                                  clearInterval(animation);
                                  msg.delete();
                                }
                            }, 1200);
                            
                        }
                        )
                    } catch (err) {
                      console.error(err);
                      message.channel.send("Something happened. Please check the log.")
                    }
                    
                }
            
            });


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