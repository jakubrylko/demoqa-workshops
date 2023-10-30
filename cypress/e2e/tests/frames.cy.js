/// <reference types="cypress" />
import Selectors from '../../support/selectors';

describe('Frames', () => {
    beforeEach(() => {
        cy.log('Accessing frames page...')
        cy.enterAlertsTile();
        cy.clickMenuTab('Frames');
        cy.url().should('include', 'frames');
    });

    it('Test Large frame content', () => {
        cy.wait(500);
        Selectors.largeFrame.then($frame => {
            const frameBody = $frame.contents().find('body');
            expect(frameBody).contain('This is a sample page');
        });
    });

    it('Test Small frame content', () => {
        cy.wait(500);
        Selectors.smallFrame.its('0.contentDocument.body').then(cy.wrap)
            .find('#sampleHeading').should('contain', 'This is a sample page');
    });
});
