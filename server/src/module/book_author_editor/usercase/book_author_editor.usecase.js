var sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./banco.sqlite');

class BookAuthorEditorUseCase {
  static get(req, res) {
    db.all(`select  b.title, a.fullname as author_name, b.release_date, e.name as editor  from book_author ba
          inner join author a on a.id=ba.idauthor 
          inner join editor e on e.id=ba.ideditor
          inner join book b on b.id=ba.idbook`, (err, rows) => {
      return res.json(rows)
    })
  }
  static getOne(req, res) {
    const { id } = req.params;
    const stmt = db.prepare(`select  b.title, a.fullname as author_name, b.release_date, e.name as editor  from book_author ba
    inner join author a on a.id=ba.idauthor 
    inner join editor e on e.id=ba.ideditor
    inner join book b on b.id=ba.idbook where ba.id=?`,);
    stmt.all(id, (err, row) => {
      return res.json(row[0])
    });
  }


  static insert(req, res) {
    const { ideditor, idauthor, idbook } = req.body;
    if (!ideditor || !idauthor || !idbook) {
      return res.status(422).json({ message: 'Necessário os campos ideditor, idauthor, idbook' })
    }
    const stmt = db.prepare('insert into book_author_editor (ideditor, idauthor, idbook) values (?, ?, ?)');
    stmt.run(ideditor, idauthor, idbook)

    return res.json({ ideditor, idauthor, idbook })
  }
  static update(req, res) {
    const { idauthor, ideditor, idbook  } = req.body;
    const { id } = req.params;
    let campos = '';
    if (idauthor) {
      campos = `idauthor=${ideditor}`
      if(ideditor || idbook)
      campos = +', ' 
    }
    if (ideditor) {
      campos += `ideditor=${idauthor}`
      if(idbook)
      campos = +', ' 
    }
    if (idbook) {
      campos += `idbook=${idbook}`
    }

    const stmt = db.prepare(`update book_author_editor set ${campos} where id=?`)
    stmt.run(id);
    return res.json({idauthor, ideditor, idbook})
  }
  static delete(req, res) {
    const { id } = req.params;
    const stmt = db.prepare('delete from book_author_editor where id=?')
    stmt.run(id);
    return res.status(201).send();
  }
}

module.exports = BookAuthorEditorUseCase;

