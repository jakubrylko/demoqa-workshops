class Selectors {
    get alertsTile() {
        return cy.get('.card-body').contains('Alerts, Frame & Windows');
    };
    get confirmResult() {
        return cy.get('#confirmResult');
    };
    get promptResult() {
        return cy.get('#promptResult');
    };
    get largeFrame() {
        return cy.get('#frame1');
    };
    get smallFrame() {
        return cy.get('#frame2');
    };
    get modalContent() {
        return cy.get('.modal-content');
    };
    get modalHeader() {
        return cy.get('.modal-header');
    };
    get modalBody() {
        return cy.get('.modal-body');
    };
    get sampleHeading() {
        return cy.get('#sampleHeading');
    };
    get listItem() {
        return cy.get('.vertical-list-container > .list-group-item');
    };
    get gridItem() {
        return cy.get('.create-grid > .list-group-item');
    };
};

export default new Selectors();