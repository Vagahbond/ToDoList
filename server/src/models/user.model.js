import moment from 'moment';
import validator from 'validator';
import * as faker from 'faker';

import * as ModelEngine from './model_engine'

import { Todolist, schema as TodolistSchema } from './todolist.model'

import db from '../db';

export const schema = new db.Schema({
  firstname: { type: String, required: true, },
  lastname: { type: String, required: true, },
  birthdate: { type: Date, required: true, },
  email: { type: String, required: true, },
  password: { type: String, required: true, },
  todolist: { type: TodolistSchema },
})

export const model = db.model('User', schema)

export class User {
  /** @type {string} */
  id = null

  /** @type {string} */
  firstname = null

  /** @type {string} */
  lastname = null

  /** @type {Date} */
  birthdate = null

  /** @type {string} */
  email = null

  /** @type {string} */
  password = null

  /** @type {Todolist} */
  todolist = null

  /**
   * @param {string} firstname 
   * @param {string} lastname 
   * @param {Date} birthdate 
   * @param {string} email 
   * @param {string} password 
   * @param {Todolist} todolist 
   */
  constructor(firstname, lastname, birthdate, email, password, todolist = null) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.email = email;
    this.password = password;
    this.todolist = todolist || new Todolist();
  }

  static mock() {
    const firstname = faker.name.firstName()
    const lastname = faker.name.lastName()
    const birthdate = faker.date.past(90, moment().subtract(13, 'years').toDate())
    const email = faker.internet.email(firstname, lastname);
    const password = faker.internet.password(Math.random() * (24 - 8) + 8)

    return new User(firstname, lastname, birthdate, email, password);
  }

  static async findOne(id) {
    const data = await model.findOne({ _id: id }).lean()
    return User.fromQuery(data);
  }

  static async findByEmail(email) {
    const data = await model.findOne({ email }).lean()
    return User.fromQuery(data);
  }

  static fromQuery(data) {
    if (data) {
      const user = new User(data.firstname, data.lastname, data.birthdate, data.email, data.password, Todolist.fromQuery(data.todolist));
      user.id = data._id;

      return user;
    }

    return null;
  }

  async create() {
    const data = await model.create({
      firstname: this.firstname,
      lastname: this.lastname,
      birthdate: this.birthdate,
      email: this.email,
      password: this.password,
      todolist: this.todolist,
    });

    this.id = data._id

    return data;
  }

  update() {
    return model.updateOne({ _id: this.id }, {
      firstname: this.firstname,
      lastname: this.lastname,
      birthdate: this.birthdate,
      email: this.email,
      password: this.password,
      todolist: this.todolist.db_format(),
    });
  }

  isValid() {
    if (!this.firstname || (typeof this.firstname) !== 'string') {
      return false;
    }

    if (!this.lastname || (typeof this.lastname) !== 'string') {
      return false;
    }

    console.log(this)

    if (!this.birthdate || !(this.birthdate instanceof Date) || moment().diff(this.birthdate, 'years') < 13) {
      return false;
    }

    if (!this.password || (typeof this.password) !== 'string' || this.password.length > 40 || this.password.length < 8) {
      return false;
    }

    if (!this.email || (typeof this.email) !== 'string' || !validator.isEmail(this.email)) {
      return false;
    }

    if (!this.todolist || !(this.todolist instanceof Todolist)) {
      return false;
    }

    return true;
  }
}
