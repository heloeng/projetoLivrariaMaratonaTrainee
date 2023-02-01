var sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./banco.sqlite');

class EditorUseCase {
    static get(req, res) {
        db.all('select * from editor', (err, rows) => {
            return res.json(rows)
        })
    }
    static getOne(req, res) {
        const {id} = req.params;
        const stmt = db.prepare(`select * from editor where id=?`,);
        stmt.all(id, (err, row) => {
            return res.json(row[0])
        });
    }


    static insert(req, res) {
        const { name} = req.body;
        if (!name) {
          return res.status(422).json({ message: 'Necessário name' })
        }
        const stmt = db.prepare('insert into editor (name) values (?)');
        stmt.run(name)
    
        return res.json({ name })
      }
      static update(req, res) {
        const { name } = req.body;
        const {id} = req.params;
        if (!name) {
          return res.status(422).json({ message: 'Necessário passar name para alteração' })
        }
        
        const stmt = db.prepare(`update editor set name=? where id=?`)
        stmt.run(name, id);
        return res.json({fullname})
      }
      static delete(req, res) {
        const {id} = req.params;
        const stmt = db.prepare('delete from editor where id=?')
        stmt.run(id);
        return res.status(201).send();
      }
    }
    
    module.exports = EditorUseCase;
  
