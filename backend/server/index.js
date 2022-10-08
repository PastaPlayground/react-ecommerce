const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const login = require("../route/login");
const getItems = require("../route/get-items");
const getItem = require("../route/get-item");
const getStores = require("../route/get-stores");
const addCart = require("../route/add-to-cart");

// OWNER ROUTES
const addItem = require("../route/owner/add-item");
const removeItem = require("../route/owner/remove-item");
const updateItem = require("../route/owner/update-item");

const port = process.env.API_PORT || 4000;
const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Server starting on port: ${port}`));

login(app);
getItems(app);
getItem(app);
getStores(app);
addCart(app);
addItem(app);
removeItem(app);
updateItem(app);
