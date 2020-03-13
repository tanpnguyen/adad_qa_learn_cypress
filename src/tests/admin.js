import adminpage from '../pages/adminPage'
describe('qTest Manager Admin', () => {
    const admin = new adminpage();

    before('Clear cookies and navigate to qTest', () => {
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))

    });

    beforeEach('Navigate to Admin page',()=>{
        admin.navigateToAdminPage()
        admin.verifyNavigateSuccessfully()
    });

    it('Navigate to Admin page and create new Project', () => {      
        admin.navigateToProjectsTab()
        admin.createNewProject('ADAD_Cypress_Projects')
        admin.deleteProject('ADAD_Cypress_Projects')

    });

})