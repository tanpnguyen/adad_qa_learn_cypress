import adminpage from '../pages/adminPage'
import testcasePage from '../pages/testcasePage'

describe('qTest Manager - Test Design', () => {
    const admin = new adminpage();
    const testcase = new testcasePage();
    const projectName = 'ADADTH_Cypress_Projects_'.concat(new Date().getTime().toString());
    const moduleName = 'Module_'.concat(new Date().getTime().toString());
    const testcaseName = 'Test Case_'.concat(new Date().getTime().toString());

    beforeEach('Navigate to Admin page and Project tab', () => {
        cy.clearCookies()
        cy.login(Cypress.env('username'), Cypress.env('password')) 
    });

    it('Create new Test Case with empty content', () => {
        admin.navigateToAdminPage()
        admin.verifyNavigateSuccessfully()
        admin.navigateToProjectsTab()
        admin.createNewProject(projectName)
        cy
            .wrap(admin.getCreatedProjectId(projectName))
            .then(() => {
                admin.navigateToCreatedProject(admin.projectId)
            })
        testcase.navigateToTestCaseTab()
        
        testcase.createNewModule(moduleName)
        testcase.createNewTestCase(testcaseName)
    });

    it('Delete test project', () => {
        admin.deleteProject(projectName)
    })
})