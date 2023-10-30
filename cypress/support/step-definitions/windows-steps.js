/// <reference types="cypress" />
import Selectors from '../../support/selectors';
import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

Given('I access DemoQA Windows menu page', () => {
    cy.enterAlertsTile();
    cy.clickMenuTab('Browser Windows');
    cy.url().should('include', 'browser-windows');
});

// Scenario 1
When('I click on the New Tab button', () => {
    cy.stubWindow('New Tab');
});

Then('I can see content in new tab', () => {
    cy.visit(winData.winUrl);
    cy.assertWindow();
});

// Scenario 2
When('I click on the New Window button', () => {
    cy.stubWindow('New Window');
});

Then('I can see content in new window', () => {
    cy.window().then(($win) => {
        $win.location.href = winData.winUrl;
        cy.assertWindow();
    });
});

// Scenario 3
When('I click on the New Window Message button', () => {
    cy.window().then($win => {
        cy.stub($win, 'open').as('winMsg').callsFake(($url) => {
            return $win.open.wrappedMethod.call($win, $url, '_self');
        });
    });
    cy.clickButton('New Window Message');
});

Then('I can see message in new window', () => {
    cy.get('@winMsg').should('be.calledOnce');
    cy.title().should('be.empty');
    cy.contains(winData.winMessage).should('be.visible');
});