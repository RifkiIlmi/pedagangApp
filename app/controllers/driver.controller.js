const { v4: uuidv4, v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const db = require("../models");
const { markets, drivers } = require("../models");
const Seller = db.sellers;
const Op = db.Sequelize.Op;

// Create and Save a new Driver registration
exports.register = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }

  const driverId = uuidv4();
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;

  // Create a Driver
  const driver = {
    driver_id: driverId,
    driver_name: req.body.name,
    driver_email: req.body.email,
    driver_phone: req.body.phone,
    driver_password: req.body.password,
    driver_address: req.body.address,
  };

  // Save Driver in the database
  drivers
    .create(driver)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Driver.",
      });
    });
};

// Retrieve all Drivers from the database.
exports.findAll = (req, res) => {
  const name = req.query.driver_name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  drivers
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find Driver",
      });
    });
};

// Find a single Driver with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  drivers
    .findByPk(id)
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
        message: "Error retrieving Driver with id=" + id,
      });
    });
};

// Update a Driver by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (req.body.driver_password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.driver_password)
      .digest("base64");
    req.body.driver_password = salt + "$" + hash;
  }

  drivers
    .update(req.body, {
      where: { driver_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Driver was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Driver with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Driver with id=" + id,
      });
    });
};

// Delete a Driver with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  drivers
    .destroy({
      where: { driver_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Driver was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Driver with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Driver with id=" + id,
      });
    });
};

// Delete all Drivers from the database.
exports.deleteAll = (req, res) => {
  drivers
    .destroy({
      where: {},
      truncate: false,
    })
    .then((result) => {
      res.send({
        message: `${result} Drivers were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Driver.",
      });
    });
};
