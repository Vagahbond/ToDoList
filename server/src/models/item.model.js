import * as faker from 'faker';

import * as ModelEngine from './model_engine'

import db from '../db';

export const schema = new db.Schema({
  // name: { type: String, required: true },
  content: { type: String, required: true },
  creation_date: { type: Date, default: Date.now },
});

export class Item {
  /** @type {string} */
  id = null

  /** @type {string} */
  // name = null

  /** @type {string} */
  content = null

  /** @type {Date} */
  creation_date = null

  /** @type {Boolean} */
  checked = null

  /**
   * @param {string} content 
   * @param {Date} creation_date 
   */
  constructor(content, creation_date) {
    // this.name = name;
    this.content = content;
    this.creation_date = creation_date;
    this.checked = false;
    
  }

  static mock() {
    // const name = faker.random.words(Math.random() * (6 - 1) + 1);
    const content = faker.random.alphaNumeric(Math.random() * (1000 - 10) + 10);
    const creation_date = faker.date.past(30);

    return new Item(content, creation_date);
  }

  static fromQuery(data) {
    if (data) {
      const item = new Item(data.content, data.creation_date);
      item.id = data._id;

      return item;
    }

    return null;
  }

  isValid() {
    if (this.content === null || this.content === undefined) {
      return false;
    }

    if (this.content.length > 1000) {
      return false;
    }

    return true;
  }
}
