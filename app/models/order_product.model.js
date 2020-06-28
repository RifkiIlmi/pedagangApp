module.exports = (sequelize, Sequelize) => {
  const orderProduct = sequelize.define("orderProduct", {
    orderProduct_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    order_quantity: {
      type: Sequelize.INTEGER,
    },
  });
  return orderProduct;
};
