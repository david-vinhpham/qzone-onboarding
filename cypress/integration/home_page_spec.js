describe('Home page', () => {
  describe('Admin user', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('#loginEmail').type('dqn1810@gmail.com');
      cy.get('#loginPassword').type('Test@2019');
      cy.get('[data-test-id="loginBtn"]').click();
    });

    describe('Under avatar pages', () => {
      beforeEach(() => {
        cy.get('[data-test-id="openAvatar"]').click();
      });

      it('should navigate to all pages successfully', () => {
        // organization list page
        cy.get('[data-test-id="orgListNavLink"]').click();
        cy.url().should('include', '/organization/list');
        cy.get('h4').first().should('contain', 'Organization List');

        // business location list page
        cy.get('[data-test-id="businessLocationListNavLink"]').click();
        cy.url().should('include', '/location/list');
        cy.get('h4').first().should('contain', 'Location List');

        // manage services page
        cy.get('[data-test-id="manageServicesNavLink"]').click();
        cy.url().should('include', '/services/list');
        cy.get('h4').first().should('contain', 'Service List');

        // business categories page
        cy.get('[data-test-id="businessCategoriesNavLink"]').click();
        cy.url().should('include', '/business-categories');
        cy.get('h4').first().should('contain', 'Business Category List');

        // provider list page
        cy.get('[data-test-id="providerListNavLink"]').click();
        cy.url().should('include', '/provider/list');
        cy.get('h4').first().should('contain', 'Provider List');
      });
    });

    describe('Main pages', () => {
      it('should navigate to all pages successfully', () => {
        // customer service page
        cy.get('[data-test-id="customerServiceNavLink"]').click();
        cy.url().should('include', '/customer-service');
        cy.get('[data-test-id="pageTitle"]').should('contain', 'Customer Service');

        // calendar page
        cy.get('[data-test-id="calendarNavLink"]').click();
        cy.url().should('include', '/calendar');
        cy.get('[data-test-id="pageTitle"]').should('contain', 'Manage Calendar');

        // temporary services page
        cy.get('[data-test-id="tmpServicesNavLink"]').click();
        cy.url().should('include', '/tmp-services');
        cy.get('[data-test-id="pageTitle"]').should('contain', 'Temporary Services');

        // email templates page
        cy.get('[data-test-id="emailTemplatesNavLink"]').click();
        cy.url().should('include', '/email-templates');
        cy.get('[data-test-id="pageTitle"]').should('contain', 'Email Templates');
      });
    });
  });

  describe('Provider user', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('#loginEmail').type('provider20@gmail.com');
      cy.get('#loginPassword').type('Test@2020');
      cy.get('[data-test-id="loginBtn"]').click();
    });

    describe('Main pages', () => {
      it('should navigate to all pages successfully', () => {
        // customer service page
        cy.get('[data-test-id="customerServiceNavLink"]').click();
        cy.url().should('include', '/customer-service');
        cy.get('[data-test-id="pageTitle"]').should('contain', 'Customer Service');

        // calendar page
        cy.get('[data-test-id="calendarNavLink"]').click();
        cy.url().should('include', '/calendar');
        cy.get('[data-test-id="pageTitle"]').should('contain', 'Manage Calendar');

        // temporary services page
        cy.get('[data-test-id="tmpServicesNavLink"]').click();
        cy.url().should('include', '/tmp-services');
        cy.get('[data-test-id="pageTitle"]').should('contain', 'Temporary Services');
      });
    });
  });
});
