const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const db = require("../models");
const Seller = db.sellers;
const Op = db.Sequelize.Op;

// Create and Save a new Seller
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;

  // Create a Seller
  const seller = {
    seller_id: uuidv4(),
    seller_name: req.body.name,
    seller_password: req.body.password,
    seller_address: req.body.address,
    seller_email: req.body.email,
    seller_phone: req.body.phone,
    seller_noktp: req.body.noktp,
  };

  // Save Seller in the database
  Seller.create(seller)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Seller.",
      });
    });
};

// Retrieve all Sellers from the database.
exports.findAll = (req, res) => {
  const name = req.query.seller_name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Seller.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find Seller",
      });
    });
};

// Find a single Seller with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Seller.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Data Not Found",
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Seller with id=" + id,
      });
    });
};

// Update a Seller by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (req.body.seller_password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.seller_password)
      .digest("base64");
    req.body.seller_password = salt + "$" + hash;
  }

  Seller.update(req.body, {
    where: { seller_id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Seller was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Seller with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating seller with id=" + id,
      });
    });
};

// Delete a Seller with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Seller.destroy({
    where: { seller_id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Seller was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Seller with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete seller with id=" + id,
      });
    });
};

// Delete all Sellers from the database.
exports.deleteAll = (req, res) => {
  Seller.destroy({
    where: {},
    truncate: false,
  })
    .then((result) => {
      res.send({
        message: `${result} Sellers were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sellers.",
      });
    });
};
