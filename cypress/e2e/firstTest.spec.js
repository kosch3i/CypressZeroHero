/// <reference types="cypress" />

describe('First test suite', () => {

    /* We can add nested describes
    describe('suite sections', () => {  

        beforeEach('login', () => {
            //repeat for every test
        })

        it('First test', () => {
            //put the code of the test
        })
    
        it('Second test', () => {
            //put the code of the test
        })
    })
    */

    it('First test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //find by tag name
        cy.get('input')

        //find by ID
        cy.get('#inputEmail1')

        //by class
        cy.get('.input-full-width')

        //by HTML Attribute name
        cy.get('[fullwidth]')

        //by HTML attr name and value
        cy.get('[placeholder="Email"]')

        //by entire class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by 2 attributes
        cy.get('[placeholder="Email"][fullwidth]')

        //by tag, attr, id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //by cypress test ID MOST RECOMENDED WAY is add data-cy 
        cy.get('[data-cy="imputEmail1"]')

    })

   
    it('Second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //Theory
        // cy.get() - find elements on the page by locator globally
        // .find() - find child elements by locator
        // contains() - find HTML text and by text and locator - looking for the first match

        cy.contains('Sign in')
        cy.contains('[status="warning"]','Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')   //will find the child
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')   //will find the child
        cy.contains('nb-card', 'Horizontal form').get('button')   // get always will find all the elements in the page


        //cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    })

     
    it('Save subject of the command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')

        //CANT DO THINGS LIKE THIS
        //const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        //usingTheGrid.find('[for="inputEmail1"]').should('contain','Email')
        //usingTheGrid.find('[for="inputPassword2"]').should('contain','Password')

        // 1 Cypress Alies   -  kind of global variable
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain','Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain','Password')

        // 2 Cypress then() methods   
        //usingTheGridForm is a JQUERY object it needs to convert to Cypress object using cy.wrap
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain','Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain','Password')
        })
    })

    it('extract text values', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email address')
            cy.wrap(labelText).should('contain', 'Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })
        cy.get('[for="exampleInputEmail1"]').invoke('text').should('contain', 'Email address')
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('textLabel').should('contain', 'Email address')

        //4
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        //5 invoke property
        cy.get('#exampleInputEmail1').type('luis.juarez@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value').should('contain','luis.juarez@test.com').then( propertyValue => {
            expect(propertyValue).to.equal('luis.juarez@test.com')
        })
    })

    it('radio button', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({force: true})
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })

    })

    it('checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).click({force: true}).should('not.be.checked')
    })

    it('Datepicker', () => {
        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            console.log(date)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttr => {
                if (!dateAttr.includes(futureMonth) || !dateAttr.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
                }
            })

            return dateToAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card','Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            const dateToAssert = selectDayFromCurrent(10)
            cy.wrap(input).invoke('prop','value').should('contain',dateToAssert)
            cy.wrap(input).should('have.value',dateToAssert)
        })

    })

    it('List and dropdowns', () => {
        cy.visit('/')

        //cy.get('nav').find('nb-select').click()

        //1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain','Dark')

        //2
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem,index) => {
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain',itemText)

                if (index < 3) {
                    cy.wrap(dropdown).click()
                }
            })

        })

    })

    it('Tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1 get the row by text
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(33)
            cy.wrap(tableRow).find('.nb-checkmark').click()
            //cy.wrap(tableRow).find('td').eq(6).should('contain', '33')
            cy.wrap(tableRow).find('td').last().should('contain', '33')
        })

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

        //3 Get each row validation
        const age = [20,30,40,200]
        cy.wrap(age).each( age =>{
            cy.get('thead').find('[placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRows => {
                if (age == 200) {
                    cy.wrap(tableRows).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRows).find('td').last().should('contain', age)
                }
                
            })
        })
        
    })

    it('tooltip', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it.only('dialog box', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })

        // //2
        // const stub = cy.stub()
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then( () => {
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })

        //3
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)
    })
    
})

/* we can add more describe sections in the same file
describe('Second test suite', () => {

    it('First test', () => {
        //put the code of the test
    })

    it('Second test', () => {
        //put the code of the test
    })

    it('Third test', () => {
        //put the code of the test
    })

})
    */