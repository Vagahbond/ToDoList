import db from '../db';

import { User as UserModel } from './user.model'

import * as ModelEngine from './model_engine'

export const schema = new db.Schema({
  key: { type: String, required: true, },
  user: { type: db.Schema.Types.ObjectId, ref: 'User', required: true },
})

export const model = db.model('Token', schema)

export class Token {
  /** @type {string} */
  key = null;

  /** @type {string} */
  user = null;

  /**
   * @param {string} user 
   */
  constructor(user) {
    this.key = ModelEngine.createId();
    this.user = user;
  }

  save() {
    return model.create({
      key: this.key,
      user: this.user,
    });
  }

  /**
   * @param {string} key 
   */
  static async getUser(key) {
    const data = await model.findOne({ key }).lean();

    if (data) {
      return UserModel.findOne({ _id: data.user });
    }

    return null;
  }
}
