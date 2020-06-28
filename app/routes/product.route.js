module.exports = (app) => {
  const products = require("../controllers/product.controller.js");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  router.post(
    "/",
    AuthValidationMiddleware.validJWTNeeded,
    products.addProduct
  );

  router.get("/", AuthValidationMiddleware.validJWTNeeded, products.findAll);
  router.get("/:id", AuthValidationMiddleware.validJWTNeeded, products.findOne);
  router.get(
    "/category/:category_id",
    AuthValidationMiddleware.validJWTNeeded,
    products.productByCategory
  );

  router.post(
    "/category",
    AuthValidationMiddleware.validJWTNeeded,
    products.addCategory
  );

  router.patch(
    "/:id",
    AuthValidationMiddleware.validJWTNeeded,
    products.update
  );

  router.delete(
    "/:id",
    AuthValidationMiddleware.validJWTNeeded,
    products.delete
  );

  router.delete(
    "/category/:id",
    AuthValidationMiddleware.validJWTNeeded,
    products.deleteCategory
  );

  app.use("/api/products", router);
};
