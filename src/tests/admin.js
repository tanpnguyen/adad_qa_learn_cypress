import adminpage from '../pages/adminPage'
describe('qTest Manager Admin', () => {
    const admin = new adminpage();

    // before('Clear cookies and navigate to qTest', () => {
    //     cy.clearCookies()
    //     cy.login(Cypress.env('username'),Cypress.env('password'))

    // });

    beforeEach('Navigate to Admin page',()=>{
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        admin.navigateToAdminPage()
        admin.verifyNavigateSuccessfully()
        admin.navigateToProjectsTab()
    });

    it('Navigate to Admin page and create new Project', () => {      

        admin.createNewProject('ADAD_Cypress_Projects')        
        admin.navigateToCreatedProject('ADAD_Cypress_Projects')

    });

    it('Delete test project',()=>{
        admin.deleteProject('ADAD_Cypress_Projects')
    })

})