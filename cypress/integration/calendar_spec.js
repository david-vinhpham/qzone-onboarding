describe('Calendar page', () => {
  describe('Admin user', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.login('dqn1810@gmail.com', 'Test@2019');
      cy.get('[data-test-id="calendarNavLink"]').click();
    });

    it('should create temporary service successfully', () => {
      const today = new Date();
      const currentDate = today.getDate();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();
      const avgServiceTime = 60;
      const description = 'This event is created from e2e tests';

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      cy.get('[data-test-id="newCalendarEventBtn"]').click();
      cy.get('[data-test-id="startDatePicker"]').click();
      cy.get('[data-test-id="startDateDialog"] .MuiPickersDay-daySelected')
        .parent()
        .next()
        .children('.MuiPickersDay-day')
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
        `${currentDate + 1}/${currentMonth}/${currentYear} 08:00 AM +07:00`
      );
      cy.get('[data-test-id="tmpServiceEndTime"]').should(
        'contain',
        `${currentDate + 1}/${currentMonth}/${currentYear} 06:00 PM +07:00`
      );
      cy.get('[data-test-id="tmpServiceDescription"]').should('contain', description);
      cy.get('[data-test-id="tmpServiceDeleteBtn"]').should('have.length', 1);

      cy.get('[data-test-id="tmpServiceDeleteBtn"]').click();
      cy.get('[data-test-id="confirmDeleteBtn"]').click();
    });
  });
});
