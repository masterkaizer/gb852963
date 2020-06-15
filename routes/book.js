const express = require('express');
const router = express.Router();
const async = require('async');

const Book = require('../models/book');



// Register new user
router.get('/', async(req, res) => {
    try {
        let allBooks = await Book.find({});
        console.log(allBooks,"saved");
        res.status(200).json(allBooks);
    } catch(e){
        console.log(e);
        res.status(400).json('Error occurred');
    }
});


router.post('/',async(req,res)=>{
    try {
        let newBook = new Book({
            title : req.body.title,
            authors : req.body.authors,
            description : req.body.description,
            image : req.body.image,
            link : req.body.link
        })
        let savedBook = await newBook.save();
        return res.status(200).json('Book saved successfully');
    }
    catch(e){
        console.log(e);
        res.status(400).json('Error occurred');
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        await Book.deleteOne({ _id: req.params.id })
        res.status(200).json('Book deleted successfully.');
    } catch (err) {
        console.log(err);
        res.status(400).json('Something went wrong!!! Please try again.');
    }
})

module.exports = router;
