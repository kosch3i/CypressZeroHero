export class SmartTablePage{

    updateAgeByFirstName(firtName, age){
        //1 get the row by text
        cy.get('tbody').contains('tr', firtName).then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            //cy.wrap(tableRow).find('td').eq(6).should('contain', age)
            cy.wrap(tableRow).find('td').last().should('contain', age)
        })
    }

    addNewRecordWithFirstAndLastName(firtName, lastName){
        //2 get the row by index
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Luis')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Juarez')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Luis')
            cy.wrap(tableColumns).eq(3).should('contain', 'Juarez')
        })
    }

    deleteRowByIndex(index){
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then( () => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
    }
}

export const onSmartTablePage = new SmartTablePage()