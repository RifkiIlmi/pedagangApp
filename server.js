require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Models
const db = require("./app/models");

const app = express();

let whitelist = ["http://localhost:8081"];

let whiteList = ["http://localhost:8081"];
let corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Sync database
db.sequelize.sync();

// Routes
require("./app/routes/auth.route")(app);
require("./app/routes/seller.route")(app);
require("./app/routes/driver.route")(app);
require("./app/routes/customer.route")(app);
require("./app/routes/market.route")(app);
require("./app/routes/category.route")(app);
require("./app/routes/product.route")(app);
require("./app/routes/pcomment.route")(app);
require("./app/routes/rating.route")(app);
require("./app/routes/cart.route")(app);
require("./app/routes/order.route")(app);

// simple route
app.get("/api", (req, res) => {
  res.json({
    success: 1,
    message: "Welcome GEGEd REST API.",
  });
});

// set port, listen for requests
const PORT = process.env.PORT || process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
