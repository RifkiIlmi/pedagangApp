const { v4: uuidv4, v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const db = require("../models");
const { drivers, customers } = require("../models");
const Seller = db.sellers;
const Op = db.Sequelize.Op;

exports.register = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!",
    });
    return;
  }

  const customerId = uuidv4();
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;

  const customer = {
    customer_id: customerId,
    customer_name: req.body.name,
    customer_email: req.body.email,
    customer_password: req.body.password,
    customer_phone: req.body.phone,
    customer_address: req.body.address,
  };

  customers
    .create(customer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.customerr_name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  customers
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find customer",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  customers
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
        message: "Error retrieving Customer with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  if (req.body.customer_password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.customer_password)
      .digest("base64");
    req.body.customer_password = salt + "$" + hash;
  }

  customers
    .update(req.body, {
      where: { customer_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Customer was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  customers
    .destroy({
      where: { customer_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Customer was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id,
      });
    });
};
