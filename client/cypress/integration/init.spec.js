/// <reference types="Cypress" />

import faker from 'faker';
import moment from 'moment';

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorageCache", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorageCache", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

beforeEach(() => {
  cy.restoreLocalStorageCache();
});

afterEach(() => {
  cy.saveLocalStorageCache();
});

const url = 'http://localhost:3001'

const firstname = faker.name.firstName();
const lastname = faker.name.lastName();
const email = faker.internet.email(firstname, lastname);
const raw_birthdate = faker.date.past(100, moment().subtract({ year: faker.random.number({ min: 14, max: 100 }) }).toDate());
const birthdate = moment(raw_birthdate).format('yyyy-MM-DD');
const password = faker.internet.password(faker.random.number({ min: 8, max: 40 }));

describe('Signup', () => {
  it('should visits the signup page', () => {
    cy.visit(`${url}/signup`)
  })

  it('should find and fill inputs', () => {
    cy.get('#firstname').type(firstname)
    cy.get('#lastname').type(lastname)
    cy.get('#email').type(email)
    cy.get('#birthdate').type(birthdate)
    cy.get('#password').type(password)
  })

  it('should redirect to /login on valid submit', () => {
    cy.get('#SignupSubmit').click()
    cy.wait(1000);
    cy.url().should('eq', `${url}/login`)
  })
})

describe('Login', () => {
  it('should visits the login page.', () => {
    cy.visit(`${url}/login`)
  })

  it("should not login if no password.", () => {
    cy.get("#password").clear()
    cy.get("#email").clear().type(email)
    cy.get("#LoginSubmit").click()
  })

  it("should not login if wrong password", () => {
    cy.get("#email").clear().type(email)
    cy.get("#password").clear().type("wrongpassword")
    cy.get("#password").clear().type(email)
  })

  it("should not login if wrong email", () => {
    cy.get("#email").clear().type("wrong@email.com")
    cy.get("#password").clear().type(password)
    cy.get("#LoginSubmit").click()
  })

  it("should not login if no email", () => {
    cy.get("#email").clear()
    cy.get("#password").clear().type(password)
    cy.get("#LoginSubmit").click()
  })

  it("should login if good credentials", () => {
    cy.get("#email").clear().type(email)
    cy.get("#password").clear().type(password)
    cy.get("#LoginSubmit").click()
    cy.url().should('eq', `${url}/`)
  })
})

describe('FAB', () => {
  it('should visits the todolists', () => {
    cy.visit(`${url}/`)
  })

  it('should display FAB', () => {
    cy.get('#CreateTodoFAB')
  })

  it('should show modal on click', () => {
    cy.get('#CreateTodoTextArea').should('not.exist')
    cy.get('#CreateTodoFAB').click()
    cy.get('#CreateTodoTextArea')
  })

  it('should create todo', () => {
    cy.get('#CreateTodoTextArea').type("hello world")
    cy.get('#CreateTodoSubmit').click()

  })
})

describe("Todo checkboxes", () => {
  it("should be saving state after a checkbox has been checked", () => {
    cy.get("#TodoList input[type='checkbox']").should('not.be.checked')
    cy.get("#TodoList input[type='checkbox']").first().check()
    cy.get("#TodoList input[type='checkbox']").should('be.checked')
    cy.reload()
    cy.wait(1000)
    cy.get("#TodoList input[type='checkbox']").should('be.checked')
    cy.get("#TodoList input[type='checkbox']").first().uncheck()
    cy.get("#TodoList input[type='checkbox']").should('not.be.checked')
    cy.reload()
    cy.wait(1000)
    cy.get("#TodoList input[type='checkbox']").should('not.be.checked')
  })
})

describe("Todo suppression", () => {
  it('should delete the only present todolist', () => {
    cy.get("#TodoList button.ant-btn-dangerous").first().click()
    cy.get("#TodoList button.ant-btn-dangerous").should('not.exist')
  })
})

describe("About", () => {
  it('should successfully access /about', () => {
    cy.visit(`${url}/about`)
  })
})
