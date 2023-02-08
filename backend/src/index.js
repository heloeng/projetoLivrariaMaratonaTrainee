const express = require('express');
const sqlite = require('sqlite3').verbose();
const cors = require('cors');
const db = new sqlite.Database('./banco.sqlite');
const bookModuleRouter = require('./module/book/router/book.router');
const authorRouter = require('./module/author/router/author.router');
const bookAuthorRouter = require('./module/book_author/router/book_author.router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


db.serialize(() => {
  db.run(`create table if not exists book (
    id integer primary key AUTOINCREMENT, 
    title text not null, 
    release_date text not null,
    publisher text not null
  );`);

  db.run(`create table if not exists author (
    id integer primary key AUTOINCREMENT, 
    fullname text not NULL
   );`);

  db.run(`create table if not exists book_author  (
      id integer primary key AUTOINCREMENT,
      idbook integer not null,
      idauthor integer not null,
      foreign key (idbook) references book(id),
      foreign key (idauthor) references author(id)
    );");`);
})

app.use(bookModuleRouter);
app.use(authorRouter);
app.use(bookAuthorRouter)

app.use((err, req, res, next) => {
  console.log(`Erro-----------------`)
  console.log(`Erro-----------------`)
  console.log(`Erro-----------------`)
  console.log(err);
  console.log(`Erro-----------------`)
  console.log(`Erro-----------------`)
  console.log(`Erro-----------------`)
  
  if(err && err.statusCode == 400){
    return res.status(400).json({message: 'Formatação de JSON incorreta.'})
  }
})

app.listen(3000, () => {
  console.log('http://localhost');
})