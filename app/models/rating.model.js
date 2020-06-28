module.exports = (sequelize, Sequelize) => {
  const rating = sequelize.define("rating", {
    rating_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    value: {
      type: Sequelize.INTEGER,
    },
  });
  return rating;
};
