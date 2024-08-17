const create = require("./common/create");
const getAll = require("./common/getAll");
const update = require("./common/update");
const deleteQuery = require("./common/delete");

const dbconn = require("../config/dbcon");

const fileUpload = require("../middleware/fileUpload");

const fs = require('fs');

const getProducts = async (req, res) => {
  const sqlQuery = "SELECT * FROM tbl_products";
  const errMSG = "Error getting products data";
  const successMSG = "Success getting products data";

  await getAll(res, sqlQuery, errMSG, successMSG)
}

const saveProductData = async (req, res, filename) => {
  const { brand, description, originalPrice, storePrice, discountedPrice, stock, category } = req.body;

  const errMSG = "Error creating product";
  const successMSG = "product saved succesfully";
  let sqlQuery = "INSERT INTO tbl_products (brand, description, origPrice, storePrice, stock, category, filename) VALUE(?,?,?,?,?,?,?)";
  let data = [brand, description, originalPrice, storePrice, stock, category, filename];

  if (discountedPrice) {
    sqlQuery = "INSERT INTO tbl_products (brand, description, origPrice, storePrice, discountedPrice, stock, category, filename) VALUE(?,?,?,?,?,?,?,?)";
    data = [brand, description, originalPrice, storePrice, discountedPrice, stock, category, filename];
  }

  await create(res, errMSG, successMSG, sqlQuery, data);
}

const createProducts = async (req, res) => {
  fileUpload('public/product/').single('file')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded.' });
    }

    // Access the uploaded file through req.file
    const uploadedFile = req.file;

    // Specify the destination path to save the file
    const destinationPath = 'public/product/' + uploadedFile.filename;

    // Move the uploaded file to the destination path
    fs.rename(uploadedFile.path, destinationPath, async function (error) {
      if (error) {
        return res.status(500).json({ msg: 'File upload failed.' });
      }
      await saveProductData(req, res, uploadedFile.filename)
    });
  });
}

const updateProductInfo = async (req, res) => {
  const { brand, description, origPrice, storePrice, discountedPrice, stock, category, id } = req.body;

  const errMSG = "Error updating Product";
  const successMSG = "Product updated succesfully";
  const sqlQuery = `UPDATE tbl_products SET brand=?, description=?, origPrice=?, storePrice=?, stock=?, category=?, discountedPrice=? WHERE id=?`;

  await update(res, sqlQuery, errMSG, successMSG, [brand, description, origPrice, storePrice, stock, category, discountedPrice, id]);
}

const updateProductPhoto = async (req, res) => {
  fileUpload('public/product/').single('file')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded.' });
    }

    // Access the uploaded file through req.file
    const uploadedFile = req.file;

    // Specify the destination path to save the file
    const destinationPath = 'public/product/' + uploadedFile.filename;

    // Move the uploaded file to the destination path
    fs.rename(uploadedFile.path, destinationPath, async function (error) {
      if (error) {
        return res.status(500).json({ msg: 'File upload failed.' });
      }
      const { brand, description, origPrice, storePrice, discountedPrice, stock, id, filename, category } = req.body;

      const filePath = `public/product/${filename}`;

      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, async (err) => {
          if (err) {
            res.status(404).json({ msg: 'Server error while updating file' });
          } else {

            const errMSG = "Error updating Product";
            const successMSG = "Product updated succesfully";
            const sqlQuery = `UPDATE tbl_products SET brand=?, description=?, origPrice=?, storePrice=?, stock=?, filename=?, category=?, discountedPrice=? WHERE id=?`;

            await update(res, sqlQuery, errMSG, successMSG, [brand, description, origPrice, storePrice, stock, uploadedFile?.filename, category, discountedPrice, id]);

          }
        });
      } else {
        res.status(404).json({ msg: 'File not found' });
      }

    });
  });
}
 
const deleteProducts = async (req, res) => {
  const { filename, id } = req.body;

  if (!filename || !id) return res.status(400).json({ msg: "Some fields are missing" });

  const filePath = `public/product/${filename}`;

  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, async (err) => {
      if (err) {
        res.status(404).json({ msg: 'Server error while deleting file' });
      } else {
        const errMSG = "Error deleting product";
        const successMSG = "Product deleted succesfully";
        const sqlQuery = "DELETE FROM tbl_products WHERE id=?";
        const data = [id];

        await deleteQuery(res, errMSG, successMSG, sqlQuery, data);
      }
    });
  } else {
    res.status(404).json({ msg: 'File not found' });
  }
}

const getProductByID = async (req, res) => {
  const { id } = req.params;

}

const getBestSelling = async (req, res) => {
  const getOrderSQL = "SELECT * FROM tbl_productordered";
  dbconn.query(getOrderSQL, (err, result) => {
    if (err) console.log(err);
    if (result?.length) {
      let products = [];
      result.forEach(data => {
        const isExist = products.find(list => list.productID === data.productID);
        if (isExist) {
          const filteredData = products.filter(list => list.productID !== isExist.productID);
          products = [...filteredData, { ...isExist, quantity: isExist.quantity + data.quantity }];
        } else {
          products.push(data);
        }
      })
      products = products.sort((p1, p2) => p2.quantity - p1.quantity)
      if(products?.length > 15){
        res.status(200).json(products.slice(0, 15).map(list => list.productID))
      }else{
        res.status(200).json(products.map(list => list.productID))
      }
    } else {
      // do something
    }
  })
}

const checkQuantity = async (req, res) => {
  const {id} = req.body;
  if(!id) return res.status(400).json({ msg: "Some fields are missing" });

  const sqlQuery = "SELECT tbl_products.stock FROM tbl_products WHERE id = ?";
  dbconn.query(sqlQuery, [id], (err, result) => {
    if(err) {
      console.log(err)
      return;
    }
    res.status(200).json(result[0])
  })
}

module.exports = {
  getProducts,
  createProducts,
  updateProductPhoto,
  updateProductInfo,
  deleteProducts,
  getProductByID,
  getBestSelling,
  checkQuantity
}