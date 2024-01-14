module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    // title, content, author name
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  //   Users.associate = (models) => {
  //     Users.hasMany(models.Posts, {
  //       onDelete: "cascade",
  //     });
  //   };

  return Users;
};
