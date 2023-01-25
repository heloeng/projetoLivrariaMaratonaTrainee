const express = require('express');
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./banco.sqlite');
const bookModuleRouter = require('./module/book/router/book.router')
const authorRouter = require('./module/author/router/author.router');
const editorRouter = require('./module/editor/router/editor.router');
const bookAuthorEditorRouter = require('./module/book_author_editor/router/book_author_editor.router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.serialize(() => {
  db.run(`create table if not exists book (
    id integer primary key AUTOINCREMENT, title text not null, release_date text not null
  );`);

  db.run(`create table if not exists author (
    id integer primary key AUTOINCREMENT, fullname text not NULL
   );`);

  db.run(`create table if not exists editor (
     id integer primary key AUTOINCREMENT, name text not NULL
    );`);


  db.run(`create table if not exists book_author_editor  (
      id integer primary key AUTOINCREMENT,
      idbook integer not null,
      idauthor integer not null,
      ideditor integer not null,
      foreign key (idbook) references book(id),
      foreign key (idauthor) references author(id),
      foreign key (ideditor) references editor(id)
    );");`);
}
)



app.use(bookModuleRouter);
app.use(authorRouter);
app.use(editorRouter);
app.use(bookAuthorEditorRouter);


//middleware de erro  vem depois de todas as rotas
//para capturar um erro não tratado nas outras rotas
//passar os parâmetros: err, req, res, next
app.use((err, req, res, next) => {
  if(err && err.statusCode ==400){
return res.status(400).json({message: 'Formatação de JSON incorreta.'})
  }
 
})

app.listen(3000, () => {
  console.log('http://localhost');
})