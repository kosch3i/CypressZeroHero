import { navigateTo } from "../support/page_objects/navigationPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayaoutsPage"
import { onDatePickerPage } from "../support/page_objects/datepickerPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with page object', () => {

    beforeEach('open application', () => {
        cy.openHomePage()
    })

    it.skip('verify navigations across the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.tooltipPage()
    })

    it('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('test@test.com', 'password')
        cy.visit('/')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)

        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Luis', 'Juarez')
        onSmartTablePage.updateAgeByFirstName('Luis','37')
        onSmartTablePage.deleteRowByIndex(1)
    })
})