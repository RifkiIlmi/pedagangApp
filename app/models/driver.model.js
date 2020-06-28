module.exports = (sequelize, Sequelize) => {
  const driver = sequelize.define("driver", {
    driver_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    driver_name: {
      type: Sequelize.STRING,
    },
    driver_email: {
      type: Sequelize.STRING,
    },
    driver_phone: {
      type: Sequelize.STRING,
    },
    driver_password: {
      type: Sequelize.STRING,
    },
    driver_address: {
      type: Sequelize.STRING,
    },
  });
  return driver;
};
