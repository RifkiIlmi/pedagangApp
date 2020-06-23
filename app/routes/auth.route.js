module.exports = (app) => {
  const VerifyUserMiddleware = require("../middlewares/verify.seller.middleware");
  const AuthorizationController = require("../controllers/authorization.controller");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  router.post("/sellers/login", [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndSellerMatch,
    AuthorizationController.login,
  ]);

  router.post("/sellers/login/refresh", [
    AuthValidationMiddleware.validJWTNeeded,
    AuthValidationMiddleware.verifyRefreshBodyField,
    AuthValidationMiddleware.validRefreshNeeded,
    AuthorizationController.login,
  ]);

  app.use("/api", router);
};
