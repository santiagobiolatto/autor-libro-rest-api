const {Router} = require('express');
const router = Router();
const _ = require('lodash');

const authors = require('../authors.json');
const books = require('../books.json');

//Mostrar todos los autores
router.get('/authors', (req, res)=>{
    res.json(authors);
});

//Añadir un nuevo autor
router.post('/authors', (req, res)=>{
    const {name, lastname} = req.body;
    if(name && lastname){
        const newAuthor = { ...req.body };
        authors.push(newAuthor); 
        res.json({'added': 'ok'});
    }else {
        res.status(400).json({'statusCode':'Bad Request'});
    }
});

//Eliminar autor y sus libros
router.delete('/authors/:id', (req, res) =>{
    const id = req.params.id;
    _.remove(books, (book)=>{
        return book.authorid == id;
    });
    _.remove(authors, (author)=>{
        return author.id == id;
    });
    res.json({'deleted': "ok"});
});

//Modificar un autor
router.put('/authors/:id', (req, res)=>{
    const id = req.params.id
    const {name, lastname} = req.body;
    _.each(authors , (author)=>{
        if(author.id == id){
            author.name = name;
            author.lastname = lastname;
        }
        res.json({'Modified':'ok'});
    });
});


module.exports = router;