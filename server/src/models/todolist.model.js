import { Item, schema as ItemSchema } from './item.model'

import moment from 'moment'

import db from '../db';

export const schema = new db.Schema({
  items: { type: [ItemSchema], default: [] },
})

export class Todolist {
  /** @type {Item[]}  */
  items = [];

  /**
   * @param {Item[]} items 
   */
  constructor(items = []) {
    this.items = items
  }

  static mock() {
    const items = [...Array(Math.floor(Math.random() * 10)).keys()].map(item => Item.mock());

    return new Todolist(items);
  }

  /**
   * @param {Item} item 
   */
  canAddItem(item) {
    if (!this.items || !Array.isArray(this.items) || this.items.length >= 10) {
      return null;
    }

    // if (this.items.some(i => i.name === item.name)) {
    //   return null;
    // }

    if (!item.isValid()) {
      return null;
    }

    // const last = Math.max(...this.items.map(i => i.creation_date.getTime()));

    // if (last) {
    //   const diff = Math.abs(moment(last).diff(item.creation_date, 'minutes'));

    //   if (diff < 30) {
    //     return null;
    //   }
    // }

    return item;
  }

  static fromQuery(data) {
    if (data) {
      const todolist = new Todolist(data.items.map(Item.fromQuery));
      todolist.id = data._id;

      return todolist;
    }

    return null;
  }
}
