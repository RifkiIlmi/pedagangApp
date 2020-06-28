module.exports = (app) => {
  const categories = require("../controllers/category.controller.js");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  router.post(
    "/",
    AuthValidationMiddleware.validJWTNeeded,
    categories.addCategory
  );

  router.get("/", [
    AuthValidationMiddleware.validJWTNeeded,
    categories.findAll,
  ]);

  router.get("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    categories.findOne,
  ]);

  router.put("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    categories.update,
  ]);

  router.delete("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    categories.delete,
  ]);

  router.delete("/", [
    AuthValidationMiddleware.validJWTNeeded,
    categories.deleteAll,
  ]);

  app.use("/api/categories", router);
};
