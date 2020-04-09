import moduleSelectors from '../../selectors/main_page/moduleTabSelectors.json'
import basePage from '../basePage.js'


const getIframeDocument = () => {
    return cy
        .get(moduleSelectors.editDescription)
        //.get('iframe[data-cy="the-frame"]')
        // Cypress yields jQuery element, which has the real
        // DOM element under property "0".
        // From the real DOM iframe element we can get
        // the "document" element, it is stored in "contentDocument" property
        // Cypress "its" command can access deep properties using dot notation
        // https://on.cypress.io/its
        .its('0.contentDocument').should('exist')
}
const getIframeBody = () => {
    // get the document
    return getIframeDocument()
        // automatically retries until body is loaded
        .its('body').should('not.be.undefined')
        // wraps "body" DOM element to allow
        // chaining more Cypress commands, like ".find(...)"
        .then(cy.wrap)
}
class module extends basePage {
    moduleId = 0
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
            .should('contain', '/project#tab=requirements')
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
                    .wait(2000)
                    .type(moduleName)
            })
        cy
            .get(moduleSelectors.btnReload)
            .click()
            .wait(3000)
    }
    verifyModuleNameUpdatedSuccessfully = (moduleName) => {
        cy
            .get(moduleSelectors.txtEditTitle)
            .click({ force: true })
            .should('have.text', moduleName)
    }

    updateModuleProperties = (moduleDescription) => {
        cy
            .reload()
            .wait(3000)
            .get(moduleSelectors.tagProperties)
            .click({ force: true })
            .then(() => {
                cy.wait(3000)
                getIframeBody().should('be.visible')
                    .click({ force: true })
                    .type(moduleDescription)
                cy
                    .get(moduleSelectors.btnSave)
                    .focus()
                    .click()
                    .then(() => {
                        cy
                            .wait(3000)
                            .get(moduleSelectors.msgSuccess)
                            .should('be.visible')
                    })
            })

    }
    verifyModuleUpdatedSuccessfully = (moduleDescription) => {
        cy
            .reload()
            .wait(3000)
            .get(moduleSelectors.tagProperties)
            .click({ force: true })
            .then(() => {
                cy.wait(3000)
                getIframeBody().should('have.text', moduleDescription)

            })
    }
    getModuleId = () => {
        let stringUrl = null
        let moduleId = null
        let mdlSelector = null
        cy
            .url()
            .then(url => {
                stringUrl = url
                const idPosition = stringUrl.indexOf('id=')
                let listAndPosition = stringUrl.indexOf('&')
                let andPosition = 0
                while (listAndPosition != -1) {
                    listAndPosition = stringUrl.indexOf('&', listAndPosition + 1)
                    if (listAndPosition > idPosition) {
                        andPosition = listAndPosition
                        break
                    }
                }
                const moduleId = stringUrl.substring(idPosition + 3, andPosition)
                this.moduleId = moduleId
                // mdlSelector = `requirement-tree-0-${moduleId}`
                // cy
                //     .get(`#requirement-tree-0-${moduleId}`)
                //     .should('be.visible')
                //     .click({ force: true })
                //     .wait(3000)
                // cy
                //     .get(`#requirement-tree-0-${moduleId}`)
                //     .focused()
                //     .rightclick()
                //     .wait(2000)
                //     .get(moduleSelectors.menuDelete)
                //     .should('be.visible')
                //     .click({ force: true })
                //     .wait(3000)
                //     .get(moduleSelectors.dialogConfirmed)
                //     .should('be.visible')
                //     .get(moduleSelectors.btnDeleteYes)
                //     .focused()
                //     .click({ force: true })
                //     .wait(3000)

            })

    }

    deleteModule = (moduleId) => {
       const  mdlSelector = `requirement-tree-0-${moduleId}`
        cy
            .get(`#requirement-tree-0-${moduleId}`)
            .should('be.visible')
            .click({ force: true })
            .wait(3000)
        cy
            .get(`#requirement-tree-0-${moduleId}`)
            .focused()
            .rightclick()
            .wait(2000)
            .get(moduleSelectors.menuDelete)
            .should('be.visible')
            .click({ force: true })
            .wait(3000)
            .get(moduleSelectors.dialogConfirmed)
            .should('be.visible')
            .get(moduleSelectors.btnDeleteYes)
            .focused()
            .click({ force: true })
            .wait(3000)
    }
    verifyModuleDeletedSuccessfully = () => {
        cy
            .get(moduleSelectors.rootHeader)
            .should('be.visible')

    }

}
export default module