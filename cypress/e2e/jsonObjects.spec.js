/// <reference types="cypress" />

describe('JSON objects', () => {

    it('JSON objects', () => {
        cy.openHomePage()

        const simpleObject = { "key": "value", "key2": "value2"}

        const simpleArrayOfValues = [ "one", "two", "three"]

        const arrayOfObjects = [{"key": "value"},{"key2": "value2"},{"key3": "value3"}]

        const typeOfData = {"String": "This is a string", "number": 18}

        const mix = {
            "FirstName": "Luis",
            "LastName": "Juarez",
            "Age": 37,
            "Students": [
                {
                    "firstName": "Sara",
                    "lastName": "Conor"
                },
                {
                    "firstName": "Bruce",
                    "lastName": "Willis"
                }
            ]
        }

        //ways to get the value of the keys
        console.log(simpleObject.key2)
        console.log(simpleObject['key2'])

        console.log(simpleArrayOfValues[1])

        console.log(arrayOfObjects[2].key3)

        console.log(mix.Students[0].firstName)

        const lastNameOfSecondStudent = mix.Students[1].lastName

    })

})