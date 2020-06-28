module.exports = (app) => {
  const pcomments = require("../controllers/comment.controller.js");
  const AuthValidationMiddleware = require("../middlewares/auth.validation.middleware");

  let router = require("express").Router();

  // Create a new Comment
  router.post("/", [
    AuthValidationMiddleware.validJWTNeeded,
    pcomments.addComment,
  ]);

  // Retrieve all pcomments by product
  router.get("/products/:product_id", [
    AuthValidationMiddleware.validJWTNeeded,
    pcomments.commentByProduct,
  ]);

  // Retrieve all Comment by customer
  router.get("/customers/:customer_id", [
    AuthValidationMiddleware.validJWTNeeded,
    pcomments.commentByCustomer,
  ]);

  // Update Comment
  router.patch("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    pcomments.update,
  ]);

  // Delete single Comment
  router.delete("/:id", [
    AuthValidationMiddleware.validJWTNeeded,
    pcomments.delete,
  ]);

  app.use("/api/pcomments", router);
};
