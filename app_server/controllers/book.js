const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

const _renderHomepage = function (req, res, responseBody) {
    res.render('booklist', {
        books: responseBody
    });
};

module.exports.booklist = function (req, res) {
    const path = '/api/books';
    const requestOptions = {
        url : apiOptions.server + path,
        method : 'GET',
        json : {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderHomepage(req, res, body);
        }
    );
};

const _renderDetailPage = function (req, res, responseBody) {
    res.render('book-info', {
        currentBook: responseBody
    });
};

module.exports.bookInfo = function (req, res) {
    const path = `/api/books/${req.params.bookid}`;
    const requestOptions = {
        url : apiOptions.server + path,
        method : 'GET',
        json : {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            _renderDetailPage(req, res, body);
        }
    );
};

const _renderUpdatePage = function (req, res) {
    res.render('update-book', {
        title: "Update Book"
    });
};

module.exports.renewBook = function(req, res) {
    _renderUpdatePage(req, res);
}

module.exports.doRenewBook = function (req, res) {
    const path = `/api/books/${req.params.bookid}`;
    const putdata = {
        name: req.body.name,
        type: req.body.type,
        release_date: req.body.release_date,
        author: req.body.author,
        image: req.body.image,
        desc: req.body.desc,
        rating: req.body.rating,
        reviews: req.body.reviews
    };
    const requestOptions = {
        url : apiOptions.server + path,
        method : 'PUT',
        json : putdata
    };
    request(
        requestOptions,
        (err, response, body) => {
            if(response.statusCode === 201) {
                res.redirect('/list');
            }
        }
    );
};

module.exports.removeBook = function (req, res) {
    const path = `/api/books/${req.params.bookid}`;
    const requestOptions = {
        url : apiOptions.server + path,
        method : 'DELETE',
        json : {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            if(response.statusCode === 204) {
                res.redirect('/list');
            }
        }
    );
};

const _renderCreatePage = function (req, res) {
    res.render('create-new-book', {
        title: "Create New Book"
    });
};

module.exports.addNewBook = function(req, res) {
    _renderCreatePage(req, res);
}

module.exports.doAddNewBook = function(req, res) {
    const path = '/api/books';
    const postdata = {
        name: req.body.name,
        type: req.body.type,
        release_date: req.body.release_date,
        author: req.body.author,
        image: req.body.image,
        desc: req.body.desc,
        rating: req.body.rating,
        reviews: req.body.reviews
    };
    const requestOptions = {
        url: apiOptions.server+path,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions,
        (err, response, body) => {
            if(response.statusCode === 201) {
                res.redirect('/list');
            }
        }
    );
};
