module.exports = (app) => {
  const markets = require("../controllers/market.controller.js");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  // Retrieve all markets
  router.get("/", [AuthValidationMiddleware.validJWTNeeded, markets.findAll]);

  // Retrieve single market
  router.get("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    markets.findOne,
  ]);

  // Update market
  router.patch("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    markets.update,
  ]);

  app.use("/api/markets", router);
};
