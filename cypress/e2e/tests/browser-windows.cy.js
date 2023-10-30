/// <reference types="cypress" />
import Selectors from '../../support/selectors';

describe('Browser windows', () => {
    before(() => {
        cy.log('Preparing fixtures...');
        cy.fixture('win-data.json').then($winData => {
            globalThis.winData = $winData;
        });
    });

    beforeEach(() => {
        cy.log('Accessing windows page...')
        cy.enterAlertsTile();
        cy.clickMenuTab('Browser Windows');
        cy.url().should('include', 'browser-windows');
    });

    it('Test new tab', () => {
        cy.stubWindow('New Tab');
        cy.visit(winData.winUrl);
        cy.assertWindow();
    });

    it('Test new window', () => {
        cy.stubWindow('New Window');
        cy.window().then(($win) => {
            $win.location.href = winData.winUrl;
            cy.assertWindow();
        });
    });

    it('Test new window message', () => {
        cy.window().then($win => {
            cy.stub($win, 'open').as('winMsg').callsFake(($url) => {
                return $win.open.wrappedMethod.call($win, $url, '_self');
            });
        });
        cy.clickButton('New Window Message');
        cy.get('@winMsg').should('be.calledOnce');
        cy.title().should('be.empty');
        cy.contains(winData.winMessage).should('be.visible');
    });
});