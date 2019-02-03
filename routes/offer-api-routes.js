// *********************************************************************************
// offer-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Requiring our models
var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the offers
  app.get("/api/offers", function(req, res) {

    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }

    db.Offers.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbOffer) {
      res.json(dbOffer);
    });

  });

  // Get route for retrieving a single offer
  app.get("/api/offers/:id", function(req, res) {
    
    db.Offer.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbOffer) {
      res.json(dbOffer);
    });

  });

  // POST route for saving a new offer
  app.post("/api/offers", function(req, res) {
    db.Offer.create(req.body).then(function(dbOffer) {
      res.json(dbOffer);
    });
  });

  // DELETE route for deleting offers
  app.delete("/api/offers/:id", function(req, res) {
    db.Offer.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOffer) {
      res.json(dbOffer);
    });
  });

  // PUT route for updating offers
  // app.put("/api/offers", function(req, res) {
  //   db.Offer.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function(dbOffer) {
  //     res.json(dbOffer);
  //   });
  // });
};

