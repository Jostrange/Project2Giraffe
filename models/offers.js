module.exports = function (sequelize, DataTypes) {
  var offers = sequelize.define("offers", {
    offerItemName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    offerItemZip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    offerItemDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    offerFullName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    offerContactInfo: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  //commenting this out until we have more understanding of how we are routing/using the data

  offers.associate = function (models) {
    offers.hasMany(models.postItem, {
      // foreignKey: "user_id",
      onDelete: "cascade"
    });
  };
  return offers;
};