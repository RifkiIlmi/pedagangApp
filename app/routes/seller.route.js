module.exports = (app) => {
  const sellers = require("../controllers/seller.controller.js");

  let router = require("express").Router();

  // Create a new post
  router.post("/", sellers.create);

  app.use("/api/sellers", router);
};
