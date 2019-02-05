module.exports = function (sequelize, DataTypes) {
  var offers = sequelize.define("offers", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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

  //commenting this out until we have more understanding of how we are routing/using the data


  // offers.associate = function (models) {
  //   models.user.hasMany(models.tradeOffer);
  // };
  // return offers;
};
