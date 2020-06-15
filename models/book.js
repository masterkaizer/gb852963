const mongoose = require('mongoose');

const config = require('../config/database')

const BookSchema = mongoose.Schema({ 
    title: {
        type: String,
        required: true,
        // text: true
    },
    authors: [{
        type: String,
        required: true,
    }],
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

BookSchema.plugin(require('mongoose-timestamp'));
BookSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});
const Book = module.exports = mongoose.model('Book', BookSchema);


