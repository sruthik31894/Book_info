var express = require('express');
var router = express.Router();
const ctrlBook = require('../controllers/book');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Welcome to Book Info!');
});

router.get('/list', ctrlBook.booklist);

router.route('/books/:bookid')
    .get(ctrlBook.bookInfo)
    .put(ctrlBook.doRenewBook)
    .delete(ctrlBook.removeBook);

router.route('/new')
    .get(ctrlBook.addNewBook)
    .post(ctrlBook.doAddNewBook);

module.exports = router;
