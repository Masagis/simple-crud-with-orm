const express = require("express")
const app = express()
const {Books} = require("./models")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// GET all Books
app.get('/books', (req, res) => {
    Books.findAll()
    .then(books =>{
        res.status(200).json(books)
    })
})

// GET Books by ID
app.get('/books/:id', (req, res) => {
    Books.findOne({
        where: {id: req.params.id}
    })
    .then(books =>{
        res.status(200).json(books)
    })
})

// POST an Books
app.post('/books', (req, res)=>{
    Books.create({
        isbn: req.body.isbn,
        judul: req.body.judul,
        sinopsis: req.body.sinopsis,
        penulis: req.body.penulis,
        genre: req.body.genre
    })
    .then(books =>{
        res.status(201).json(books)
    }) .catch(err=>{
        res.status(422).json("Can't create new book")
    })
})

// PUT an Books
app.put('/books/:id', (req, res)=>{
    Books.update({
        isbn: req.body.isbn,
        judul: req.body.judul,
        sinopsis: req.body.sinopsis,
        penulis: req.body.penulis,
        genre: req.body.genre
    }),{
        where: {id :req.params.id}
    }
    .then(books =>{
        res.status(201).json(books)
    }) .catch(err=>{
        res.status(422).json("Can't update new book")
    })
})

app.listen(3000, () => console.log("Server ready!"))