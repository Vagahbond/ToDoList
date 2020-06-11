import moment from 'moment';
import validator from 'validator';
import * as faker from 'faker';

import { Todolist } from './todolist.model'

export class User {
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

  isValid() {
    if (!this.firstname || (typeof this.firstname) !== 'string') {
      return false;
    }

    if (!this.lastname || (typeof this.lastname) !== 'string') {
      return false;
    }

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
