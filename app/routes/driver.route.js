module.exports = (app) => {
  const drivers = require("../controllers/driver.controller.js");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  // Create a new driver regis
  router.post("/register", drivers.register);

  // Retrieve all drivers
  router.get("/", [AuthValidationMiddleware.validJWTNeeded, drivers.findAll]);

  // Retrieve single driver
  router.get("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    drivers.findOne,
  ]);

  // Update driver
  router.patch("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    drivers.update,
  ]);

  // Delete single driver
  router.delete("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    drivers.delete,
  ]);

  // Delete All driver
  router.delete("/", [
    AuthValidationMiddleware.validJWTNeeded,
    drivers.deleteAll,
  ]);

  app.use("/api/drivers", router);
};
