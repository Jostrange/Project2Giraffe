
// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

var db = require("../models");
var path = require("path");

module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/home.html"));
    res.render("index");
  });

  // Route to the logged in page
  app.get("/loggedIn", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/loggeIn.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

};

