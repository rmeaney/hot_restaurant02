// Dependenciess
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var totalTables = 5;
var reservedTables = [];
var waitlist = [];

// Sets up the Express App
// =============================================================
// Sets up the Express app to handle data parsing

var app = express();
var PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//people Data

var reservations = [{
  //routeName: "",
  "customerName": "Mickey",
  "phoneNumber": 1234567,
  "customerEmail": "mickey@gmail.com",
  "userID": 001
}, {
  "customerName": "Jane",
  "phoneNumber": 2345678,
  "customerEmail": "jane@gmail.com",
  "userID": 002
},{
  "customerName": "Bill",
  "phoneNumber": 2345678,
  "customerEmail": "jane@gmail.com",
  "userID": "ace"
}];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
 res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables.html", function(req, res) {
 res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/table", function(req, res) {
   res.json(reservations);
});

app.get("/reserve.html", function(req, res) {
 res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/api/check", function(req, res) {
 res.sendFile(path.join(__dirname, "check.html"));
});

app.get("/api/waitlist", function(req, res) {
   res.json(waitlist);
});

/// this pushes into the arrays
app.post("/api/new", function(req, res) {
 var newReservation = req.body;

 console.log(newReservation);
 if (reservations.length < 5) {
   reservations.push(newReservation);
   res.json(true);
 }
 else {
   waitlist.push(newReservation);
   res.json(false);
 }
});


// Starts the server to begin listening
// =============================================================
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("App listening on PORT " + PORT);
});

