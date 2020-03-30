import moduleSelectors from '../selectors/moduleObjectSelectors.json'
import basePage from './basePage.js'

class module extends basePage {
    constructor() {
        super()
    }

    navigateToRequirements = () => {
        cy
            .get(this.requirementMenu)
            .click({ force: true })
    }
    verifyNavigateSuccessfully = () => {
        cy
            .url()
            .should('contain','/project#tab=requirements')
    }
    createNewParentModule = () => {
        cy
            .get(moduleSelectors.projectRoot, { timeout: 30000 })
            .click({ force: true })
            .wait(3000)
            .get(moduleSelectors.iconNewModule, { timeout: 30000 })
            .click()
    }
    verifyNewModuleBtnCreatedSuccessfully = () => {
        cy
            .url().should('contain', 'create=1')
            .get(moduleSelectors.txtEditTitle).should('be.visible')
    }
    updateModuleName = (moduleName) => {

        cy
            .wait(1000)
            .get(moduleSelectors.txtEditTitle)
            .click({ force: true })
            .then(() => {
                cy
                    .get(moduleSelectors.txtInputTitle)
                    .clear()
                    .type(moduleName)
            })
        cy
            .get(moduleSelectors.btnReload)
            .click()       
    }
    verifyModuleNameUpdatedSuccessfully = (moduleName) => {
        cy
            .get(moduleSelectors.txtEditTitle)
            .click({ force: true })
            .should('have.text',moduleName)
    }


}
export default module