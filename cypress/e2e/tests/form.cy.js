/// <reference types="cypress" />
import Selectors from '../../support/selectors';
import PracticeForm_PO from '../../support/practice-form-po';

describe('Practice form', () => {
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

    it('Fill the form', () => {
        cy.get('#firstName').type(form.firstName);
        cy.get('#lastName').type(form.lastName);
        cy.get('#userEmail').type(form.email);
        cy.get('#genterWrapper').contains(form.gender).click();
        cy.get('#userNumber').type(form.number);

        practiceForm_PO.setDate(form.birthDate[0], form.birthDate[1], form.birthDate[2]);
        practiceForm_PO.chooseSubjects(...form.subjects);
        practiceForm_PO.chooseHobbies(...form.hobbies);

        cy.get('#uploadPicture').selectFile('cypress/fixtures/upload/beach.jpg');
        cy.get('#currentAddress').type(form.address);

        practiceForm_PO.stateCity(form.state, form.city);
        cy.clickButton('Submit').then(() => {
            practiceForm_PO.createCSV();
            practiceForm_PO.createJSON();
            cy.fixture('answers.json').then($answers => {
                globalThis.answers = $answers;
                practiceForm_PO.assertJSON();
            });
        });
    });

    it('Check required fields', { retries: { openMode: 1 } }, () => {
        cy.clickButton('Submit');
        practiceForm_PO.validateField('firstName');
        practiceForm_PO.validateField('lastName');
        practiceForm_PO.validateField('userNumber');
        practiceForm_PO.validateInput();

        practiceForm_PO.fillRequiredFields();
        cy.clickButton('Submit');
        cy.get("#example-modal-sizes-title-lg").should('have.text', 'Thanks for submitting the form');
        cy.get(".table").should('be.visible');
    });

    it('Check invalid data', () => {
        cy.clickButton('Submit');

        cy.get('#userEmail').type('test')
            .should('have.css', 'border-color', 'rgb(220, 53, 69)').clear();
        cy.get('#userEmail').type('test@')
            .should('have.css', 'border-color', 'rgb(220, 53, 69)').clear();
        cy.get('#userEmail').type('test@test')
            .should('have.css', 'border-color', 'rgb(220, 53, 69)').clear();
        cy.get('#userEmail').type('test@test.com')
            .should('have.css', 'border-color', 'rgb(40, 167, 69)');

        cy.get('#userNumber').then(userNumber => {
            expect(userNumber).to.have.attr('minlength', 10);
            expect(userNumber).to.have.attr('maxlength', 10);
            cy.wrap(userNumber).type('01234567891');
        });

        cy.get('#firstName').type(form.firstName);
        cy.get('#lastName').type(form.lastName);
        cy.get('#genterWrapper').contains(form.gender).click();
        cy.clickButton('Submit');

        cy.get('tbody > :nth-child(4) > :nth-child(2)').then(cell => {
            expect(cell.text().length).to.equal(10);
            expect(cell.text()).not.to.eql('01234567891');
        });
    });
});