/**
 * These columns will be generated automatically:
 * id, title, description, published, createdAt, updatedAt.
 * create a new Post: create(object)
 * find a Post by id: findByPk(id)
 * get all Posts: findAll()
 * update a Post by id: update(data, where: { id: id })
 * remove a Post: destroy(where: { id: id })
 * remove all Posts: destroy(where: {})
 * find all Posts by title: findAll({ where: { title: ... } })
 * These functions will be used in our Controller.
 */
module.exports = (sequelize, Sequelize) => {
  const Seller = sequelize.define("seller", {
    seller_id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    seller_name: {
      type: Sequelize.STRING,
    },
    seller_password: {
      type: Sequelize.STRING,
    },
    seller_address: {
      type: Sequelize.STRING,
    },
    seller_email: {
      type: Sequelize.STRING,
    },
    seller_phone: {
      type: Sequelize.STRING,
    },
    seller_noktp: {
      type: Sequelize.STRING,
    },
  });

  return Seller;
};
