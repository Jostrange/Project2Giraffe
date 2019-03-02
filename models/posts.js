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

  // Creates associates
  postItem.associate = function(models) {
    postItem.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  // postItem.associate = function(models) {
  //   postItem.hasMany(models.offers, {
  //     onDelete: "cascade"
  //   });
  // };

  return postItem;
};
