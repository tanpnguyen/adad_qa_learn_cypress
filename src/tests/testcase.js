import adminpage from '../pages/adminPage'

describe('qTest Manager - Test Design', () => {
    const admin = new adminpage();
    //let projectName: String;

    it('Log in and create new Project', () => {
        cy.clearCookies()
        cy.login(Cypress.env('username'), Cypress.env('password'))
        admin.navigateToAdminPage()
        admin.verifyNavigateSuccessfully()
        admin.navigateToProjectsTab()
        admin.createNewProject('ADADTH_Cypress_Projects')
    });
})