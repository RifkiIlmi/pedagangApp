const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const Seller = db.sellers;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.seller_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Post
  const seller = {
    seller_id: uuidv4(),
    seller_name: req.body.seller_name,
    seller_address: req.body.seller_address,
    seller_email: req.body.seller_email,
    seller_phone: req.body.seller_phone,
    seller_noktp: req.body.seller_noktp,
  };

  // Save Post in the database
  Seller.create(seller)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });
    });
};
