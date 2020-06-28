module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define("order", {
    order_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    delivery_location: {
      type: Sequelize.STRING,
    },
    order_status: {
      type: Sequelize.STRING, //ex:delivered, pending, canceled, dll
    },
    order_price: {
      type: Sequelize.INTEGER,
    },
    shipping_cost: {
      type: Sequelize.INTEGER,
    },
  });
  return order;
};
