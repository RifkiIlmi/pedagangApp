module.exports = (sequelize, Sequelize) => {
  const product_comment = sequelize.define("product_comment", {
    pcomment_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    pcomment_message: {
      type: Sequelize.STRING,
    },
  });
  return product_comment;
};
