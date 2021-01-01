const http = require("https");
const fs = require("fs");
const FormData = require("form-data");

const filePath = "./assets/p5cc.png"; // where ever you want save the file along with the file name you want and extension example (here/file.zip)

module.exports = {
  name: "p5cc",
  description: "Persona 5 Calling Card Maker",
  args: true,
  usage: "<message>",
  execute(message, args) {
    let msg = message.content.split(/ +/);
    msg.shift();
    msg = msg.join(" ");
    if (msg.length <= 1)
      return message.channel.send("Message too short to send.");
    let form = new FormData();
    form.append("message", msg);
    try {
      let request = http.request({
        method: "post",
        host: "rouxkarlus.pythonanywhere.com",
        path: "/p5cc/api",
        headers: form.getHeaders()
      });

      form.pipe(request);

      request
        .on("response", function(res) {
          let data = "";
          res.on("data", chunk => {
            data += chunk;
          });
          res.on("end", () => {
            let file = fs.createWriteStream(filePath);
            let request = http.get(data, response => {
              response.pipe(file);
            });
            download(data, filePath, function(err) {
              if (err) console.log(err);
              message.channel.send({ files: [filePath] });
            });
          });
        })
        .on("error", console.error)
        .end();
    } catch (err) {
      console.log(err);
    }
  }
};

// from https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries#22907134
let download = function(url, dest, cb) {
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
