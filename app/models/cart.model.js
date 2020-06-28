module.exports = (sequelize, Sequelize) => {
  const cart = sequelize.define("cart", {
    cart_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  });
  return cart;
};
