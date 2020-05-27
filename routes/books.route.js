const {Router} = require('express');
const router = Router();
const _ = require('lodash');

const books = require('../books.json');
const authors = require('../authors.json');

//Mostrar todos los libros con sus autores
router.get('/books', (req, res)=>{
    let resultado;
    books.forEach((book) =>{
        authors.forEach((author)=>{
            if(book.authorid == author.id){
                book.authorid = author;
            }
        })
    });
    res.json(books);
});


//Añadir un nuevo libro
router.post('/books', (req, res)=>{
    const {name, authorid} = req.body;
    if(name && authorid){
        const newBook = { ...req.body };
        books.push(newBook); 
        res.json({'added': 'ok'});
    }else {
        res.status(400).json({'statusCode':'Bad Request'});
    }
});

//Eliminar autor
router.delete('/books/:id', (req, res) =>{
    const id = req.params.id;
    _.remove(books, (book)=>{
        return book.id == id;
    });
    res.json({'deleted': "ok"});
});

//Modificar un autor
router.put('/books/:id', (req, res)=>{
    const id = req.params.id
    const {name, authorid} = req.body;
    _.each(books, (book)=>{
        if(book.id == id){
            book.name = name;
            book.authorid = authorid;
        }
        res.json({'Modified':'ok'});
    });
});


module.exports = router;