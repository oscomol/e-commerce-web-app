const express = require("express");
const router = express.Router();

const wishlist = require("../controllers/wishlistController");

const verifyJwt = require('../middleware/verifyJWT');

// router.use(verifyJwt);

router.route("/:userID")
    .get(wishlist.getWishlist)

router.route("/")
    .post(wishlist.createWishlist)
    .put(wishlist.updateWishlist)
    .delete(wishlist.deleteWishlist)

module.exports = router;