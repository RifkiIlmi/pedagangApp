const db = require("../models");
const Seller = db.sellers;
const crypto = require("crypto");

exports.hasAuthValidFields = (req, res, next) => {
  let errors = [];

  if (req.body) {
    if (!req.body.seller_phone) {
      errors.push("Missing phone field");
    }
    if (!req.body.seller_password) {
      errors.push("Missing password field");
    }
    if (errors.length) {
      return res.status(400).send({ errors: errors.join(",") });
    } else {
      return next();
    }
  } else {
    return res
      .status(400)
      .send({ errors: "Missing phone and password fields" });
  }
};

exports.isPasswordAndSellerMatch = (req, res, next) => {
  Seller.findAll({
    where: { seller_phone: req.body.seller_phone },
  }).then((seller) => {
    if (!seller[0]) {
      res.status(404).send({ status: 0, message: "No data found" });
    } else {
      let passwordFields = seller[0].seller_password.split("$");
      let salt = passwordFields[0];
      let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.seller_password)
        .digest("base64");
      if (hash === passwordFields[1]) {
        req.body = {
          userId: seller[0].seller_id,
          seller_email: seller[0].seller_email,
          seller_phone: seller[0].seller_phone,
          // permissionLevel: seller[0].permissionLevel,
          // provider: "email",
          seller_name: seller[0].seller_name,
        };
        return next();
      } else {
        return res
          .status(400)
          .send({ errors: ["Invalid phone number or password"] });
      }
    }
  });
};
