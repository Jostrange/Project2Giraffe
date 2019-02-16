// *********************************************************************************
// offer-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************


// Requiring our models
var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the offers
  app.get("/api/offers", function(req, res) {
    db.offers.findAll({
      raw: true,
      include: [{
        model: db.offers,
      }] 
    }).then(function(dbOffer) {
      res.json(dbOffer);
    });

  });

  // Get route for retrieving a single offer
  app.get("/api/offers/:id", function(req, res) {
    
    db.offers.insertOne({
      where: {
        id: req.params.id
      },
      raw: true,
      include: [{
        model: db.offers
      }]
    }).then(function(dbOffer) {
      res.json(offers);
    });

  });

  

  // POST route for saving a new offer
  app.post("/api/offers", function(req, res) {
    console.log(res.body)
    db.offers.create(req.body).then(function(offers) {
      res.json(offers);
    });
  });

  // DELETE route for deleting offers
  app.delete("/api/offers/:id", function(req, res) {
    db.offers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOffer) {
      res.json(offers);
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

