module.exports = (app) => {
  const sellers = require("../controllers/seller.controller.js");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  // Create a new seller
  router.post("/", [AuthValidationMiddleware.validJWTNeeded, sellers.create]);

  // Retrieve all sellers
  router.get("/", [AuthValidationMiddleware.validJWTNeeded, sellers.findAll]);

  // Retrieve single seller
  router.get("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    sellers.findOne,
  ]);

  // Update seller
  router.patch("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    sellers.update,
  ]);

  // Delete single seller
  router.delete("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    sellers.delete,
  ]);

  // Delete All seller
  router.delete("/", [
    AuthValidationMiddleware.validJWTNeeded,
    sellers.deleteAll,
  ]);

  app.use("/api/sellers", router);
};
