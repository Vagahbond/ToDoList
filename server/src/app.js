import express from 'express';
import body_parser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import moment from 'moment';

import { User as UserModel } from './models/user.model';
import { Todolist as TodolistModel } from './models/todolist.model';
import { Item as ItemModel } from './models/item.model';
import { Token as TokenModel } from './models/token.model';

import { TodolistService } from './services/todolist.service';

const app = express();

app.set('trust proxy', true)

app.use(cors())
app.use(helmet())

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

app.get('/', (req, res) => {
  res.json({
    name: 'Todolist API',
  });
});

app.post('/signup', async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const birthdate = req.body.birthdate;
  const password = req.body.password;

  if (await UserModel.findByEmail(email)) {
    return res.status(400).json({
      "error": "Email is already taken",
    })
  }

  const user = new UserModel(firstname, lastname, moment(birthdate).toDate(), email, password)

  if (!user.isValid()) {
    return res.status(400).json({
      "error": "Invalid informations",
    })
  }

  await user.create();

  return res.status(201).json({
    "message": "created",
    "user": user,
  })
});

app.get('/connected', async (req, res) => {
  const token = req.headers.authorization;

  const user = await TokenModel.getUser(token);

  return res.json({
    "connected": !!user,
  });
});

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      "error": "Email and password needed",
    });
  }

  const dont_match = () => {
    return res.status(400).json({
      "error": "The password doesn't match given email address.",
    });
  }

  const user = await UserModel.findByEmail(email);

  if (!user) {
    return dont_match();
  }

  const token = new TokenModel(user.id);
  await token.save();

  if (password === user.password) {
    return res.status(201).json({
      "message": "Signed in",
      "token": token.key,
    });
  }

  return dont_match();
});

app.get('/todolist', async (req, res) => {
  const token = req.headers.authorization;
  const user = await TokenModel.getUser(token);

  if (!user) {
    return res.status(401).json({
      "error": "Wrong token",
    })
  }

  res.json(user.todolist)
});

app.post('/todolist', async (req, res) => {
  const token = req.headers.authorization;
  const user = await TokenModel.getUser(token);

  const content = req.body.content;

  if (!user) {
    return res.status(401).json({
      "error": "Wrong token",
    })
  }

  if (!content) {
    return res.status(400).json({
      "error": "invalid informations for the token",
    })
  }

  TodolistService.addItem(user, new ItemModel(content, new Date()))

  await user.update();

  return res.status(201).json({ content })
});

app.put('/todolist/:id', async (req, res) => {
  const token = req.headers.authorization;
  const user = await TokenModel.getUser(token)

  if (!user) {
    return res.status(401).json({
      "error": "Wrong token",
    })
  }

  const id = req.params.id;
  const todo = user.todolist.items.find(item => item.id == id);

  if (!todo) {
    return res.status(400).json({
      "error": "todo does not exist",
    });
  }

  todo.content = req.body.content ?? todo.content;
  todo.checked = req.body.checked ?? todo.checked;

  await user.update()

  return res.status(202).json({
    "error": "Updating todo",
  });
});

app.delete('/todolist/:id', async (req, res) => {
  const token = req.headers.authorization;
  const user = await TokenModel.getUser(token);

  if (!user) {
    return res.status(401).json({
      "error": "Wrong token",
    })
  }

  const id = req.params.id;
  const index = user.todolist.items.findIndex(item => item.id == id);

  if (index === -1) {
    return res.status(400).json({
      "error": "todo does not exist",
    });
  }

  user.todolist.items.splice(index, 1);
  await user.update();

  //user.todolist.remove(todo);
  return res.status(200).json({
    "error": "todo deleted",
  });
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
