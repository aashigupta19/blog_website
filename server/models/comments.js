module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    // title, content, author name
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Comments;
};
