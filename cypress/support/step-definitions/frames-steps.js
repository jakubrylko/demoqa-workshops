/// <reference types="cypress" />
import Selectors from '../../support/selectors';
import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

Given('I access DemoQA Alerts Windows page', () => {
    cy.enterAlertsTile();
});

When('I click on the frames menu', () => {
    cy.clickMenuTab('Frames');
    cy.url().should('include', 'frames');
});

Then('I can see a {word} frame', (size) => {
    if (size === 'Large') {
        Selectors.largeFrame.should('be.visible');
    } else {
        Selectors.smallFrame.should('be.visible');
    };
});

And('{word} frame has a content This is a sample page', (size) => {
    if (size === 'Large') {
        cy.wait(500);
        Selectors.largeFrame.then($frame => {
            const frameBody = $frame.contents().find('body');
            expect(frameBody).contain('This is a sample page');
        });
    } else {
        cy.wait(500);
        Selectors.smallFrame.its('0.contentDocument.body').then(cy.wrap)
            .find('#sampleHeading').should('contain', 'This is a sample page');
    };
});