module.exports = function(sequelize, DataTypes) {
  var postItem = sequelize.define("postItem", {
    itemName: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      len: [1]
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });
  //commenting this out until we have more understanding of how we are routing/using the data

  // postItem.associate = function (models) {
  //   models.postItem.belongsTo(models.user, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return postItem;
};
