Cypress.Commands.add('login', (email, password) => {
  cy.get('#loginEmail').type(email);
  cy.get('#loginPassword').type(password);
  cy.get('[data-test-id="loginBtn"]').click();
});
