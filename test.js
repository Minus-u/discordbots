//const cbj = require('./modules/commands/chublackjack');
//const dc = require('discord.js');

const xkcd = require('xkcd-api');

xkcd.latest(function(error, response) {
  if (error) {
    console.error(error);
  } else {
    console.log(response);
  }
});