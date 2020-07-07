import express from 'express';
import body_parser from 'body-parser';
import helmet from 'helmet';

import { User } from './models/user.model';
import { Todolist } from './models/todolist.model';
import { Item } from './models/item.model';

class Database {
  /** @type {UserModel[]} */
  users = [];
  tokens = [];

  /**
   * @param {string} token 
   * @returns {User} 
   */
  getUser(token) {
    const t = this.tokens.find(t => t.key == token);
    return t ? t.user : null;
  }

  /**
   * @param {number} id 
   */
  createToken(id) {
    const key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    this.tokens.push({
      key,
      user: id,
    });

    return key;
  }
}

const db = new Database();

const app = express();

app.set('trust proxy', true)

app.use(helmet())

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

app.get('/', (req, res) => {
  res.json({
    name: 'Todolist API',
  });
});

app.post('/signup', (req, res) => {
  
});

app.post('/login', (req, res) => {

});

app.get('/todolist', (req, res) => {
  const token = req.headers.authorization;
  const user = db.getUser(token);

  if (!user) {
    res.status(400).json({
      "error" : 400,
      "message" : "Bad request",
    })
  }

  res.json(user.todolist)
});

app.post('/todolist', (req, res) => {
  const token = req.headers.authorization;
  const user = db.getUser(token);

  if (!user) {
    res.status(400).json({
      "error" : 400,
      "message" : "Bad request",
    })
  }

  const content = req.body.content;
  const name = req.body.name;
  const creation_date = req.body.ccreationdate

  user.todolist.push(new Item(name, conafterprint, creationdate))
});


app.put('/todolist/:id', (req, res) => {
  const token = req.headers.authorization;
  const user = db.getUser(token);

  if (!user) {
    res.status(400).json({
      "error" : 400,
      "message" : "Bad request",
    })
  }

  const id = req.body.id;

  const content = req.body.content ?? user.todolist[id].content;
  const name = req.body.name ?? user.todolist[id].name;
  const creation_date = req.body.creationdate ?? user.todolist[id].creationdate;

  user.todolist.push(new Item(name, conafterprint, creationdate))
});

app.delete('/todolist/:id', (req, res) => {
  const token = req.headers.authorization;
  const user = db.getUser(token);

  if (!user) {
    res.status(400).json({
      "error" : 400,
      "message" : "Bad request",
    })
  }

  const id = req.body.id;

  user.todolist.remove(id);
});

/**
 * - Inscription d'utilisateur -        POST    /signup
 * - Connexion d'utilisateur -          POST    /login
 * - Récupération de la todolist -      GET     /todolist/
 * - Ajout d'une todo -                 POST    /todolist
 * - Modification d'une todo -          PUT     /todolist/:id/
 * - Suppression d'une todo -           DELETE  /todolist/:id:
 */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Todolist app started at http://localhost:${PORT}`));
