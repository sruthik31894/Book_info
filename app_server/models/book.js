const mongoose = require( 'mongoose' );
const bookschema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true, minlength: 3}
});

mongoose.model('book',bookschema);