/// <reference types="cypress" />
import Selectors from '../../support/selectors';

describe('Alerts', () => {
    beforeEach(() => {
        cy.log('Accessing alerts page...')
        cy.enterAlertsTile();
        cy.clickMenuTab('Alerts');
        cy.url().should('include', 'alerts');
    });

    it('Click first button to see alert', () => {
        cy.clickButton('Click me', 0);
        cy.on('window:alert', string => {
            expect(string).to.equal('You clicked a button');
        });
    });

    it('Click second button, alert will appear after 5 seconds', () => {
        let startTime, alertTime;

        cy.window().then($win => {
            cy.stub($win, 'alert').as('alert');
        });
        cy.clickButton('Click me', 1).then(() => {
            startTime = Date.now();
        });
        cy.get('@alert').should('have.been.calledOnceWithExactly', 'This alert appeared after 5 seconds').then(() => {
            alertTime = Date.now() - startTime;
            expect(alertTime).least(4800);
            cy.log('Alert time: ' + alertTime + 'ms');
        });
    });

    it('Click third button, confirm box will appear', () => {
        cy.clickButton('Click me', 2);
        cy.on('window:confirm', string => {
            expect(string).to.equal('Do you confirm action?');
            return true;
        }).then(() => {
            Selectors.confirmResult.should('have.text', 'You selected Ok');
        }).then(() => {
            cy.clickButton('Click me', 2);
            cy.on('window:confirm', () => {
                return false;
            }).then(() => {
                Selectors.confirmResult.should('have.text', 'You selected Cancel');
            });
        });
    });

    it('Click fourth button, prompt box will appear', () => {
        const name = 'Kuba';

        cy.window().then(($win) => {
            cy.stub($win, 'prompt').returns(name);
            cy.clickButton('Click me', 3);
        }).then(() => {
            Selectors.promptResult.should('contain', name);
        });
    });
});