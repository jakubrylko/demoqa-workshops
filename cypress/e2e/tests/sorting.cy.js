/// <reference types="cypress" />
import SortingList_PO from '../../support/sort-list-po';
import SortingGrid_PO from '../../support/sort-grid-po';

describe('Sorting', () => {
    const sortingList_PO = new SortingList_PO;
    const sortingGrid_PO = new SortingGrid_PO;

    beforeEach(() => {
        cy.visit('/');
        cy.get('.card-body').contains('Interactions').click();
        cy.clickMenuTab('Sortable');
    });

    it('Set list in descending order', () => {
        sortingList_PO.assertList();
        sortingList_PO.sortList(6);
        // cy.pause();
        sortingList_PO.resetList();
        sortingList_PO.assertList();
    });

    it('Set any item on the top of the list', () => {
        sortingList_PO.sortList(5);
        // cy.pause();
        sortingList_PO.resetList();
        sortingList_PO.assertList();

        sortingList_PO.sortList(3);
        // cy.pause();
        sortingList_PO.resetList();
        sortingList_PO.assertList();
    });

    it('Set grid in descending order', () => {
        sortingGrid_PO.assertGrid();
        sortingGrid_PO.sortGrid(9);
        //cy.pause();
        sortingGrid_PO.resetGrid();
        sortingGrid_PO.assertGrid();
    });

    it('Set any item on the top of the grid', () => {
        sortingGrid_PO.assertGrid();
        sortingGrid_PO.sortGrid(7);
        //cy.pause();
        sortingGrid_PO.resetGrid();
        sortingGrid_PO.assertGrid();

        sortingGrid_PO.sortGrid(5);
        //cy.pause();
        sortingGrid_PO.resetGrid();
        sortingGrid_PO.assertGrid();

        sortingGrid_PO.sortGrid(3);
        //cy.pause();
        sortingGrid_PO.resetGrid();
        sortingGrid_PO.assertGrid();
    });
});