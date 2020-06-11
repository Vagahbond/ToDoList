import { User } from '../models/user.model'
import moment from 'moment'

export class EmailService {
  /**
   * @param {User} user 
   */
  static send(user) {
    return moment().diff(user.birthdate, 'years') > 18;
  }
}
