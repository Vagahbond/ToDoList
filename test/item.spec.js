import { Item } from '../src/models/item.model';

import assert from 'assert';
import faker from 'faker';

describe('Mocking', () => {
  it('Item.mock() function should not be null', () => {
    const item = Item.mock();
    assert.ok(item !== null);
  });

  it('Item.mock() function should not be undefined', () => {
    const item = Item.mock();
    assert.ok(item !== undefined);
  });

  it('Item.mock() function should return a Item-typed value', () => {
    const item = Item.mock();
    assert.ok(item instanceof Item);
  });

  it('Item.mock() function should return a valid item', () => {
    const item = Item.mock();
    assert.ok(item.isValid());
  });
});

describe("Item validity", () => {
  it("should not be invalid if item's content is null", () => {
    const item = Item.mock();
    item.content = null;

    assert.equal(item.isValid(), false);
  });

  it("should not be invalid if item's content is undefined", () => {
    const item = Item.mock();
    item.content = undefined;

    assert.equal(item.isValid(), false);
  });

  it("should not be invalid if item's content is more than 1000 long", () => {
    const item = Item.mock();
    item.content = faker.random.alphaNumeric(1001);

    assert.equal(item.isValid(), false);
  });

  it("should be valid if item's content is 1000 characters long", () => {
    const item = Item.mock();
    item.content = faker.random.alphaNumeric(1000);

    assert.ok(item.isValid());
  });

  it("should be valid if item's content is less than 1000 characters long", () => {
    const item = Item.mock();
    item.content = faker.random.alphaNumeric(999);

    assert.ok(item.isValid());
  });

  for (let i = 0; i <= 1000; i += 100) {
    it(`should be valid if item's content is ${i} characters long.`, () => {
      const item = Item.mock();
      item.content = faker.random.alphaNumeric(i);

      assert.ok(item.isValid());
    });
  }
});
