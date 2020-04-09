import loginPage from '../../src/pages/login/loginPage.js'
Cypress.Commands.add('login', (username, password) => {
    const login = new loginPage()
    cy
        .visit(Cypress.env('url'))
    login.loginAction(username, password)

});