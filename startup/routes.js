const book = require('../routes/book');

module.exports = function (app) {
    app.use('/api/books', book);
}
