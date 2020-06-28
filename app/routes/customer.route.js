module.exports = (app) => {
  const customers = require("../controllers/customer.controller.js");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  // Create a new customer regis
  router.post("/register", customers.register);

  // Retrieve all customers
  router.get("/", [AuthValidationMiddleware.validJWTNeeded, customers.findAll]);

  // Retrieve single customer
  router.get("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    customers.findOne,
  ]);

  // Update customer
  router.patch("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    customers.update,
  ]);

  // Delete single customer
  router.delete("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    customers.delete,
  ]);

  app.use("/api/customers", router);
};
