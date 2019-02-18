
// *********************************************************************************
// homePage-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Requiring our models
var db = require("../models");

module.exports = function (app) {

  // GET route for getting all the datas from both postItem & user table.
  // Renedered data to the homepage.
  app.get("/", function (req, res) {
    db.postItem.findAll({
      raw: true,
      include: [{
        model: db.user,
      }]
    }).then(function (dbPostUser) {
      res.render("homePage", { data: dbPostUser });
    });
  })

  // GET route for getting all the datas from both postItem & user table
  // Happens when on homepage.
  app.get("/homePage", function (req, res) {
    db.postItem.findAll({
      raw: true,
      include: [{
        model: db.user,
      }]
    }).then(function (dbPostUser) {
      res.render("homePage", { data: dbPostUser });
    });
  })

  // GET route for getting all the datas from both postItem & user table filtered with category.
  app.get("/api/homePage/:category", function (req, res) {
    db.postItem.findAll({
      where: {
        category: req.params.category
      },
      raw: true,
      include: [{
        model: db.user
      }]
    }).then(function (dbPostUser) {
      res.render("homePage", { data: dbPostUser });
    });
  })

  // Create user record only if it doesn't exist.
  app.post("/api/users", function (req, res) {
    db.user.findOrCreate({
      where: req.body
    })
      .then(function (dbUser) {
        res.json(dbUser);
      });
  });
};

