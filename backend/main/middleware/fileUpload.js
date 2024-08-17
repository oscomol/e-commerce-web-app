const multer = require('multer');

function fileUpload(path) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          // Set the destination folder for uploaded files
          cb(null, path);
        },
        filename: function (req, file, cb) {
          // Set the file name for the uploaded file
          cb(null, file.originalname);
        }
      });
      const upload = multer({ storage: storage });

      return upload;
}

module.exports = fileUpload;
  
  
  