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
    const { title, release_date, publisher } = req.body;
    let id;
    if (!title || !release_date || !publisher) {
      return res.status(400).json({ message: 'Necessário title, release_date e publisher' })
    }
    const stmt = db.prepare('insert into book (title, release_date, publisher) values (?,?,?)');
    stmt.run(title, release_date, publisher, function(err){
      // console.log(`Variavel this.lastID: `, this.lastID)
      id = this.lastID;
      return res.json({ id, title, release_date, publisher })
    })

   
  }
  static update(req, res) {
    let possiveisVariaveis = ['title', 'release_date', 'publisher'];
    let temAoMenosUmParametro = false;
    possiveisVariaveis.forEach((variavel) => {
      if (req.body[variavel]) {
        temAoMenosUmParametro = true;
      }
    })
    if (!temAoMenosUmParametro) {
      return res.status(400).json({ message: 'Necessário passar ao menos um parametro para alteração' })
    }

    let campos = [];
    possiveisVariaveis.forEach((variavel) => {
      campos.push(`${variavel} = '${req.body[variavel]}'`)
    })

    const stmt = db.prepare(`update book set ${campos} where id =? `)
    stmt.run(req.params.id);
    return res.json({
      id: req.params.id,
      title: req.body['title'],
      release_date: req.body['release_date'],
      publisher: req.body['publisher']
    })
  }
  static delete(req, res) {
    const stmt = db.prepare('delete from book where id=?')
    stmt.run(req.params.id)
    return res.status(201).send();
  }
}

module.exports = BookUseCase;