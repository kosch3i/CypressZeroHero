describe('Shadow root', () => {
    it('Working with shadow', () => {
        cy.visit('https://radogado.github.io/shadow-dom-demo/')

        cy.get('#app').shadow().find('#container')
    })
})