// index.js
// where your node app starts

// init project
const express = require("express");
require("dotenv").config();
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(_req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (_req, res) => {
  res.json({
    unix: Number(Date.now()),
    utc: new Date(Date.now()).toUTCString(),
  });
});

// your first API endpoint...
app.get("/api/:timestamp", function(req, res) {
  const ts = req.params.timestamp;
  if (Date.parse(ts)) {
    return res.json({
      unix: Number(Date.parse(ts)),
      utc: new Date(ts).toUTCString(),
    });
  }
  
  if (parseInt(ts)) {
    return res.json({
      unix: parseInt(ts),
      utc: new Date(parseInt(ts)).toUTCString(),
    });
  }
  
  res.json({ error: "Invalid Date" });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
