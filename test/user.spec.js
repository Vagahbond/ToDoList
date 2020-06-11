import * as assert from 'assert';
import moment from 'moment';

import { User } from '../src/models/user.model'

describe('User creation', () => {
  it('user should be valid', () => {
    const user = User.mock();
    assert.ok(user.isValid());
  });

  it("user's birth date should be invalid", () => {
    const user = User.mock();
    user.birthdate = moment().subtract(12, 'years').toDate()

    assert.ok(!user.isValid());
  });

  it("user's email should be invalid", () => {
    const user = User.mock();
    user.email = 'jaaj@chiraach'

    assert.ok(!user.isValid());
  });
});
