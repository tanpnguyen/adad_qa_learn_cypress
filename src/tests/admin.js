import adminpage from '../pages/admin/adminPage'
describe('s', () => {
    const admin = new adminpage();

    beforeEach('Navigate to Admin page', () => {
        cy.clearCookies()
        cy.login(Cypress.env('username'), Cypress.env('password'))
        admin.navigateToAdminPage()
        admin.verifyNavigateSuccessfully()
        admin.navigateToProjectsTab()
    });

    it('Navigate to Admin page and create new Project', () => {

        admin.createNewProject('ADAD_Cypress_Projects')
        cy
            .wrap(admin.getCreatedProjectId('ADAD_Cypress_Projects'))
            .then(() => {
                admin.navigateToCreatedProject(admin.projectId)
            })

    });

    it('Delete test project', () => {
        admin.deleteProject('ADAD_Cypress_Projects')
    })

})