var db = require("../models/");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Tradesies.findAll({}).then(function(userAccount) {
      var hbsObject = {
        userAccount: userAccount,
        layout: 'main',
      };
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/userAccount/:id", function(req, res) {
    db.Tradesies.findOne({ where: { id: req.params.id } }).then(function(userAccount) {
      console.log(userAccount);
      console.log(photoLink);
      res.render("userAccount", {
        userAccount: userAccount
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// I fixed this to match the db (josie)