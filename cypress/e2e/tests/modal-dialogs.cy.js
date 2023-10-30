/// <reference types="cypress" />
import Selectors from '../../support/selectors';

describe('Modal dialogs', () => {
    before(() => {
        cy.log('Preparing fixtures...');
        cy.fixture('win-data.json').then($winData => {
            globalThis.winData = $winData;
        });
        cy.fixture('modal-copy.txt').then($copy => {
            globalThis.copy = $copy
        });
    });
    
    beforeEach(() => {
        cy.log('Accessing modals page...')
        cy.enterAlertsTile();
        cy.clickMenuTab('Modal Dialogs');
        cy.url().should('include', 'modal-dialogs');
    });

    it('Test small modal content', () => {
        cy.clickButton('Small modal');
        Selectors.modalContent.should('be.visible');
        Selectors.modalHeader.contains(winData.modalHeader);
        Selectors.modalBody.contains(winData.modalBody);
        cy.clickButton('Close');
    });

    it('Test large modal content', () => {
        cy.clickButton('Large modal');
        Selectors.modalContent.should('be.visible');
        Selectors.modalBody.contains(copy);
        cy.clickButton('Close');
    });
});