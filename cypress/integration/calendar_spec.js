import moment from 'moment-timezone';

describe('Calendar page', () => {
  describe('Admin user', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.login('dqn1810@gmail.com', 'Test@2019');
      cy.get('[data-test-id="calendarNavLink"]').click();
    });

    it('should create temporary service successfully', () => {
      const firstDateNextMonth = moment().add(1, 'M').startOf('month');
      const avgServiceTime = 60;
      const description = 'This event is created from e2e tests';

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      cy.get('[data-test-id="newCalendarEventBtn"]').click();
      cy.get('[data-test-id="startDatePicker"]').click();
      cy.get('[data-test-id="startDateDialog"] .MuiPickersCalendarHeader-iconButton').last().click();
      cy.get('[data-test-id="startDateDialog"] button.MuiPickersDay-day')
        .first()
        .click();
      cy.get('[data-test-id="startDateDialog"] .MuiDialogActions-root')
        .children()
        .last()
        .click();
      cy.get('[data-test-id="descriptionTextArea"] textarea').type(description);
      cy.get('[data-test-id="avgServiceTimeInput"] input').clear().type(avgServiceTime);
      cy.get('[data-test-id="createEventBtn"]').click();
      cy.get('[data-test-id="tmpServicesNavLink"]').click();

      cy.get('[data-test-id="tmpServiceStartTime"]').should(
        'contain',
        `${firstDateNextMonth.set('h', 8).set('m', 0).format('DD/MM/YYYY LT Z')}`
      );
      cy.get('[data-test-id="tmpServiceEndTime"]').should(
        'contain',
        `${firstDateNextMonth.set('h', 18).set('m', 0).format('DD/MM/YYYY LT Z')}`
      );
      cy.get('[data-test-id="tmpServiceDescription"]').should('contain', description);

      cy.get('[data-test-id="tmpServiceDeleteBtn"]').click();
      cy.get('[data-test-id="confirmDeleteBtn"]').click();
    });
  });
});
