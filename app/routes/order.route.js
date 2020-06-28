module.exports = (app) => {
  const orders = require("../controllers/order.controller.js");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  // order Product
  router.post("/", [AuthValidationMiddleware.validJWTNeeded, orders.order]);

  router.get("/driver/:driver_id", [
    AuthValidationMiddleware.validJWTNeeded,
    orders.driverOrder,
  ]);

  router.get("/customer/:customer_id", [
    AuthValidationMiddleware.validJWTNeeded,
    orders.customerOrder,
  ]);

  router.get("/", [
    AuthValidationMiddleware.validJWTNeeded,
    orders.orderByStatus,
  ]);

  router.patch("/", [
    AuthValidationMiddleware.validJWTNeeded,
    orders.updateStatus,
  ]);

  app.use("/api/orders", router);
};
