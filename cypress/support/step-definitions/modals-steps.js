/// <reference types="cypress" />
import Selectors from '../../support/selectors';
import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

Before({ tags: '@Fixtures' }, () => {
    cy.log('Preparing fixtures...');
    cy.fixture('win-data.json').then($winData => {
        globalThis.winData = $winData;
    });
    cy.fixture('modal-copy.txt').then($copy => {
        globalThis.copy = $copy
    });
});

Given('I access DemoQA Modals menu page', () => {
    cy.enterAlertsTile();
    cy.clickMenuTab('Modal Dialogs');
    cy.url().should('include', 'modal-dialogs');
});

// Scenario 1
When('I click on the Small modal button', () => {
    cy.clickButton('Small modal');
});

Then('I can see Small modal', () => {
    Selectors.modalContent.should('be.visible');
});

And('Its content matches json file', () => {
    Selectors.modalHeader.contains(winData.modalHeader);
    Selectors.modalBody.contains(winData.modalBody);
    cy.clickButton('Close');
});

// Scenario 2
When('I click on the Large modal button', () => {
    cy.clickButton('Large modal');
});

Then('I can see Large modal', () => {
    Selectors.modalContent.should('be.visible');
});

And('Its content matches txt file', () => {
    Selectors.modalBody.contains(copy);
    cy.clickButton('Close');
});