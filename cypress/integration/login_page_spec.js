describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should log user in successfully', () => {
    cy.get('#loginEmail').type('dqn1810@gmail.com');
    cy.get('#loginPassword').type('Test@2019');
    cy.get('[data-test-id="loginBtn"]').click();

    cy.url().should('include', '/dashboard');
  });

  it('should not log user in', () => {
    cy.get('#loginEmail').type('dqn1810@gmail.com');
    cy.get('#loginPassword').type('Test@2020');
    cy.get('[data-test-id="loginBtn"]').click();

    cy.get('[data-test-id="alert"] #client-snackbar').should('contain', 'Your email or password is incorrect!');
  });
});
