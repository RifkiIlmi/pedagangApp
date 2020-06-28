const { v4: uuidv4, v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const db = require("../models");
const { customers, product_comments, products } = require("../models");
const Seller = db.sellers;
const Op = db.Sequelize.Op;

exports.addComment = (req, res) => {
  // Validate request
  if (!req.body.message) {
    res.status(400).send({
      message: "Message can not be empty!",
    });
    return;
  }

  const pcommentId = uuidv4();

  const pcomment = {
    pcomment_id: pcommentId,
    pcomment_message: req.body.message,
    productProductId: req.body.product_id,
    customerCustomerId: req.body.customer_id,
  };

  product_comments
    .create(pcomment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment.",
      });
    });
};

exports.commentByCustomer = (req, res) => {
  const customer_id = req.params.customer_id;

  customers
    .findAll({
      where: { customer_id: customer_id },
      include: [product_comments],
    })
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
        message: "Error retrieving Comment with id=" + id,
      });
    });
};

exports.commentByProduct = (req, res) => {
  const product_id = req.params.product_id;

  products
    .findAll({
      where: { product_id: product_id },
      include: [product_comments],
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured retrieving Comment",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  product_comments
    .update(req.body, {
      where: { pcomment_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Comment was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  product_comments
    .destroy({
      where: { pcomment_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Comment was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Comment with id=" + id,
      });
    });
};
