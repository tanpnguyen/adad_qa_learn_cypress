import loginSelector from '../selectors/loginPage.json'
import loginPage from '../pages/loginPage'
describe('Login to qTest Manager', () => {
    const login = new loginPage();

    it('Navigate to qTest page successfully', () => {

        cy.visit(Cypress.env('url'))
        login.checkElementVisibleLoginPage()

    });
    it('Login to qTest Manager successfully', () => {

        login.loginAction('nephelelocal@gmail.com', 'admin123')

    });
})