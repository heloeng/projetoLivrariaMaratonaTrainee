const express = require('express');

const BookUseCase = require('../usecase/book.usecase');

const bookRouter = express.Router();

bookRouter.get('/book', BookUseCase.getAll)
bookRouter.get('/book/:id', BookUseCase.getOne)
bookRouter.post('/book/:id', BookUseCase.insert)
bookRouter.patch('/book/:id', BookUseCase.update)
bookRouter.delete('/book/:id', BookUseCase.delete)

module.exports = bookRouter