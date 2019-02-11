
// *********************************************************************************
// post-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Requiring our models
var db = require("../models");

module.exports = function(app) {


  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    db.postItem.findAll({
    }).then(function(postItem) {
         res.render("index", { data: postItem});
       });
    })

  // app.get("/api/posts", function(req, res) {

  //   var query = {};
  //   if (req.query.user_id) {
  //     query.UserId = req.query.user_id;
  //   }

  //   db.postItem.findAll({
  //     where: query,
  //     include: [db.User]
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
      // res.render("index", { data: dbPost });
    // });

  // });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    
    db.postItem.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(postItem) {
      res.json(postItem);
    });

  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.postItem.create(req.body).then(function(postItem) {
      res.json(postItem);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.postItem.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(postItem) {
      res.json(postItem);
    });
  });

  // PUT route for updating posts
  // app.put("/api/posts", function(req, res) {
  //   db.Post.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });
};

