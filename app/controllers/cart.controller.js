const { v4: uuidv4, v1: uuidv1 } = require("uuid");
const db = require("../models");
const { customers, products, carts } = require("../models");

exports.addProductToCart = (req, res) => {
  // Validate request
  if (!req.body.quantity) {
    res.status(400).send({
      message: "Quantity can not be empty!",
    });
    return;
  }

  const cartId = uuidv4();

  const cart = {
    cart_id: cartId,
    quantity: req.body.quantity,
    productProductId: req.body.product_id,
    customerCustomerId: req.body.customer_id,
  };

  carts
    .create(cart, { include: [products] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while add product to Cart.",
      });
    });
};

exports.cartByCustomer = (req, res) => {
  const customer_id = req.params.customer_id;

  customers
    .findAll({
      where: { customer_id: customer_id },
      include: [carts],
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
        message: "Error retrieving Customer Carts with id=" + id,
      });
    });
};

exports.addQuantity = (req, res) => {
  const id = req.params.id;

  const add = req.body.quantity;

  carts
    .increment(["quantity"], {
      by: add,
      where: { cart_id: id },
    })
    .then((result) => {
      if (result) {
        res.send({
          message: "Quantity Product in Cart was Added successfully",
        });
      } else {
        res.send({
          message: `Cannot Add Quantity Product in Cart with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error Add Quantity with id=" + id,
      });
    });
};

exports.subQuantity = (req, res) => {
  const id = req.params.id;

  const add = req.body.quantity;

  carts
    .decrement(["quantity"], {
      by: add,
      where: { cart_id: id },
    })
    .then((result) => {
      if (result) {
        res.send({
          message: "Quantity Product in Cart was Subtract successfully",
        });
      } else {
        res.send({
          message: `Cannot Subtract Quantity Product in Cart with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error Subtract Quantity with id=" + id,
      });
    });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  carts
    .destroy({
      where: { cart_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Product in cart was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Product in cart with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product in cart with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  const customer_id = req.query.customer_id;

  carts
    .destroy({
      where: { customer_id: customer_id },
      truncate: false,
    })
    .then((result) => {
      if (result == 0) {
        res.send({
          message: "No Data Deleted",
        });
      }
      res.send({
        message: `${result} Customer's cart were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Customer's cart.",
      });
    });
};
