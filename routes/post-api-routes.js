
// *********************************************************************************
// post-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Requiring our models
var db = require("../models");

module.exports = function(app) {


  // GET route for getting all the datas from both postItem & user table
  app.get("/", function(req, res) {
    db.postItem.findAll({
      raw: true,
      include: [{ 
        model: db.user,
        // where : { id : db.postItem.userId }
      }]
    }).then(function(dbPostUser) {
      // console.log(dbPostUser)
        res.render("index", { data: dbPostUser});
        // res.json(dbPostUser)
       });
    })

    //  get yourPost details
    app.get("/api/yourpost/:id", function(req, res) {
      console.log(req.params)
      db.postItem.findAll({
        raw: true,
        where : { userId : req.params.id },
        include: [{ 
          model: db.user
        }]
      }).then(function(dbPostUser) {
        console.log(dbPostUser)
        res.render("yourPage", { data: dbPostUser});
          // res.json(dbPostUser)
         });
      })

    // GET route for getting all the datas from both postItem & user table filtered with category.
    app.get("/api/posts/:category", function(req, res) {
      db.postItem.findAll({
        where: {
                category: req.params.category
              },
        raw: true,
        include: [{ 
          model: db.user
        }]
      }).then(function(dbPostUser) {
        // console.log(dbPostUser)
           res.render("index", { data: dbPostUser});
          // res.json(dbPostUser)
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
  // app.get("/api/posts/:id", function(req, res) {
    
  //   db.postItem.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.User]
  //   }).then(function(postItem) {
  //     res.json(postItem);
  //   });

  // });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    // console.log(req.body);
    db.postItem.create(req.body).then(function(dbPostItem) {
      res.json(dbPostItem);
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

