module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    FullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userImageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  user.associate = function(models) {
    user.hasMany(models.postItem, {
      onDelete: "cascade"
    });
  };
  return user;
};
