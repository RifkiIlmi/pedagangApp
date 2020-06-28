module.exports = (app) => {
  const carts = require("../controllers/cart.controller.js");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  // Add Product To cart
  router.post("/", [
    AuthValidationMiddleware.validJWTNeeded,
    carts.addProductToCart,
  ]);

  // Retrieve all carts by customer
  router.get("/customers/:customer_id", [
    AuthValidationMiddleware.validJWTNeeded,
    carts.cartByCustomer,
  ]);

  // ADD Quantity by Product
  router.patch("/add/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    carts.addQuantity,
  ]);

  // Subtract Quantity by Product
  router.patch("/sub/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    carts.subQuantity,
  ]);

  // Delete produuct from cart
  router.delete("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    carts.deleteProduct,
  ]);

  router.delete("/", [
    AuthValidationMiddleware.validJWTNeeded,
    carts.deleteAll,
  ]);

  app.use("/api/carts", router);
};
