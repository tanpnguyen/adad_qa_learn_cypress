import adminSelectors from '../selectors/adminPageSelectors.json'
import basePage from './basePage.js'

class adminPage extends basePage {
    projectId = 0
    constructor() {
        super()
    }

    navigateToAdminPage = () => {
        cy
            .get(this.adminMenu)
            .click({ force: true })
    }

    verifyNavigateSuccessfully = () => {
        cy
            .url()
            .should('contain', '/admin/setting')
    }

    navigateToProjectsTab = () => {
        cy
            .get(adminSelectors.tabProjects)
            .click()
        cy
            .get(adminSelectors.btnAddNewProject, { timeout: 30000 })
            .should('be.visible')
    }

    checkIfProjectExisted = () => {
        let hasProject = false
        cy
            .get(adminSelectors.gridProject)
            .then($project => {
                if ($project.is(':visible')) {
                    hasProject = true
                }
            })
        return hasProject
    }

    pressCreateNewBtn = () => {
        cy
            .get(adminSelectors.btnAddNewProject, { timeout: 30000 })
            .click({ force: true })
        cy
            .get(adminSelectors.dialogProjectDetail)
            .should('be.visible')
        cy
            .get(adminSelectors.dialogProjectDetailTitle)
            .should($title => {
                expect($title).to.contain('New Project')
            })

    }

    createNewProject = (projectName) => {

        this.pressCreateNewBtn()
        cy
            .get(adminSelectors.dialogProjectName)
            .should('be.visible')
        cy
            .get(adminSelectors.dialogProjectName)
            .type(projectName)
        cy
            .get(adminSelectors.dialogBtnAddProject)
            .click({ force: true })
        cy
            .get(adminSelectors.msgAddProjectSuccessfully, { timeout: 30000 })
            .should('be.visible')
        cy
            .get(adminSelectors.btnOkCloseDialogAddProjectSuccessfully)
            .click()

    }

    searchProject = (projectName) => {
        cy
            .get(adminSelectors.txtSearchProject)
            .clear()
            .type(projectName)
            .type('{enter}')
    }

    getCreatedProjectId = (projectName) => {
        this.searchProject(projectName)
        cy
            .wait(2000)

        if (cy.get(adminSelectors.gridProjectName).contains(projectName)) {

            cy
                .get(adminSelectors.gridProjectId)
                .each(($cell) => {
                    this.projectId = $cell.text()
                    
                })
        }
    }

    navigateToCreatedProject = (projectId) => {
        cy
            .visit(Cypress.env('url') + `p/${projectId}/portal/project#tab=testplan`)

    }



    deleteProject = (projectName) => {
        this.searchProject(projectName)
        cy
            .wait(2000)

        cy
            .get(adminSelectors.gridBtnRemoveProject)
            .each($btn => {
                cy
                    .wrap($btn)
                    .then(() => {
                        $btn.click()
                        cy
                            .get(adminSelectors.confirmationDeleteBtnYes)
                            .click()
                    })

            })



    }
}
export default adminPage