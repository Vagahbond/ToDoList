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
      "error": 400,
      "message": "Email is already taken",
    })
  }

  const user = new UserModel(firstname, lastname, moment(birthdate).toDate(), email, password)

  if (!user.isValid()) {
    return res.status(400).json({
      "error": 400,
      "message": "Invalid informations",
    })
  }

  await user.create();

  return res.status(201).json({
    "status": 201,
    "message": "created",
    "user": user,
  })
});

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      "error": 400,
      "message": "Email and password needed",
    });
  }

  const user = await UserModel.findByEmail(email);

  const dont_match = () => {
    return res.status(400).json({
      "error": 400,
      "message": "The password doesn't match given email address.",
    });
  }

  if (!user) {
    return dont_match();
  }

  const token = new TokenModel(user.id);
  await token.save();

  if (password === user.password) {
    return res.status(201).json({
      "status": 201,
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
      "error": 401,
      "message": "Wrong token",
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
      "error": 401,
      "message": "Wrong token",
    })
  }

  if (!content) {
    return res.status(400).json({
      "error": 400,
      "message": "invalid informations for the token",
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
      "error": 401,
      "message": "Wrong token",
    })
  }
  const id = req.params.id;

  
  const todo = await user.todolist.items.find(item => item.id == id);
  

  if (!todo) {
    return res.status(400).json({
      "error": 400,
      "message": "todo does not exist",
    });
  }

  todo.content = req.body.content ?? todo.content;
  todo.creation_date = req.body.creationdate ?? todo.creation_date;
  todo.checked = req.body.checked ?? todo.checked;


  await user.update()



  return res.status(202).json({
    "error": 202,
    "message": "Updating todo",
  });
});

app.delete('/todolist/:id', async (req, res) => {
  const token = req.headers.authorization;
  const user = await TokenModel.getUser(token);

  if (!user) {
    return res.status(401).json({
      "error": 401,
      "message": "Wrong token",
    })
  }

  const id = req.body.id;

  todo = user.todolist.items.find(item => item.id == id);


  if (!todo) {
    return res.status(400).json({
      "error": 400,
      "message": "todo does not exist",
    });
  }

  user.todolist.remove(todo);
  return res.status(200).json({
    "error": 200,
    "message": "todo deleted",
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
