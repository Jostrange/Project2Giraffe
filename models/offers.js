module.exports = function(sequelize, DataTypes) {
  var offers = sequelize.define("offers", {
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    descriptionOfItem: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    photoURL: {
      type: DataTypes.BLOB,
      allowNull: false,
      len: [1]
    }
  });
  // Creates associates
  // offers.associate = function(models) {
  //   offers.belongsTo(models.postItem, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return offers;
};
