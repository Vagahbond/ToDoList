import { Item } from "../src/models/item.model"
import { Todolist } from "../src/models/todolist.model";
import { User } from "../src/models/user.model";

import { EmailService } from "../src/services/email.service";
import { TodolistService } from "../src/services/todolist.service";

import * as faker from "faker"
import * as assert from "assert";
import moment from "moment";

describe("Verification on item before creation", () => {
  it("should not be null if everything is ", () => {
    const user = User.mock();

    for (let i = 8; i > 0; i--) {
      const item = Item.mock();
      item.creation_date = moment().subtract(31 * i, 'minute').toDate();

      TodolistService.addItem(user, item);
    }

    const item = Item.mock();
    item.creation_date = moment().subtract(31 * 9, 'minute').toDate();

    assert.ok(user.todolist.canAddItem(item) != null);
  });

  it("should not be null if content is 1000 characters long", () => {
    const user = User.mock();
    for (let i = 8; i > 0; i--) {

      const item = Item.mock();
      item.creation_date = moment().subtract(31 * i, 'minute').toDate();

      TodolistService.addItem(user, item);
    }

    const item = Item.mock();
    item.creation_date = moment().subtract(31 * 9, 'minute').toDate();
    item.content = faker.random.alphaNumeric(1000);

    assert.equal(user.todolist.canAddItem(item), null);
  });

  it("should not be null if content is 999 long", () => {
    const user = User.mock();
    for (let i = 8; i > 0; i--) {

      const item = Item.mock();
      item.creation_date = moment().subtract(31 * i, 'minute').toDate();

      TodolistService.addItem(user, item);
    }

    const item = Item.mock();
    item.creation_date = moment().subtract(31 * 9, 'minute').toDate();
    item.content = faker.random.alphaNumeric(999);

    assert.equal(user.todolist.canAddItem(item), item);
  });

  it("should be null if content is 1001 long", () => {
    const user = User.mock();
    for (let i = 8; i > 0; i--) {

      const item = Item.mock();
      item.creation_date = moment().subtract(31 * i, 'minute').toDate();

      TodolistService.addItem(user, item);
    }

    const item = Item.mock();
    item.creation_date = moment().subtract(31 * 9, 'minute').toDate();
    item.content = faker.random.alphaNumeric(1001);

    assert.equal(user.todolist.canAddItem(item), null);
  });

  it("Should be null if name is already taken", () => {
    const user = User.mock();
    for (let i = 8; i > 0; i--) {
      const item = Item.mock();
      item.creation_date = moment().subtract(31 * i, 'minute').toDate();

      TodolistService.addItem(user, item);
    }

    const taken_item = Item.mock();
    taken_item.creation_date = moment().subtract(31 * 9, 'minute').toDate();
    taken_item.name = "my story";
    TodolistService.addItem(user, taken_item)

    const item = Item.mock();
    item.creation_date = moment().subtract(31 * 10, 'minute').toDate();
    item.name = "my story";

    assert.equal(user.todolist.canAddItem(item), null);
  });

  it("Should be null if list already contains 10 items", () => {
    const user = User.mock();

    for (let i = 10; i > 0; i--) {
      const item = Item.mock();
      item.creation_date = moment().subtract(31 * i, 'minute').toDate();

      TodolistService.addItem(user, item);
    }

    const item = Item.mock();
    item.creation_date = moment().subtract(31 * 11, 'minute').toDate();

    assert.equal(user.todolist.canAddItem(item), null);
  });

  it("Should not be null if list already contains less than 10 items", () => {
    const user = User.mock();

    for (let i = 9; i > 0; i--) {
      const item = Item.mock();
      item.creation_date = moment().subtract(31 * i, 'minute').toDate();

      TodolistService.addItem(user, item);
    }

    const item = Item.mock();
    item.creation_date = moment().subtract(31 * 11, 'minute').toDate();

    assert.equal(user.todolist.canAddItem(item), null);
  });

  it("Should be null if list already contains more than 10  items", () => {
    const user = User.mock();

    for (let i = 11; i > 0; i--) {
      const item = Item.mock();
      item.creation_date = moment().subtract(31 * i, 'minute').toDate();

      TodolistService.addItem(user, item);
    }

    const item = Item.mock();
    item.creation_date = moment().subtract(31 * 11, 'minute').toDate();

    assert.equal(user.todolist.canAddItem(item), null);
  });
});

describe("Send mail on item creation if user older than 18", () => {
  it("should not send email if user is under 18", () => {
    const user = User.mock();
    user.birthdate = moment().subtract(17, 'years').toDate();

    assert.equal(EmailService.send(user), false);
  });

  it("should not send email if user is 18 years old", () => {
    const user = User.mock();
    user.birthdate = moment().subtract(18, 'years').toDate();

    assert.equal(EmailService.send(user), false);
  });

  it("should send email if user is more than 18 years old", () => {
    const user = User.mock();
    user.birthdate = moment().subtract(19, 'years').toDate();

    assert.ok(EmailService.send(user));
  });
});
