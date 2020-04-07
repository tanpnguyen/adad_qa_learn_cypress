import adminpage from '../pages/adminPage'

describe('qTest Manager - Test Design', () => {
    const admin = new adminpage();
    let projectName = 'ADADTH_Cypress_Projects_'.concat(new Date().getTime().toString());

    beforeEach('Navigate to Admin page', () => {
        cy.clearCookies()
        cy.login(Cypress.env('username'), Cypress.env('password'))
        admin.navigateToAdminPage()
        admin.verifyNavigateSuccessfully()
        admin.navigateToProjectsTab()
    });

    it('Navigate to Admin page and create new Project', () => {

        admin.createNewProject(projectName)
        cy
            .wrap(admin.getCreatedProjectId(projectName))
            .then(() => {
                admin.navigateToCreatedProject(admin.projectId)
            })

    });

    it('Delete test project', () => {
        admin.deleteProject(projectName)
    })
})