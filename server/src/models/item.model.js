import * as faker from 'faker';

export class Item {
  /** @type {string} */
  name = null

  /** @type {string} */
  content = null

  /** @type {Date} */
  creation_date = null

  /**
   * @param {string} name 
   * @param {string} content 
   * @param {Date} creation_date 
   */
  constructor(name, content, creation_date) {
    this.name = name;
    this.content = content;
    this.creation_date = creation_date;
  }

  static mock() {
    const name = faker.random.words(Math.random() * (6 - 1) + 1);
    const content = faker.random.alphaNumeric(Math.random() * (1000 - 10) + 10);
    const creation_date = faker.date.past(30);

    return new Item(name, content, creation_date);
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
