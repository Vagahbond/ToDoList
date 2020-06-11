import { Item } from './item.model'

import moment from 'moment'

export class Todolist {
  /** @type {Item[]}  */
  items = null;

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
    if (this.items && this.items.length >= 10) {
      return null;
    }

    if (this.items.some(i => i.name === item.name)) {
      return null;
    }

    if (item.content.length > 1000) {
      return null
    }

    const last = Math.max(...this.items.map(i => i.creation_date.getTime()));
    const diff = moment(last).diff(item.creation_date, 'minutes');

    if (diff < 30) {
      return null;
    }

    return item;
  }
}
