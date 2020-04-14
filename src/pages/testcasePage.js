import basePage from './basePage.js'
import testcaseSelectors from '../selectors/testcasePageSelectors.json'

const getIframeDocument = () => {
    return cy
    .get(testcaseSelectors.ifrDesciption)
    .its('0.contentDocument').should('exist')
  }

const getIframeBody = () => {
    return getIframeDocument()
    .its('body').should('not.be.undefined')
    .then(cy.wrap)
  }
class testcasePage extends basePage {
    constructor() {
        super()
    }

    navigateToTestCaseTab = () => {
        cy
            .get(testcaseSelectors.tabTestCase, { timeout: 30000 })
            .click()
        cy
            .get(testcaseSelectors.iconRoot, { timeout: 30000 })
            .should('be.visible')
    }
    createNewModule = (moduleName) => {
        cy
            .get(testcaseSelectors.tbNewModule, { timeout: 30000 })
            .click()
        cy
            .get(testcaseSelectors.txtModuleName, { timeout: 30000 })
            .click({ force: true })
            .then(() => {
                cy
                    .get(testcaseSelectors.txtInputModuleName, { timeout: 30000 })
                    .clear()
                    .type(moduleName)
            })
        cy
            .get(testcaseSelectors.btnModuleReload)
            .click()  
    }
    createNewTestCase = (testcaseName) => {
        cy
            .get(testcaseSelectors.tbNewTestCase, { timeout: 30000 })
            .click()
        cy
            .get(testcaseSelectors.txtTestCaseHeader, { timeout: 30000 })
            .click({ force: true })
            .then(() => {
                cy
                    .get(testcaseSelectors.txtInputTestCaseHeader, { timeout: 30000 })
                    .clear()
                    .type(testcaseName)
            })
        cy
            .get(testcaseSelectors.btnTestCaseReload)
            .click() 
    }
}

export default testcasePage