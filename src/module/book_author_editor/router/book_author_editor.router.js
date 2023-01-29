
const BookAuthorEditorUseCase = require('../usercase/book_author_editor.usecase');
const bookAuthorEditorRouter = require('express').Router();

bookAuthorEditorRouter.get('/book_author_editor', BookAuthorEditorUseCase.get)
bookAuthorEditorRouter.get('/book_author_editor/:id', BookAuthorEditorUseCase.getOne)
bookAuthorEditorRouter.post('/book_author_editor', BookAuthorEditorUseCase.insert)
bookAuthorEditorRouter.patch('/book_author_editor/:id', BookAuthorEditorUseCase.update)
bookAuthorEditorRouter.delete('/book_author_editor/:id', BookAuthorEditorUseCase.delete)

module.exports = bookAuthorEditorRouter;