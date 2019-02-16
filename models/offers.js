module.exports = function (sequelize, DataTypes) {
  var offers = sequelize.define("offers", {
    item_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    item_zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    item_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    full_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contact_info: {
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