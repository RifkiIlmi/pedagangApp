const { v4: uuidv4, v1: uuidv1 } = require("uuid");
const db = require("../models");
const { products, productCategories, categories } = require("../models");

exports.addProduct = (req, res) => {
  // Validate request
  if (
    !req.body.product_name ||
    !req.body.product_price ||
    !req.body.category_id ||
    !req.body.product_stock
  ) {
    res.status(400).send({
      message: "fields can not be empty!",
    });
    return;
  }

  const productId = uuidv4();
  const category_id = req.body.category_id;

  const product = {
    product_id: productId,
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
    product_stock: req.body.product_stock,
    product_discount: req.body.product_discount,
    product_photo: req.body.product_photo,
    product_category: [
      {
        pcategory_id: uuidv1(),
        product_id: productId,
        categoryCategoryId: category_id,
      },
    ],
    marketMarketId: req.body.market_id,
  };

  products
    .create(product, {
      include: [{ model: db.productCategories, as: "product_category" }],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

exports.findAll = (req, res) => {
  products
    .findAll({
      include: [
        {
          as: "product_category",
          model: db.productCategories,
          include: [
            {
              model: db.categories,
            },
          ],
        },
      ],
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while find Product Category",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  products
    .findByPk(id, {
      include: [
        {
          model: db.productCategories,
          as: "product_category",
          include: [
            {
              model: db.categories,
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
        message: "Error retrieving Product with id=" + id,
      });
    });
};

exports.productByCategory = (req, res) => {
  const category_id = req.params.category_id;

  categories
    .findAll({
      where: { category_id: category_id },
      include: [
        {
          model: db.productCategories,
          as: "category_product",
          include: [
            {
              model: db.products,
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
        message: "Error retrieving Product By Category with id=" + id,
      });
    });
};

exports.addCategory = (req, res) => {
  // Validate request
  if (!req.body.product_id || !req.body.category_id) {
    res.status(400).send({
      message: "fields can not be empty!",
    });
    return;
  }

  const productId = req.body.product_id;
  const category_id = req.body.category_id;

  let category = {
    pcategory_id: uuidv1(),
    productProductId: productId,
    categoryCategoryId: category_id,
  };

  productCategories
    .create(category)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  products
    .update(req.body, {
      where: { product_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Product was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating product with id=" + id,
      });
    });
};

exports.deleteCategory = (req, res) => {
  const id = req.params.id;

  productCategories
    .destroy({
      where: { pcategory_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "product category was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete product category with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete product category with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  products
    .destroy({
      where: { product_id: id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "product was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete product with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete product with id=" + id,
      });
    });
};
