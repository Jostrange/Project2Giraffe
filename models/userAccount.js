// var Sequelize = require("sequelize");
// var sequelize = require("/config/config.json");

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define("user", {
    apiID: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },

  });
  //commenting this out until we have more understanding of how we are routing/using the data
  // user.associate = function(models) {
  //   postItem.hasMany(models.post, {
  //     foreignKey: "user_id",
  //     onDelete: "cascade"
  //   });
  // };
  // return user;
};
