import { Todolist } from '../models/todolist.model'
import { User } from '../models/user.model'
import { Item } from '../models/item.model'

import { EmailService } from './email.service'

export class TodolistService {
  /**
   * @param {User} user 
   * @param {Item} item 
   */
  static addItem(user, item) {
    if (user.todolist.canAddItem(item)) {
      user.todolist.items.push(item)
      EmailService.send(user)

      return true;
    }

    return false;
  }
}
