// *********************************************************************************
// user-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Requiring our models
var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the users

  app.get("/api/posts", function(req, res) {
    db.postItem.findAll({
    }).then(function(dbPost) {
         res.render("index", { data: dbPost });
       });
    })
  // app.get("/api/users", function(req, res) {
    
  //   db.User.findAll({
  //     include: [db.Post,db.Offer]
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

  app.get("/api/users/:id", function(req, res) {
    
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post,db.Offer]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
