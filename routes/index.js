const {Router} = require('express');
const router = Router();
const authors = require('../routes/authors.route');
const books = require('../routes/books.route');

router.use('/api', authors);
router.use('/api', books);

module.exports = router;