const BookAuthorUseCase = require('../usecase/book_author.usecase');

const bookAuthorRouter = require('express').Router();

bookAuthorRouter.get('/book_author', BookAuthorUseCase.get);
bookAuthorRouter.get('/book_author/:id', BookAuthorUseCase.getOne);
bookAuthorRouter.post('/book_author', BookAuthorUseCase.insert);
bookAuthorRouter.patch('/book_author/:id', BookAuthorUseCase.update);
bookAuthorRouter.delete('/book_author/:id', BookAuthorUseCase.delete);

module.exports = bookAuthorRouter