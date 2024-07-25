/// <reference types="cypress" />

describe('Test log out', () => {
    beforeEach('login to the app', () => {
        cy.loginToApplication()
    })

    it('verify user can logout successfully', {retries: 0}, () => {
        cy.contains('Settings').click()
        cy.contains('Or click here to logout').click()
        cy.get('.navbar-nav').should('contain', 'Sign up')
    })
                                                        //{browser: ['!chrome', '!edge']}
    it('verify user can logout successfully in chrome', {browser: 'chrome'}, () => {
        cy.contains('Settings').click()
        cy.contains('Or click here to logout').click()
        cy.get('.navbar-nav').should('contain', 'Sign up')
    })
})