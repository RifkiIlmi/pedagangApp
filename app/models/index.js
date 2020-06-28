const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// initiate all models here
db.products = require("./product.model.js")(sequelize, Sequelize);
db.productCategories = require("./productCategory.model.js")(
  sequelize,
  Sequelize
);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.product_comments = require("./product_comment.model.js")(
  sequelize,
  Sequelize
);
db.sellers = require("./seller.model.js")(sequelize, Sequelize);
db.markets = require("./market.model.js")(sequelize, Sequelize);
db.drivers = require("./driver.model.js")(sequelize, Sequelize);
db.customers = require("./customer.model.js")(sequelize, Sequelize);
db.carts = require("./cart.model.js")(sequelize, Sequelize);
db.ratings = require("./rating.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.orderProducts = require("./order_product.model.js")(sequelize, Sequelize);

// initiate model relationship
db.sellers.hasOne(db.markets, {
  foreignKey: {
    field: "seller_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.markets.belongsTo(db.sellers);

db.markets.hasMany(db.products, {
  foreignKey: {
    field: "market_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.products.belongsTo(db.markets);

db.products.hasMany(db.product_comments, {
  foreignKey: {
    field: "product_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.product_comments.belongsTo(db.products);

db.customers.hasMany(db.product_comments, {
  foreignKey: {
    field: "customer_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.product_comments.belongsTo(db.customers);

db.products.hasMany(db.productCategories, {
  as: "product_category",
  foreignKey: {
    field: "product_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.productCategories.belongsTo(db.products);

db.categories.hasMany(db.productCategories, {
  as: "category_product",
  foreignKey: {
    field: "category_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.productCategories.belongsTo(db.categories);

db.products.hasMany(db.carts, {
  foreignKey: {
    field: "product_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.carts.belongsTo(db.products);

db.customers.hasMany(db.carts, {
  foreignKey: {
    field: "customer_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.carts.belongsTo(db.customers);

db.customers.hasMany(db.orders, {
  foreignKey: {
    field: "customer_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.orders.belongsTo(db.customers);

db.orders.hasMany(db.orderProducts, {
  foreignKey: {
    field: "order_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.orderProducts.belongsTo(db.orders);

db.products.hasMany(db.orderProducts, {
  foreignKey: {
    field: "product_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.orderProducts.belongsTo(db.products);

db.drivers.hasMany(db.orders, {
  foreignKey: {
    field: "driver_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.orders.belongsTo(db.drivers);

db.customers.hasMany(db.ratings, {
  foreignKey: {
    field: "customer_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.ratings.belongsTo(db.customers);

db.products.hasMany(db.ratings, {
  foreignKey: {
    field: "product_id",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.ratings.belongsTo(db.products);

module.exports = db;
