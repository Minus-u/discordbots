const xkcd = require("xkcd-api");
const fs = require("fs");
const http = require("https");
const filePath = "./assets/xkcd.png";

module.exports = {
  name: "xkcd",
  description: "Fetch XKCD comic.",
  args: false,
  usage: "[lastest|random|<id>]",
  execute: async function(message, args) {
    // process JSON response
    function processJSON(json) {
      try {
        const url = json.img;
        const metadata = `XKCD #${json.num}: ${json.title} (${json.month}/${json.day}/${json.year})`;
        let file = fs.createWriteStream(filePath);
        let request = http.get(url, response => {
          response.pipe(file);
        });
        download(url, filePath, async function(err) {
          if (err) return console.log(err);
          await message.channel.send(metadata, {
            files: [filePath],
            name: `xkcd_${json.num}.png`
          });
        });
      } catch (err) {
        console.log(err);
        message.channel.send(err.toString());
      }
    }

    // process parameter
    let response;
    if (!args[0] || args[0] === "lastest") {
      xkcd.latest(function(err, resp) {
        if (err) return console.error(err);
        processJSON(resp);
      });
    } else if (args[0] && args[0] === "random") {
      xkcd.random((err, resp) => {
        if (err) return console.error(err);
        processJSON(resp);
      });
    } else if (args[0] && args[0].match(/\d+/g)[0]) {
      if (args[0] === "404") return message.channel.send("XKCD #404: Not Found (1/4/2008)");
      response = xkcd.get(args[0], (err, resp) => {
        if (err) return console.error(err);
        processJSON(resp);
      });
    }
  }
};

// from https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries#22907134
const download = (url, dest, cb) => {
  var file = fs.createWriteStream(dest);
  var request = http
    .get(url, function(response) {
      response.pipe(file);
      file.on("finish", function() {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on("error", function(err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
};
