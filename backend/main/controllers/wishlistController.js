const create = require("./common/create");
const update = require("./common/update");
const deleteQuery = require("./common/delete");
const getByID = require("./common/getByID");

const dbconn = require("../config/dbcon")

const getWishlist = async (req, res) => {
    const { userID } = req.params;

    if (!userID) return res.status(400).json({ msg: "Some fields are missing" });

    const sqlQuery = "SELECT * FROM tbl_wishlist WHERE userID = ?";
    const errMSG = "Error getting wishlist data";
    const successMSG = "Success getting wishlist data";

    await getByID(res, sqlQuery, errMSG, successMSG, [userID]);

}

const createWishlist = async (req, res) => {
    const { userID, productID, quantity } = req.body;

    if (!userID || !productID || !quantity) return res.status(400).json({ msg: "Some fields are missing" });

    const errMSG = "Error saving wishlist";
    const successMSG = "Wishlist saved succesfully";
    const sqlQuery = "INSERT INTO tbl_wishlist (userID, productID, quantity) VALUE(?,?,?)";
    const data = [userID, productID, quantity];

    await create(res, errMSG, successMSG, sqlQuery, data);

}

const updateWishlist = async (req, res) => {
    const { quantity, id } = req.body;

    if (!id) return res.status(400).json({ msg: "Some fields are missing" })

    const errMSG = "Error updating wishlist";
    const successMSG = "Wishlist updated succesfully";
    const sqlQuery = `UPDATE tbl_wishlist SET quantity=? WHERE id=?`;

    await update(res, sqlQuery, errMSG, successMSG, [quantity, id]);

}

const deleteWishlist = async (req, res) => {
    const { id } = req.body;

    if (!Array.isArray(id) || id.length === 0) {
        return res.status(400).json({ msg: "Invalid or empty ID array" });
    }

    const errMSG = "Error deleting Wishlist";
    const successMSG = "Wishlist deleted successfully";
    const sqlQuery = "DELETE FROM tbl_wishlist WHERE id=?";
    
    try {
        // Array to store promises of deletion queries
        const deletionPromises = id.map(wishlistId => {
            return new Promise((resolve, reject) => {
                dbconn.query(sqlQuery, wishlistId, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });

        // Wait for all deletion queries to complete
        await Promise.all(deletionPromises);

        // Respond after all deletions are completed
        return res.status(200).json({ msg: "All wishlists deleted successfully" });
    } catch (error) {
        console.error("Error deleting wishlists:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = {
    createWishlist,
    updateWishlist,
    deleteWishlist,
    getWishlist
}