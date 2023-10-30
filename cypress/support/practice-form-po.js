import Selectors from './selectors';

class PracticeForm_PO {

    setDate(day, month, year) {
        cy.get('#dateOfBirthInput').click();
        cy.get('.react-datepicker__month-select').select(month);
        cy.get('.react-datepicker__year-select').select(year);
        cy.xpath(`//*[contains(@aria-label, '${month}')][text()='${day}']`).click();
    };

    chooseSubjects(...subjects) {
        subjects.forEach(subject => {
            cy.get('#subjectsWrapper').type(subject.substr(0, 1));
            cy.get('.subjects-auto-complete__menu-list > *').each(($el, index, $list) => {
                if ($el.text() === subject) {
                    $el.trigger('click');
                };
            });
        });
    };

    assertSubjects() {
        let subjects = answers.Subjects.split(', ');
        expect(subjects).to.eql(form.subjects);
    };

    chooseHobbies(...hobbies) {
        hobbies.forEach(hobby => {
            cy.get('#hobbiesWrapper').contains(hobby).click();
        });
    };

    assertHobbies() {
        let hobbies = answers.Hobbies.split(', ');
        expect(hobbies).to.eql(form.hobbies);
    };

    stateCity(state, city) {
        cy.get('#state').click();
        cy.get('div.css-26l3qy-menu').contains(state).click().then(() => {
            cy.get('#city').click();
            cy.get('div.css-26l3qy-menu').contains(city).click();
        });
    };

    createJSON() {
        let data = {};
        cy.get(".table > tbody > tr").then(($tr) => {
            $tr.each((index, $el) => {
                let key = $el.cells[0].innerText;
                let value = $el.cells[1].innerText;
                data[key] = value;
            });
            let jsonData = JSON.stringify(data, null, 4);
            cy.writeFile("cypress/fixtures/answers.json", jsonData);
        });
    };

    createCSV() {
        cy.get('.table').find('tr').then($rows => {
            const rows = $rows.get();
            const data = rows.map(row => {
                return Array.from(row.children).map(cell => cell.textContent.replace(/\n/g, ' '));
            });
            let csvContent = data.map(row => row.join(',')).join('\n');
            cy.writeFile("cypress/fixtures/answers.csv", csvContent);
        });
    };

    assertJSON() {
        expect(answers['Student Name']).to.eql(`${form.firstName} ${form.lastName}`);
        expect(answers['Student Email']).to.eql(form.email);
        expect(answers.Gender).to.eql(form.gender);
        expect(answers.Mobile).to.eql(form.number);
        expect(answers['Date of Birth']).includes(`${form.birthDate[0]} ${form.birthDate[1]},${form.birthDate[2]}`);
        this.assertSubjects();
        this.assertHobbies();
        expect(answers.Picture).to.eql(`beach.jpg`);
        expect(answers.Address).includes(form.address.replace(/{enter}/g, ' '));
        expect(answers['State and City']).to.eql(`${form.state} ${form.city}`);
    };

    validateField(field) {
        cy.get((`#${field}`)).then(field => {
            expect(field).to.have.attr('required');
            expect(field.css('border-color')).to.equal('rgb(220, 53, 69)');
        });
    };

    validateInput() {
        cy.get('#genterWrapper').find('label').then($labels => {
            $labels.each((index, label) => {
                cy.wrap(label).should('have.css', 'border-color', 'rgb(220, 53, 69)');
            });
        });
        cy.get('#genterWrapper').find('input').then($inputs => {
            $inputs.each((index, input) => {
                cy.wrap(input).should('have.attr', 'required');
            });
        });
    };

    fillRequiredFields() {
        cy.get('#firstName').type(form.firstName);
        cy.get('#lastName').type(form.lastName);
        cy.get('#genterWrapper').contains(form.gender).click();
        cy.get('#userNumber').type(form.number);
    };
};

export default PracticeForm_PO;