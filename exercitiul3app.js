const express = require('express')
const cors = require('cors');
const Book = require('./exercitiul3Book')
const app = express()
const port = 3000

const bookRouter = express.Router()

app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', bookRouter)

let books = [
    new Book(1, "Dune", "sf", "Frank Herbert"),
    new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
    new Book(3, "Foundation", "sf", "Asimov")
]

bookRouter.route('/books')
    .get((req, res) => {
        let filteredBooks = [];
        if (req.query.genre) {
            filteredBooks = books.filter(x => x.genre === req.query.genre)
        } else {
            filteredBooks = books;
        }
        res.json(filteredBooks);
    })
    .post((req, res) => {
        const { id, name, genre, author } = req.body;
        const newBook = new Book(id, name, genre, author);
        books.push(newBook);
        console.log(books);
        return res.json(newBook);
    })

bookRouter.route('/books/:bookId')
    .put((req, res) => {
        const bookId = Number(req.params.bookId);
        const bookModif = books.find(e => e.id === bookId);
        if (!bookModif) {
            return res.status(404).json({ error: "Cartea nu a putut fi gasita." });
        }
        if (req.body.name) bookModif.name = req.body.name;
        if (req.body.genre) bookModif.genre = req.body.genre;
        if (req.body.author) bookModif.author = req.body.author;
        return res.json(bookModif);
    })
    .delete((req, res) => {
        const bookId = Number(req.params.bookId);
        const index = books.findIndex(book => book.id === bookId);
        if (index === -1) {
            return res.status(404).json({ error: "Cartea nu a putut fi gasita." });
        }
        const deletedBook = books.splice(index, 1)[0];
        return res.json({
            message: "Cartea a fost stearsa cu succes.",
            deletedBook: deletedBook
        });
    })

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.listen(port, () => {
    console.log(`Server running at:`);
    console.log(`Home: http://localhost:${port}`);
    console.log(`Toate cărțile: http://localhost:${port}/api/books`);
})
