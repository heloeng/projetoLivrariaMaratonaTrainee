const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./banco.sqlite');

class BookAuthorUseCase {
  static get(req, res) {
    db.all(`select ba.id, b.title, a.fullname as author_name,  b.release_date from book_author ba
    inner join author a on a.id=ba.idauthor
    inner join book b on b.id=ba.idbook`, (err, rows) => {
      return res.json(rows)
    })
  }
  static getOne(req, res) {
    const { id } = req.params;

    const stmt = db.prepare(`select b.title, a.fullname as author_name,  b.release_date from book_author ba
    inner join author a on a.id=ba.idauthor
    inner join book b on b.id=ba.idbook where ba.id=?`,);
    stmt.all(id, (err, row) => {
      return res.json(row[0])
    });
  }

  static insert(req, res) {
    const { idauthor, idbook } = req.body;
    if (!idauthor || !idbook) {
      return res.status(422).json({ message: 'Necessário dos campos idauthor, , idbook' })
    }
    const stmt = db.prepare('insert into book_author (, idauthor, idbook) values (?,?,?)');
    stmt.run(idauthor, idbook)

    return res.json({idauthor, idbook })
  }

  static update(req, res) {
    const { idauthor, idbook } = req.body;
    const { id } = req.params;

    let campos = '';
    if (idauthor) {
      campos = `idauthor=${idauthor}`
    if(idbook){
      campos+= `,`
    }
    }
    
    if (idbook) {
      campos += `idbook=${idbook}`
    }

    const stmt = db.prepare(`update book_author set ${campos} where id=?`)
    stmt.run(id);
    return res.json({ idauthor, idbook })
  }
  static delete(req, res) {
    const { id } = req.params;
    const stmt = db.prepare('delete from book_author where id=?')
    stmt.run(id)
    return res.status(201).send();
  }
}

module.exports = BookAuthorUseCase