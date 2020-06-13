import * as assert from 'assert';
import moment from 'moment';
import faker from 'faker';

import { User } from '../src/models/user.model';

describe('User validity', () => {
  it('User.mock() function should return a valid user', () => {
    const user = User.mock();
    assert.ok(user.isValid());
  });
});

describe('User firstname validity', () => {
  it("should be invalid if firstname is empty", () => {
    const user = User.mock();
    user.firstname = ''

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if firstname is not a string", () => {
    const user = User.mock();
    user.firstname = 2

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if firstname is null", () => {
    const user = User.mock();
    user.firstname = null

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if firstname is undefined", () => {
    const user = User.mock();
    user.firstname = undefined

    assert.equal(user.isValid(), false);
  });

  it("isValid() should return `true`", () => {
    const user = User.mock();

    assert.ok(user.isValid());
  });
});

describe('User lastname validity', () => {
  it("should be invalid if lastname is empty", () => {
    const user = User.mock();
    user.lastname = ''

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if lastname is not a string", () => {
    const user = User.mock();
    user.lastname = 2

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if lastname is null", () => {
    const user = User.mock();
    user.lastname = null

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if lastname is undefined", () => {
    const user = User.mock();
    user.lastname = undefined

    assert.equal(user.isValid(), false);
  });

  it("isValid() should return `true`", () => {
    const user = User.mock();

    assert.ok(user.isValid());
  });
});

describe('User birthdate validity', () => {
  it("should be invalid if birthdate is null", () => {
    const user = User.mock();
    user.birthdate = null

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if birthdate is undefined", () => {
    const user = User.mock();
    user.birthdate = undefined

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if birthdate is not a date", () => {
    const user = User.mock();
    user.birthdate = "03-04-1999"

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if birthdate is under 13 years old ago", () => {
    const user = User.mock();
    user.birthdate = moment().subtract(12, 'years').toDate()

    assert.equal(user.isValid(), false);
  });

  it("should be valid if birthdate is 13 years old ago", () => {
    const user = User.mock();
    user.birthdate = moment().subtract(13, 'years').toDate()

    assert.ok(user.isValid());
  });

  it("should be valid if birthdate is greater than 13 years old ago", () => {
    const user = User.mock();
    user.birthdate = moment().subtract(14, 'years').toDate()

    assert.ok(user.isValid());
  });
});

describe('User email validity', () => {
  it("should be invalid if email is null", () => {
    const user = User.mock();
    user.email = null

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if email is undefined", () => {
    const user = User.mock();
    user.email = undefined

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if email is not a string", () => {
    const user = User.mock();
    user.email = 2

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if email doesn't contain an extension (bob@ross)", () => {
    const user = User.mock();
    user.email = 'bob@ross'

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if email doesn't contain an host (bob@)", () => {
    const user = User.mock();
    user.email = 'bob@'

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if email doesn't contain the first part (bob@ross.com)", () => {
    const user = User.mock();
    user.email = '@ross.com'

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if email doesn't contain anything (@)", () => {
    const user = User.mock();
    user.email = '@'

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if email is empty", () => {
    const user = User.mock();
    user.email = ''

    assert.equal(user.isValid(), false);
  });

  it("should be valid if complete (bob@ross.com)", () => {
    const user = User.mock();
    user.email = 'bob@ross.com'

    assert.ok(user.isValid());
  });
});

describe('user todolist validity', () => {
  it("should be invalid if todolist is not a list of Item ", () => {
    const user = User.mock();
    user.todolist = 2

    assert.equal(user.isValid(), false)
  });
  it("should be invalid if todolist is null", () => {
    const user = User.mock();
    user.todolist = null

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if todolist is undefined", () => {
    const user = User.mock();
    user.todolist = undefined

    assert.equal(user.isValid(), false);
  });
});

describe('User password validity', () => {
  it("should be invalid if password is null", () => {
    const user = User.mock();
    user.password = null

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if password is undefined", () => {
    const user = User.mock();
    user.password = undefined

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if password is not a string ", () => {
    const user = User.mock();
    user.password = 2

    assert.equal(user.isValid(), false)
  });

  it("should be invalid if password length is under 8", () => {
    const user = User.mock();
    user.password = faker.internet.password(7);

    assert.equal(user.isValid(), false);
  });

  it("should be invalid if password length is more than 40", () => {
    const user = User.mock();
    user.password = faker.internet.password(41);

    assert.equal(user.isValid(), false);
  });


  it(`should be valid if password length is 40`, () => {
    const user = User.mock();
    user.password = faker.internet.password(40);

    assert.ok(user.isValid());
  });

  it(`should be valid if password length is less than 40`, () => {
    const user = User.mock();
    user.password = faker.internet.password(39);

    assert.ok(user.isValid());
  });

  it(`should be valid if password length is more than 8`, () => {
    const user = User.mock();
    user.password = faker.internet.password(9);

    assert.ok(user.isValid());
  });

  it(`should be valid if password length is 8`, () => {
    const user = User.mock();
    user.password = faker.internet.password(8);

    assert.ok(user.isValid());
  });
});
