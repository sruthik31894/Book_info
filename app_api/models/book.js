const mongoose = require( 'mongoose' );

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewText: String,
    createdOn: {type: Date, default: Date.now}

})

const bookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: [String]},
    release_date: {type: String, required: true},
    author: {type: String, required: true},
    image: {type: String},
    desc: {type: String},
    rating: {type: Number, 'default': 0, min: 0, max: 5},
    reviews: [reviewSchema]
});

bookSchema
    .virtual('url')
    .get(function () {
        return '/api/book/' + this._id;
    });

mongoose.model('book',bookSchema, 'books');