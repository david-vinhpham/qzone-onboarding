describe('Dasboard page', () => {
  describe('Admin user', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.login('dqn1810@gmail.com', 'Test@2019');
    });

    it('should navigate to all management pages successfully', () => {
      // organization list page
      cy.get('[data-test-id="dashboard-orgListNavLink"]').click();
      cy.url().should('include', '/organization/list');
      cy.get('h4').first().should('contain', 'Organization List');

      // business location list page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-locationListNavLink"]').click();
      cy.url().should('include', '/location/list');
      cy.get('h4').first().should('contain', 'Location List');

      // manage services page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-serviceListNavLink"]').click();
      cy.url().should('include', '/services/list');
      cy.get('h4').first().should('contain', 'Service List');

      // service categories page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-sCategoryNavLink"]').click();
      cy.url().should('include', '/service-categories');
      cy.get('h4').first().should('contain', 'Service Category List');

      // business categories page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-bCategoryNavLink"]').click();
      cy.url().should('include', '/business-categories');
      cy.get('h4').first().should('contain', 'Business Category List');

      // provider list page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-providerListNavLink"]').click();
      cy.url().should('include', '/provider/list');
      cy.get('h4').first().should('contain', 'Provider List');

      // email templates page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-emailTemplatesNavLink"]').click();
      cy.url().should('include', '/email-templates');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Email Templates');

      // assessments page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-assessmentsNavLink"]').click();
      cy.url().should('include', '/assessments');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Assessments');
    });

    it('should navigate to all operation pages successfully', () => {
      // customer service page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-customerServiceNavLink"]').click();
      cy.url().should('include', '/customer-service');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Customer Service');

      // calendar page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-calendarNavLink"]').click();
      cy.url().should('include', '/calendar');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Manage Calendar');

      // temporary services page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-tmpServicesNavLink"]').click();
      cy.url().should('include', '/tmp-services');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Temporary Services');

      // chart page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-chartNavLink"]').click();
      cy.url().should('include', '/chart');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Chart');

      // report page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-reportsNavLink"]').click();
      cy.url().should('include', '/reports');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Reports');
    });

    it('should navigate to profile pages successfully', () => {
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-profileNavLink"]').click();
      cy.url().should('include', '/profile');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Profile');
    });
  });

  describe('Provider user', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.login('provider1@gmail.com', 'Test@2020');
    });

    it('should navigate to all operation pages successfully', () => {
      // customer service page
      cy.get('[data-test-id="dashboard-customerServiceNavLink"]').click();
      cy.url().should('include', '/customer-service');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Customer Service');

      // calendar page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-calendarNavLink"]').click();
      cy.url().should('include', '/calendar');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Manage Calendar');

      // temporary services page
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-tmpServicesNavLink"]').click();
      cy.url().should('include', '/tmp-services');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Temporary Services');
    });

    it('should navigate to profile pages successfully', () => {
      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-profileNavLink"]').click();
      cy.url().should('include', '/profile');
      cy.get('[data-test-id="pageTitle"]').should('contain', 'Profile');
    });
  });
});
