/// <reference types="cypress" />
import Selectors from '../../support/selectors';
import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

const name = 'Kuba';
let stub, startTime, alertTime;

Before({ tags: '@Stub' }, () => {
    cy.log('Preparing stub...');
    stub = cy.stub();
});

Given('I access DemoQA Alerts menu page', () => {
    cy.enterAlertsTile();
    cy.clickMenuTab('Alerts');
    cy.url().should('include', 'alerts');
});

// Scenario 1
When('I click on the first Click Me button', () => {
    cy.clickButton('Click me', 0);
    cy.on('window:alert', stub);
});

Then('I should see the message You clicked a button', () => {
    expect(stub.getCall(0)).to.be.calledWith('You clicked a button');
});

// Scenario 2
When('I click on the second Click Me button', () => {
    cy.window().then($win => {
        cy.stub($win, "alert").as("alert");
    });
    cy.clickButton('Click me', 1).then(() => {
        startTime = Date.now();
    });
});

And('I wait 5 seconds', () => {
    cy.get("@alert").should('have.been.calledOnce').then(() => {
        alertTime = Date.now() - startTime;
        expect(alertTime).least(4900);
        cy.log('Alert time: ' + alertTime + 'ms');
    });
});

Then('I should see the message This alert appeared after 5 seconds', () => {
    cy.get("@alert").should('be.calledWith', 'This alert appeared after 5 seconds');
});

// Scenario 3
When('I click on the third Click Me button', () => {
    cy.clickButton('Click me', 2);
    cy.on('window:confirm', stub).then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
    });
});

And('I click on the {word} button', (button) => {
    cy.clickButton('Click me', 2);
    if (button === 'Ok') {
        cy.on('window:confirm', () => {
            return true;
        });
    } else {
        cy.on('window:confirm', () => {
            return false;
        });
    };
});

Then('I should see the message You selected {word}', (button) => {
    Selectors.confirmResult.should('contain', `You selected ${button}`);
});

// Scenario 4
When('I click on the fourth Click Me button', () => {
    
});

And('I enter my name', () => {
    cy.window().then(($win) => {
        cy.stub($win, 'prompt').returns(name);
        cy.clickButton('Click me', 3);
    });
});

Then('I should see the message that contains my name', () => {
    Selectors.promptResult.should('contain', name);
});