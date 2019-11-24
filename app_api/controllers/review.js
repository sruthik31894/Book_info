var mongoose = require('mongoose');
var Book = mongoose.model('book');

const doSetAverageRating = (book) => {
    if (book.reviews && book.reviews.length > 0) {
        const count = book.reviews.length;
        const total = book.reviews.reduce((acc, {rating}) => {
            return acc + rating;
        }, 0);

        book.rating = parseInt(total / count, 10);
        book.save(err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Average rating updated to ${book.rating}`);
            }
        });
    }
};

const updateAverageRating = (bookId) => {
    Book.findById(bookId.toString())
        .select('rating reviews')
        .exec((err, book) => {
            if (!err) {
                doSetAverageRating(book);
            }
        });
};

const doAddReview = (req, res, book) => {

    if (!book) {
        res
            .status(404)

            .json({"message": "Book not found"});

    } else {

        const {author, rating, reviewText} = req.body;

        book.reviews.push({
            author,
            rating,
            reviewText
        });

        book.save((err, book) => {

            if (err) {

                res
                    .status(400)
                    .json(err);

            } else {

                updateAverageRating(book._id);
                const thisReview = book.reviews.slice(-1).pop();

                res
                    .status(201)
                    .json(thisReview);
            }

        });
    }
};

module.exports.createReview = (req, res) => {

    const bookid = req.params.bookid;
    if (bookid) {

        Book.findById(bookid).select('reviews')
            .exec((err, book) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    doAddReview(req, res, book);
                }
            });
    } else {

        res
            .status(404)
            .json({"message": "Book not found"});
    }
};


module.exports.readReview = (req, res) =>{

    Book.findById(req.params.bookid)
        .select('name reviews')
        .exec((err, book) => {
            if (!book) {
                return res
                    .status(404)
                    .json({
                        "message": "book not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }

            if (book.reviews && book.reviews.length > 0) {

                const review = book.reviews.id(req.params.reviewid);

                if (!review){
                    return res
                        .status(400)
                        .json({
                            "message": "review not found"
                        });
                }else {
                    response = {
                        book: {
                            name: book.name,
                            id: req.params.bookid
                        },
                        review
                    };
                    return res
                        .status(200)
                        .json(response);
                }

            } else {
                return res
                    .status(404)
                    .json({
                        "message": "No reviews found"
                    });
            }

        });


};





module.exports.updateReview = (req, res) =>{

    if (!req.params.bookid || !req.params.reviewid) {
        return res
            .status(404)
            .json({
                "message": "Not found, book id and review id are both required"
            });


    };

    Book.findById(req.params.bookid)
        .select('reviews')
        .exec((err, book) => {

            if (!book) {
                return res
                    .status(404)
                    .json({
                        "message": "Book not found"
                    });

            } else if (err) {

                return res
                    .status(400)
                    .json(err);

            }

            if (book.reviews && book.reviews.length > 0) {

                const thisReview = book.reviews.id(req.params.reviewid);
                thisReview.set(req.body);
                if (!thisReview) {

                    res
                        .status(404)
                        .json({
                            "message": "Review not found"
                        });

                } else {
                    console.log(req.body);
                    console.log(req.body);
                    console.log(req.body);

                    thisReview.book = req.body.book.name;
                    thisReview._id = req.body.book.id;
                    thisReview.author = req.body.review.author;
                    thisReview._id = req.body.review._id;
                    thisReview.rating = req.body.review.rating;
                    thisReview.reviewText = req.body.review.reviewText;

                    book.save((err, thisReview) => {

                        if (err) {

                            res
                                .status(404)
                                .json(err);

                        } else {
                            updateAverageRating(book._id);
                            res
                                .status(200)
                                .json(thisReview);

                        }

                        // console.log(err);
                    });
                }

            } else {

                res
                    .status(404)
                    .json({
                        "message": "No review to update"
                    });
            }


        });


};

module.exports.deleteReview = (req, res) =>{

    const {bookid, reviewid} = req.params;

    if (!bookid || !reviewid) {
        return res
            .status(404)
            .json({'message': 'Not found, book id and reviewid are both required'});
    }

    Book.findById(bookid)
        .select('reviews')
        .exec((err, book) => {

            if (!book) {

                return res
                    .status(404)
                    .json({'message': 'Book not found'});

            } else if (err) {

                return res
                    .status(400)
                    .json(err);

            }

            if (book.reviews && book.reviews.length > 0) {

                if (!book.reviews.id(reviewid)) {

                    return res
                        .status(404)
                        .json({'message': 'Review not found'});

                } else {

                    book.reviews.id(reviewid).remove();

                    book.save(err => {

                        if (err) {

                            return res
                                .status(404)
                                .json(err);

                        } else {

                            res
                                .status(204)
                                .json(null);

                        }
                    });

                }

            } else {

                res
                    .status(404)
                    .json({'message': 'No Review to delete'});

            }

        });

};
