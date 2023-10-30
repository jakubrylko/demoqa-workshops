import Selectors from './selectors';

class SortingGrid_PO {
    assertGrid() {
        let gridIndex = [];

        cy.get('#demo-tab-grid').click();
        Selectors.gridItem.each(($el) => {
            gridIndex.push($el.text());
        }).then(() => {
            for (let i = 0; i < gridIndex.length; i++) {
                Selectors.gridItem.eq(i).should('have.text', gridIndex[i]);
            };
        })
    };

    sortGrid(number) {
        let gridIndex = [];

        Selectors.gridItem.each(($el) => {
            gridIndex.push($el.text());
        }).then(() => {
            for (let i = 0; i < gridIndex.length; i++) {
                Selectors.gridItem.eq(i).should('have.text', gridIndex[i]);
            };

            if (number === 9) {
                for (let i = 0; i < gridIndex.length; i++) {
                    Selectors.gridItem.eq(8).trigger('mousedown', { which: 1 });
                    Selectors.gridItem.eq(i).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                };
                Selectors.gridItem.eq(0).should('have.text', 'Nine');
                Selectors.gridItem.eq(8).should('have.text', 'One');
            } else {
                for (let i = number - 1; i < gridIndex.length; i++) {
                    Selectors.gridItem.eq(8).trigger('mousedown', { which: 1 });
                    Selectors.gridItem.eq(0).trigger('mousemove').trigger('mouseup');
                };
                Selectors.gridItem.eq(0).should('have.text', gridIndex[number - 1]);
            }
        })
    };

    resetGrid() {
        let gridIndex = [];

        Selectors.gridItem.each(($el) => {
            gridIndex.push($el.text());
        }).then(() => {
            for (let i = 0; i < gridIndex.length; i++) {
                switch (gridIndex[i]) {
                    case 'One':
                        Selectors.gridItem.contains('One').trigger('mousedown', { which: 1 });
                        Selectors.gridItem.eq(0).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Two':
                        Selectors.gridItem.contains('Two').trigger('mousedown', { which: 1 });
                        Selectors.gridItem.eq(1).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Three':
                        Selectors.gridItem.contains('Three').trigger('mousedown', { which: 1 });
                        Selectors.gridItem.eq(2).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Four':
                        Selectors.gridItem.contains('Four').trigger('mousedown', { which: 1 });
                        Selectors.gridItem.eq(3).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Five':
                        Selectors.gridItem.contains('Five').trigger('mousedown', { which: 1 });
                        Selectors.gridItem.eq(4).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Six':
                        Selectors.gridItem.contains('Six').trigger('mousedown', { which: 1 });
                        Selectors.gridItem.eq(5).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Seven':
                        Selectors.gridItem.contains('Seven').trigger('mousedown', { which: 1 });
                        Selectors.gridItem.eq(6).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Eight':
                        Selectors.gridItem.contains('Eight').trigger('mousedown', { which: 1 });
                        Selectors.gridItem.eq(7).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Nine':
                        Selectors.gridItem.contains('Nine').trigger('mousedown', { which: 1 });
                        Selectors.gridItem.eq(8).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                };
            };
        });
    };
};

export default SortingGrid_PO;