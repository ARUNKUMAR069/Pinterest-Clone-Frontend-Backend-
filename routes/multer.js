const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads/') //Destination folder for uploads
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4();  //Unique filename for the uploaded file
        cb(null, uniqueFilename + path.extname(file.originalname)); //Filename for the uploaded file
    }
});

const upload = multer({ storage: storage });

module.exports = upload; //Exporting the multer middleware