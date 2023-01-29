
const EditorUseCase = require('../usercase/editor.usecase');
const editorRouter = require('express').Router();

editorRouter.get('/editor', EditorUseCase.get)
editorRouter.get('/editor/:id', EditorUseCase.getOne)
editorRouter.post('/editor', EditorUseCase.insert)
editorRouter.patch('/editor/:id', EditorUseCase.update)
editorRouter.delete('/editor/:id', EditorUseCase.delete)

module.exports = editorRouter;