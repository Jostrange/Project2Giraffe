// *********************************************************************************
// user-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Requiring our models
var db = require("../models");

module.exports = function (app) {

  // GET route for getting all of the users

  // app.get("/api/users", function(req, res) {

  //   db.User.findAll({
  //     include: [db.Post,db.Offer]
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

  app.get("/api/users/:id", function (req, res) {

    db.user.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post, db.Offer]
    }).then(function (dbUser) {
      res.json(dbuser);
    });
  });

// Create user record only if it doesn't exist.
  app.post("/api/users", function (req, res) {
    db.user.findOrCreate({
      where: req.body
    })
      .then(function (dbuser) {
        res.json(dbuser);
      });
  });

  app.delete("/api/users/:id", function (req, res) {
    db.user.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.json(dbuser);
    });
  });

};
