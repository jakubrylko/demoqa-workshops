import Selectors from '../support/selectors';

Cypress.Commands.add('clickMenuTab', tabName => {
    cy.get('.menu-list').contains(tabName).click();
});

Cypress.Commands.add('clickButton', (buttonName, buttonIndex) => {
    if (buttonIndex === undefined) { buttonIndex = 0; };
    //cy.get(`.btn-primary:contains('${buttonName}')`).eq(buttonIndex).click();
    cy.get('.btn-primary').contains(buttonName).eq(buttonIndex).click();
});

Cypress.Commands.add('enterAlertsTile', () => {
    cy.visit("/");
    Selectors.alertsTile.click();
    cy.url().should('include', 'alertsWindows');
})

Cypress.Commands.add('stubWindow', (buttonName, aliasName) => {
    if (aliasName === undefined) { aliasName = buttonName; };
    cy.window().then(($win) => {
        cy.stub($win, 'open').as(aliasName);
        cy.clickButton(buttonName);
        cy.get(`@${aliasName}`).should('be.calledOnce');
    });
});

Cypress.Commands.add('assertWindow', () => {
    cy.url().should('include', winData.winUrl);
    cy.title().should('be.empty');
    Selectors.sampleHeading.contains(winData.winHeading);
});