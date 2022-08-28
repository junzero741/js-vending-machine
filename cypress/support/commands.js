// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('submitProductForm', (productName, productPrice, productQuantity) => {
	cy.get('products-manage-menu').shadow().find('#product-name-input').type(productName)
	cy.get('products-manage-menu').shadow().find('#product-price-input').type(productPrice)
	cy.get('products-manage-menu').shadow().find('#product-quantity-input').type(productQuantity)
	cy.get('products-manage-menu').shadow().find('#product-add-button').click()
})
