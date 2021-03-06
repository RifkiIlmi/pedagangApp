const { v4: uuidv4, v1: uuidv1 } = require("uuid");
const db = require("../models");
const { customers, products, ratings } = require("../models");

exports.giveRating = (req, res) => {
  // Validate request
  if (!req.body.value) {
    res.status(400).send({
      message: "Rate Value can not be empty!",
    });
    return;
  }

  const ratingId = uuidv4();

  const rating = {
    rating_id: ratingId,
    value: req.body.value,
    productProductId: req.body.product_id,
    customerCustomerId: req.body.customer_id,
  };

  ratings
    .create(rating)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while giving a Rating.",
      });
    });
};

exports.ratingByCustomer = (req, res) => {
  const customer_id = req.params.customer_id;

  customers
    .findAll({
      where: { customer_id: customer_id },
      include: [ratings],
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
        message: "Error retrieving Customer Rating with id=" + id,
      });
    });
};

exports.ratingByProduct = (req, res) => {
  const product_id = req.params.product_id;

  products
    .findAll({
      where: { product_id: product_id },
      include: [ratings],
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured retrieving Product Rating",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ratings
    .update(req.body, {
      where: { rating_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Rating was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Rating with id=${id}.`,
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

  ratings
    .destroy({
      where: { rating_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Rating was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Rating with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Rating with id=" + id,
      });
    });
};
