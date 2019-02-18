// *********************************************************************************
// userPage-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Requiring our models
var db = require("../models");

module.exports = function (app) {

  // GET route for getting all the datas from both postItem & user table
  app.get("/userPage", function (req, res) {
    db.postItem.findAll({
      raw: true,
      include: [{
        model: db.user,
        // where : { id : db.postItem.userId }
      }]
    }).then(function (dbPostUser) {
      // console.log(dbPostUser)
      res.render("userPages", { data: dbPostUser });
      // res.json(dbPostUser)
    });
  })

  // GET route for getting all the datas from both postItem & user table filtered with category.
  app.get("/api/userPage/:category", function (req, res) {
    db.postItem.findAll({
      where: {
        category: req.params.category
      },
      raw: true,
      include: [{
        model: db.user
      }]
    }).then(function (dbPostUser) {
      // console.log(dbPostUser)
      res.render("userPages", { data: dbPostUser });
      // res.json(dbPostUser)
    });
  })

  // POST route for saving a new post.
  // (functions in both userPage and yourPage)
  app.post("/api/posts", function (req, res) {
    db.postItem.create(req.body).then(function (dbPostItem) {
      res.json(dbPostItem);
    });
  });

};
