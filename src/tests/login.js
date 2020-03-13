import loginPage from '../pages/loginPage'

describe('Login to qTest Manager', () => {
    const login = new loginPage();

    it('Navigate to qTest page successfully', () => {

        cy.visit(Cypress.env('url'))
        login.checkElementVisibleLoginPage()

    });
    it('Login to qTest Manager successfully', () => {

        login.loginAction(Cypress.env('username'), Cypress.env('password'))
        login.verifyLoginSuccessfully()

    });
})
