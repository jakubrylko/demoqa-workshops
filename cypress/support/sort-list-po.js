import Selectors from './selectors';

class SortingList_PO {
    assertList() {
        let listIndex = [];

        Selectors.listItem.each(($el) => {
            listIndex.push($el.text());
        }).then(() => {
            for (let i = 0; i < listIndex.length; i++) {
                Selectors.listItem.eq(i).should('contain', listIndex[i]);
            };
        });
    };

    sortList(number) {
        let listIndex = [];

        Selectors.listItem.each(($el) => {
            listIndex.push($el.text());
        }).then(() => {
            for (let i = 0; i < listIndex.length; i++) {
                Selectors.listItem.eq(i).should('contain', listIndex[i]);
            };
    
            if (number === 6) {
                for (let i = 0; i < listIndex.length; i++) {
                    Selectors.listItem.eq(5).trigger('mousedown', { which: 1 });
                    Selectors.listItem.eq(i).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                };
                Selectors.listItem.eq(0).should('contain', 'Six');
                Selectors.listItem.eq(5).should('contain', 'One');
            } else {
                for (let i = number - 1; i < listIndex.length; i++) {
                    Selectors.listItem.eq(5).trigger('mousedown', { which: 1 });
                    Selectors.listItem.eq(0).trigger('mousemove').trigger('mouseup');
                };
                Selectors.listItem.eq(0).should('contain', listIndex[number - 1]);
            };
        });
    };

    resetList() {
        let listIndex = [];

        Selectors.listItem.each(($el) => {
            listIndex.push($el.text());
        }).then(() => {
            for (let i = 0; i < listIndex.length; i++) {
                switch (listIndex[i]) {
                    case 'One':
                        Selectors.listItem.contains('One').trigger('mousedown', { which: 1 });
                        Selectors.listItem.eq(0).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Two':
                        Selectors.listItem.contains('Two').trigger('mousedown', { which: 1 });
                        Selectors.listItem.eq(1).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Three':
                        Selectors.listItem.contains('Three').trigger('mousedown', { which: 1 });
                        Selectors.listItem.eq(2).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Four':
                        Selectors.listItem.contains('Four').trigger('mousedown', { which: 1 });
                        Selectors.listItem.eq(3).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Five':
                        Selectors.listItem.contains('Five').trigger('mousedown', { which: 1 });
                        Selectors.listItem.eq(4).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                    case 'Six':
                        Selectors.listItem.contains('Six').trigger('mousedown', { which: 1 });
                        Selectors.listItem.eq(5).trigger('mousemove', { force: true }).trigger('mouseup', { force: true });
                        break;
                };
            };
        });
    };
};

export default SortingList_PO;