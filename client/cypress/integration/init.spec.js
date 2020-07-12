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
const birthdate = faker.date.past(100, moment().subtract({ year: faker.random.number({ min: 14, max: 100 }) }).toDate());
const password = faker.internet.password(faker.random.number({ min: 8, max: 40 }));

describe('Signup', () => {
  it('should visits the signup page', () => {
    cy.visit(`${url}/signup`)
  })

  it('should find and fill inputs', () => {
    cy.get('#firstname').type(firstname)
    cy.get('#lastname').type(lastname)
    cy.get('#email').type(email)
    cy.get('#birthdate').type(moment(birthdate).format('yyyy-MM-DD'))
    cy.get('#password').type(password)
  })

  it('should redirect to /login on valid submit', () => {
    cy.get('#SignupSubmit').click()
    cy.url().should('include', '/login')
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
    cy.url().should('include', '/')
  })

  describe('FAB tests', () => {
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

    it('should create todo when valid and display it', () => {
      cy.wait(0).then(() => {
        const length = document.querySelectorAll('#TodoList li input[type=text]').length;
        cy.log(length)
      })

      cy.get('#CreateTodoTextArea').type("hello world")
      cy.get('#CreateTodoSubmit').click()

      cy.wait(0).then(() => {
        const after_length = document.querySelectorAll('#TodoList li input[type=text]').length;
        cy.log(document.querySelectorAll('#TodoList li input[type=text]'))

        expect(length).to.equal(after_length)
      })
    })
  })
})
