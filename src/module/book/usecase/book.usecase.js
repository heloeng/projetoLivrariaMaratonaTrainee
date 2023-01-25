const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./banco.sqlite');

class BookUseCase {
   static getAll(req, res) {
    db.all('select * from book', (err, rows) => {
      res.json(rows)
    });
  }
  static getOne(req, res) {
    const stmt = db.prepare(`select * from book where id=?`,);
    stmt.all(req.params.id, (err, row) => {
      return res.json(row[0])
    });
  }
  static insert(req, res) {
    const { title, release_date } = req.body;
    if (!title || !release_date) {
      return res.status(400).json({ message: 'Necessário title e release_date' })
    }
    const stmt = db.prepare('insert into book (title, release_date) values (?,?)');
    stmt.run(title, release_date)

    return res.json({ title, release_date })
  }
  static update(req, res) {
    const { title, release_date } = req.body;
    if (!title && !release_date) {
      return res.status(400).json({ message: 'Necessário passar ao menos um parametro para alteração' })
    }

    let campos = '';
    if (title) {
      campos = `title='${title}', `
    }
    if (release_date) {
      campos += `release_date='${release_date}'`
    }

    const stmt = db.prepare(`update book set ${campos} where id=?`)
    stmt.run(req.params.id);
    return res.json({ title, release_date })
  }
  static delete(req, res) {
    const stmt = db.prepare('delete from book where id=?')
    stmt.run(req.params.id)
    return res.status(201).send();
  }
}

module.exports = BookUseCase;