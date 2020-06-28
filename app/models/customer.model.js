module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define("customer", {
    customer_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    customer_name: {
      type: Sequelize.STRING,
    },
    customer_email: {
      type: Sequelize.STRING,
    },
    customer_password: {
      type: Sequelize.STRING,
    },
    customer_phone: {
      type: Sequelize.STRING,
    },
    customer_address: {
      type: Sequelize.STRING,
    },
  });
  return customer;
};
