// get modules
global.config = require("./config.json");
const express = require("express");
const cors = require("cors");
const productsController = require("./controllers/products-controller");

const server = express();

// middleware
server.use(cors());
server.use(express.json());
server.use("/api/products", productsController);

// run the server
server.listen(3001, () => console.log("Listening..."));