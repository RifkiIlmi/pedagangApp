module.exports = (sequelize, Sequelize) => {
  const productCategory = sequelize.define("productCategory", {
    pcategory_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
  });
  return productCategory;
};
