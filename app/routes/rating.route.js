module.exports = (app) => {
  const ratings = require("../controllers/rating.controller.js");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  // Create a new rating
  router.post("/", [
    AuthValidationMiddleware.validJWTNeeded,
    ratings.giveRating,
  ]);

  // Retrieve all ratings by product
  router.get("/products/:product_id", [
    AuthValidationMiddleware.validJWTNeeded,
    ratings.ratingByProduct,
  ]);

  // Retrieve all rating by customer
  router.get("/customers/:customer_id", [
    AuthValidationMiddleware.validJWTNeeded,
    ratings.ratingByCustomer,
  ]);

  // Update rating
  router.patch("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    ratings.update,
  ]);

  // Delete single rating
  router.delete("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    ratings.delete,
  ]);

  app.use("/api/ratings", router);
};
