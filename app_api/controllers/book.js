var mongoose = require('mongoose');
var Book = mongoose.model('book');

module.exports.getBooks = function(req, res) {
    Book.find().exec(function(err, bookdata) {
        if(err) {
            res.status(404).json(err);
            return;
        }
        res.status(200).json(bookdata);
    });
};

module.exports.createBook = function(req, res){
    Book.create({
        name: req.body.name,
        type: req.body.type.split(","),
        release_date: req.body.release_string,
        author: req.body.author,
        image: req.body.image,
        desc: req.body.desc,
        rating: req.body.rating,
        reviews: req.body.reviews
    }, (err, bookdata) => {
        if(err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(bookdata);
        }
    });
};

module.exports.getSingleBook = function (req, res) {
    Book.findById(req.params.bookid)
        .exec((err, book) => {
            if (!book) {
                return res
                    .status(404)
                    .json({
                        "message": "book not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(book);
        });
};

module.exports.updateBook = function (req, res) {
    if(!req.params.bookid) {
        res.status(404).json({"message": "Not found, bookid is required"});
        return;
    }
    Book.findById(req.params.bookid)
        .exec((err, bookdata) => {
            if(!bookdata) {
                res.json(404).status({"message": "bookid not found"});
                return;
            } else if(err) {
                res.status(400).json(err);
                return;
            }
            //bookdata.name = req.body.name;
            bookdata.type = req.body.type.split(",");
            //bookdata.release_date = req.body.release_date;
            //bookdata.author = req.body.author;
            bookdata.image = req.body.image;
            bookdata.desc = req.body.desc;
            bookdata.rating = req.body.rating;
            //bookdata.reviews = req.body.reviews;
            bookdata.save((err, bookdata) => {
                if(err) {
                    res.status(404).json(err);
                } else {
                    res.status(201).json(bookdata);
                }
            });
        });
};

module.exports.deleteBook = function (req, res) {
    const bookid = req.params.bookid;

    if(bookid) {
        Book.findByIdAndRemove(bookid)
            .exec((err, bookdata) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(204).json(null);
            }
        });
    } else {
        res.status(404).json({"message" : "No bookid"});
    }
};