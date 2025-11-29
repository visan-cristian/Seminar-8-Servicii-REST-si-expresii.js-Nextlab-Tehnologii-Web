const express = require('express')
const cors = require('cors')
const Book = require('./exercitiul2Book')
const app = express()
const port = 3000


const bookRouter = express.Router()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', bookRouter)


let books = [new Book(1, "Dune", "sf", "Frank Herbert"),
new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
new Book(3, "Foundation", "sf", "Asimov")]

bookRouter.route('/books')
    .get((req, res) => {
        let filteredBooks = [];
        if (req.query.genre) {
            filteredBooks = books.filter(x => x.genre === req.query.genre)
        }
        else {
            filteredBooks = books;
        }
        res.json(filteredBooks);
    })

    .post((req, res) => {

    const { id, name, genre, author } = req.body;

    if (!id || !name || !genre || !author) {
        return res.status(400).json({
            error: "Toate campurile sunt obligatorii."
        });
    }

    if (isNaN(id)) {
        return res.status(400).json({
            error: "ID-ul trebuie sa fie un numar."
        });
    }

    if (name.trim() === "" || genre.trim() === "" || author.trim() === "") {
        return res.status(400).json({
            error: "Campurile name, genre și author nu pot fi goale."
        });
    }

    const exists = books.some(book => book.id == id);
    if (exists) {
        return res.status(400).json({
            error: "Exista deja o carte cu acest ID."
        });
    }

    let newBook = new Book(Number(id), name, genre, author);
    books.push(newBook);

    console.log(books);

    return res.status(201).json(newBook);
});

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.listen(port, () => {
    console.log(`Server running at:`);
    console.log(`Home: http://localhost:${port}`);
    console.log(`Toate cărțile: http://localhost:${port}/api/books`);
})