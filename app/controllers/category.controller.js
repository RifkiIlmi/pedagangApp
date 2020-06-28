const { v4: uuidv4 } = require("uuid");
const db = require("../models");
const { categories, productCategory } = require("../models");
const Op = db.Sequelize.Op;

exports.addCategory = (req, res) => {
  // Validate request
  if (!req.body.category_name) {
    res.status(400).send({
      message: "Category Name can not be empty!",
    });
    return;
  }

  const category = {
    category_name: req.body.category_name,
  };

  categories
    .create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the Category.",
      });
    });
};

exports.findAll = (req, res) => {
  categories
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while find categories",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  categories
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
        message: "Error retrieving category with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  categories
    .update(req.body, {
      where: { category_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Category was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Category with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  categories
    .destroy({
      where: { category_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Category was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  categories
    .destroy({
      where: {},
      truncate: false,
    })
    .then((result) => {
      res.send({
        message: `${result} Category were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Category.",
      });
    });
};
