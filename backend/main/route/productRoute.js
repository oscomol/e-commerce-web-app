const express = require("express");
const router = express.Router();

const product = require("../controllers/productController")

const verifyJwt = require('../middleware/verifyJWT');
const { route } = require("./usersRoute");

// router.use(verifyJwt);

router.route("/topProduct")
    .get(product.getBestSelling)

router.route("/quantity")
    .post(product.checkQuantity)

router.route("/")
    .get(product.getProducts)
    .post(product.createProducts)
    .put(product.updateProductInfo)
    .delete(product.deleteProducts)

router.route("/productPhoto")
    .put(product.updateProductPhoto)

router.route("/byID/:id")
    .get(product.getProductByID)

module.exports = router;