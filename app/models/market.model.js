module.exports = (sequelize, Sequelize) => {
  const market = sequelize.define("market", {
    market_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    market_name: {
      type: Sequelize.STRING,
    },
    market_status: {
      type: Sequelize.BOOLEAN,
    },
    map_location: {
      type: Sequelize.STRING,
    },
    market_region: {
      type: Sequelize.STRING,
    },
    market_address: {
      type: Sequelize.STRING,
    },
    // seller_id: {
    //   type: Sequelize.UUID,
    //   references: {
    //     model: "sellers", // 'Seller' would also work
    //     key: "seller_id", // 'id' refers to column name in sellers table
    //   },
    // },
  });

  return market;
};
