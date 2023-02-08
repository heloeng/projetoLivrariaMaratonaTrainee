const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./banco.sqlite');

class AuthorUseCase {
  static get(req, res) {
    db.all('select * from author', (err, rows) => {
      return res.json(rows)
    })
  }
  static getOne(req, res) {
    const { id } = req.params;

    const stmt = db.prepare(`select * from author where id=?`,);
    stmt.all(id, (err, row) => {
      return res.json(row[0])
    });
  }

  static insert(req, res) {
    const { fullname } = req.body;
    if (!fullname) {
      return res.status(422).json({ message: 'Necessário fullname' })
    }
    const stmt = db.prepare('insert into author (fullname) values (?)');
    stmt.run(fullname)

    return res.json({ fullname })
  }

  static update(req, res) {
    const { fullname } = req.body;
    const { id } = req.params;
    if (!fullname) {
      return res.status(422).json({ message: 'Necessário passar fullname para alteração' })
    }

    const stmt = db.prepare(`update author set fullname=? where id=?`)
    stmt.run(fullname, id);
    return res.json({ fullname })
  }
  static delete(req, res) {
    const { id } = req.params;
    const stmt = db.prepare('delete from author where id=?')
    stmt.run(id)
    return res.status(201).send();
  }
}

module.exports = AuthorUseCase