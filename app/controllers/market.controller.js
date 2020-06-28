const db = require("../models");
const { markets, sellers, products } = require("../models");
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  const name = req.query.market_name;
  let condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  markets
    .findAll({ where: condition, include: products })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find Market",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  markets
    .findByPk(id, { include: products })
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
        message: "Error retrieving Market with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  markets
    .update(req.body, {
      where: { market_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Market was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Market with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Market with id=" + id,
      });
    });
};
