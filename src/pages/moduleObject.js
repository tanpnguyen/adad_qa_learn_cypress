import moduleSelectors from '../selectors/moduleObjectSelectors.json'
import basePage from './basePage.js'

class module extends basePage {
    constructor () {
        super ()
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

    pressCreateNewBtn = () => {
    cy
        .get(moduleSelectors.projectRoot)
        .click()
    cy
        .wait(10)   
    cy
        .get(moduleSelectors.iconNewModule, { timeout: 30000 })
        .click()       
            
    }
    // getURLParameter = (sParam) => {
    //     let sPageURL = cy.url();
    //     let sURLVariables = sPageURL.split('&');
    //     for (var i = 0; i < sURLVariables.length; i++) {
    //         var sParameterName = sURLVariables[i].split('=');
    //         if (sParameterName[0] == sParam) {
    //             return sParameterName[1];
    //         }
    //     }
    // }
    updateModuleName = (moduleName) => {
        //let moduleId = this.getURLParameter('id')
       // nodeModule = 'requirement-tree-expand-0-' + moduleId;
    Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            cy 
            .get(moduleSelectors.txtEditTitle)
            .click()
            .wait(5)
            .click()
            .type (moduleName)
            return false
    })
    }   
}
export default module