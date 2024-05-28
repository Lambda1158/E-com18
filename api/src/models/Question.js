const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("question", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    question: {
      type: DataTypes.STRING,
    },
    answer: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  });
};
