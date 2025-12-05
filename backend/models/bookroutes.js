const express = require('express');
const router = express.Router();
const ctrl = require('../controller/bookController'); // your current require
//console.log('DEBUG ctrl:', ctrl); // your controller

router.post('/', ctrl.createBooks);
router.get('/', ctrl.getBooks);
router.get('/:id', ctrl.getBooksById);
router.get('/search/:title', ctrl.getBooksBytitle);
router.delete('/clear', ctrl.clearBooks);
router.delete('/:id', ctrl.deleteBooksById);
router.put('/:id', ctrl.Updaterow);
router.patch('/:id', ctrl.Updatepartialrow);


module.exports = router;