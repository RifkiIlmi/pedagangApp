const { v4: uuidv4, v1: uuidv1 } = require("uuid");
const db = require("../models");
const {
  customers,
  orderProducts,
  carts,
  orders,
  drivers,
} = require("../models");

exports.order = (req, res) => {
  // Validate request
  if (!req.body.customer_id || !req.body.delivery_location) {
    res.status(400).send({
      message: "Some fields can not be empty!",
    });
    return;
  }

  const orderId = uuidv4();
  const orderProducId = uuidv4();

  const order = {
    order_id: req.body.order_id,
    delivery_location: req.body.delivery_location,
    order_status: "1",
    order_price: req.body.order_price,
    shipping_cost: req.body.shipping_cost,
    orderProducts: req.body.orderProducts,
    customerCustomerId: req.body.customer_id,
    driverDriverId: req.body.driver_id,
  };

  orders
    .create(order, {
      include: [{ model: orderProducts }],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Order.",
      });
    });
};

exports.driverOrder = (req, res) => {
  const driver_id = req.params.driver_id;

  drivers
    .findAll({
      where: { driver_id: driver_id },
      include: [
        {
          model: orders,
          include: [
            {
              model: orderProducts,
            },
          ],
        },
      ],
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
        message: "Error retrieving Driver's Orders with id=" + id,
      });
    });
};

exports.orderByStatus = (req, res) => {
  const id = req.query.id;
  const status = req.query.status;

  orders
    .findAll({
      where: { order_id: id, order_status: status },
      include: [
        {
          model: orderProducts,
        },
      ],
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
        message: "Error retrieving Order By Status with id=" + id,
      });
    });
};

exports.customerOrder = (req, res) => {
  const customer_id = req.params.customer_id;

  customers
    .findAll({
      where: { customer_id: customer_id },
      include: [
        {
          model: orders,
          include: [
            {
              model: orderProducts,
            },
          ],
        },
      ],
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
        message: "Error retrieving Customer's Orders with id=" + id,
      });
    });
};

exports.updateStatus = (req, res) => {
  const id = req.query.id;
  const status = req.query.status;

  orders
    .update(
      { order_status: status },
      {
        where: { order_id: id },
      }
    )
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Order Status was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order Status with id=" + id,
      });
    });
};
