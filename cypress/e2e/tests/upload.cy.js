/// <reference types='cypress' />
import PracticeForm_PO from '../../support/practice-form-po';

describe('Upload different files', () => {
    const practiceForm_PO = new PracticeForm_PO();

    before(() => {
        cy.fixture('form.json').then($form => {
            globalThis.form = $form;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        cy.get('.card-body').contains('Forms').click();
        cy.clickMenuTab('Practice Form');
    });

    it('Upload audio file', () => {
        cy.get('#uploadPicture').selectFile('cypress/fixtures/upload/audio.mp3');
        practiceForm_PO.fillRequiredFields();
        cy.clickButton('Submit');

        cy.get("#example-modal-sizes-title-lg").should('have.text', 'Thanks for submitting the form');
        cy.get('tbody > :nth-child(8) > :nth-child(2)').should('contain', 'audio.mp3');
    });

    it('Upload exe file', () => {
        cy.get('#uploadPicture').selectFile('cypress/fixtures/upload/exe-file');
        practiceForm_PO.fillRequiredFields();
        cy.clickButton('Submit');

        cy.get("#example-modal-sizes-title-lg").should('have.text', 'Thanks for submitting the form');
        cy.get('tbody > :nth-child(8) > :nth-child(2)').should('contain', 'exe-file');
    });

    // it('Upload video file', () => {
    //     cy.get('#uploadPicture').selectFile('cypress/fixtures/upload/video.mp4');
    //     practiceForm_PO.fillRequiredFields();
    //     cy.clickButton('Submit');

    //     cy.get("#example-modal-sizes-title-lg").should('have.text', 'Thanks for submitting the form');
    //     cy.get('tbody > :nth-child(8) > :nth-child(2)').should('contain', 'video.mp4');
    // });

    it('Upload big file', () => {
        cy.get('#uploadPicture').selectFile('cypress/fixtures/upload/big-file.zip', { timeout: 60000 });
        practiceForm_PO.fillRequiredFields();
        cy.clickButton('Submit');

        cy.get("#example-modal-sizes-title-lg").should('have.text', 'Thanks for submitting the form');
        cy.get('tbody > :nth-child(8) > :nth-child(2)').should('contain', 'big-file.zip');
    });

});