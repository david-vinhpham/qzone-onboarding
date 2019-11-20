import moment from 'moment-timezone';

describe('Calendar page', () => {
  describe('Admin user', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.login('dqn1810@gmail.com', 'Test@2019');
      cy.get('[data-test-id="dashboard-calendarNavLink"]').click();
    });

    it('should create temporary service successfully', () => {
      const firstDateNextMonth = moment().add(1, 'M').startOf('month');
      const avgServiceTime = 60;
      const description = 'This event is created from e2e tests by admin';

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000); // wait for loading service and location options
      cy.get('[data-test-id="newCalendarEventBtn"]').click();
      cy.get('[data-test-id="startDatePicker"]').click();
      cy.get('[data-test-id="startDateDialog"] .MuiPickersCalendarHeader-iconButton').last().click();
      cy.get('[data-test-id="startDateDialog"] button.MuiPickersDay-day[tabindex="0"]')
        .first()
        .click();
      cy.get('[data-test-id="startDateDialog"] .MuiDialogActions-root')
        .children()
        .last()
        .click();
      cy.get('[data-test-id="descriptionTextArea"] textarea').type(description);
      cy.get('[data-test-id="avgServiceTimeInput"] input').clear().type(avgServiceTime);
      cy.get('[data-test-id="createEventBtn"]').click();

      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-tmpServicesNavLink"]').click();
      cy.get('[data-test-id="tmpServiceStartTime"]').should(
        'contain',
        `${firstDateNextMonth.set('h', 8).set('m', 0).format('DD/MM/YYYY LT Z')}`
      );
      cy.get('[data-test-id="tmpServiceEndTime"]').should(
        'contain',
        `${firstDateNextMonth.set('h', 18).set('m', 0).format('DD/MM/YYYY LT Z')}`
      );
      cy.get('[data-test-id="tmpServiceDescription"]').should('contain', description);

      cy.get('[data-test-id="tmpServiceDeleteBtn"]').click({ force: true });
      cy.get('[data-test-id="confirmDeleteBtn"]').click();
      cy.get('[data-test-id="tableHeader"]').should('contain', 'Temporary Services');
    });
  });

  describe('Provider user', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.login('provider1@gmail.com', 'Test@2020');
      cy.get('[data-test-id="dashboard-calendarNavLink"]').click();
    });

    afterEach(() => {
      cy.visit('/');
      cy.login('dqn1810@gmail.com', 'Test@2019');
      cy.get('[data-test-id="dashboard-tmpServicesNavLink"]').click();
      cy.get('[data-test-id="tmpServiceDeleteBtn"]').click({ force: true });
      cy.get('[data-test-id="confirmDeleteBtn"]').click();
      cy.get('[data-test-id="tableHeader"]').should('contain', 'Temporary Services');
    });

    it('should create temporary service successfully', () => {
      const firstDateNextMonth = moment().add(1, 'M').startOf('month');
      const avgServiceTime = 60;
      const description = 'This event is created from e2e tests by provider';

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000); // wait for loading service and location options
      cy.get('[data-test-id="newCalendarEventBtn"]').click();
      cy.get('[data-test-id="startDatePicker"]').click();
      cy.get('[data-test-id="startDateDialog"] .MuiPickersCalendarHeader-iconButton').last().click();
      cy.get('[data-test-id="startDateDialog"] button.MuiPickersDay-day[tabindex="0"]')
        .first()
        .click();
      cy.get('[data-test-id="startDateDialog"] .MuiDialogActions-root')
        .children()
        .last()
        .click();
      cy.get('[data-test-id="descriptionTextArea"] textarea').type(description);
      cy.get('[data-test-id="avgServiceTimeInput"] input').clear().type(avgServiceTime);
      cy.get('[data-test-id="createEventBtn"]').click();

      cy.get('[data-test-id="dashboardNavLink"]').click();
      cy.get('[data-test-id="dashboard-tmpServicesNavLink"]').click();
      cy.get('[data-test-id="tmpServiceStartTime"]').should(
        'contain',
        `${firstDateNextMonth.set('h', 8).set('m', 0).format('DD/MM/YYYY LT Z')}`
      );
      cy.get('[data-test-id="tmpServiceEndTime"]').should(
        'contain',
        `${firstDateNextMonth.set('h', 18).set('m', 0).format('DD/MM/YYYY LT Z')}`
      );
      cy.get('[data-test-id="tmpServiceDescription"]').should('contain', description);
    });
  });
});
