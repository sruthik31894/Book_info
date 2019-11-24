const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, __dirname + '/../routes/upload');
    },
    filename: function (request, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;