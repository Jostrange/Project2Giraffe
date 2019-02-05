module.exports = function (sequelize, DataTypes) {
  var postItem = sequelize.define('postItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nameOfUser: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    descriptionOfItem: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    photo: {
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

  // return postItem;
};
