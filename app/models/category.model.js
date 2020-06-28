module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define("category", {
    category_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: Sequelize.STRING,
    },
  });
  return category;
};
