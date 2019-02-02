var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Tradesies.findAll({}).then(function(Tradesies) {
      res.json(Tradesies);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Tradesies.create(req.body).then(function(Tradesies) {
      res.json(Tradesies);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Tradesies.destroy({ where: { id: req.params.id } }).then(function() {
      res.end;
    });
  });
};
