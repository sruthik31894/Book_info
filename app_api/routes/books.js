const express = require('express');
const router = express.Router();
const ctrlBook = require('../controllers/book');
const ctrlReviews = require('../controllers/review');
const ctrlUpload = require('../controllers/upload');

router
    .route('/books')
    .get(ctrlBook.getBooks)
    .post(ctrlBook.createBook);

router
    .route('/books/:bookid')
    .get(ctrlBook.getSingleBook)
    .put(ctrlBook.updateBook)
    .delete(ctrlBook.deleteBook);

router
    .route('/books/:bookid/reviews')
    .post(ctrlReviews.createReview);

router
    .route('/books/:bookid/reviews/:reviewid')
    .get(ctrlReviews.readReview)
    .put(ctrlReviews.updateReview)
    .delete(ctrlReviews.deleteReview);

router.post("/upload", ctrlUpload.single('image'), function (req, res) {
    res.type("application/json");
    res.send({
        result: true,
        originalname: req.file.originalname,
        //filename: req.file.filename
    });
});

module.exports = router;