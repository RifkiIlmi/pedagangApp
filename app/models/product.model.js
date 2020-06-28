module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define("product", {
    product_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    product_name: {
      type: Sequelize.STRING,
    },
    product_description: {
      type: Sequelize.TEXT,
    },
    product_price: {
      type: Sequelize.FLOAT,
    },
    product_stock: {
      type: Sequelize.INTEGER,
    },
    product_discount: {
      type: Sequelize.INTEGER,
    },
    product_photo: {
      type: Sequelize.STRING,
    },
  });
  return product;
};
