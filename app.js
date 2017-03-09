let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Genre = require('./models/genre'),
    Book = require('./models/book');

app.use(bodyParser.json());

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
let db = mongoose.connection;

app.get('/', (req, res)=>{
    res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', (req, res)=>{
    Genre.getGenres((err, genres)=>{
        if (err){
            throw err;
        }
        res.json(genres);
    })
});

app.post('/api/genres', (req, res)=>{
    let genre = req.body;
    Genre.addGenre(genre, (err, genre)=>{
        if (err){
            throw err;
        }
        res.json(genre);
    })
});

app.put('/api/genres/:_id', (req, res)=>{
    let id = req.params._id,
        genre = req.body;
    Genre.updateGenre(id, genre, {}, (err, genre)=>{
        if (err){
            throw err;
        }
        res.json(genre);
    })
});

app.delete('/api/genres/:_id', (req, res)=>{
    let id = req.params._id;
    Genre.removeGenre(id, (err, genre)=>{
        if (err){
            throw err;
        }
        res.json(genre);
    })
});

app.get('/api/books', (req, res)=>{
    Book.getBooks((err, books)=>{
        if (err){
            throw err;
        }
        res.json(books);
    })
});

app.get('/api/books/:_id', (req, res)=>{
    Book.getBookById(req.params._id, (err, book)=>{
        if (err){
            throw err;
        }
        res.json(book);
    })
});

app.post('/api/books', (req, res)=>{
    let book = req.body;
    Book.addBook(book, (err, book)=>{
        if (err){
            throw err;
        }
        res.json(book);
    })
});

app.put('/api/books/:_id', (req, res)=>{
    let id = req.params._id,
        book = req.body;
    Book.updateBook(id, book, {}, (err, book)=>{
        if (err){
            throw err;
        }
        res.json(book);
    })
});

app.delete('/api/books/:_id', (req, res)=>{
    let id = req.params._id;
    Book.removeBook(id, (err, book)=>{
        if (err){
            throw err;
        }
        res.json(book);
    })
});

app.listen(3000);