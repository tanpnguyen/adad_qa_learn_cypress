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
        .get(moduleSelectors.projectRoot, {force: true})
        .click()
        .wait(1)
        .get(moduleSelectors.iconNewModule, { timeout: 30000 })
        .click()   
    }

    verifyNewModuleBtnCreatedSuccessfully = () => {
        cy
            .url().should('contain', 'create=1')   
            .get(moduleSelectors.txtEditTitle).should('be.visible')
    }

    createNewModule = (moduleName) => {
      
        this.pressCreateNewBtn()
       Cypress.on('uncaught:exception', (err, runnable) => {     
        cy
           .get(moduleSelectors.txtEditTitle)
           .wait(1000)
           .click()
           .get(moduleSelectors.txtInputTitle)
           .type(moduleName)
           .get(moduleSelectors.projectRoot)
           .click()

           return false
        })   
    }

   
   
   
 
    // cy
    //     .get(moduleSelectors.iconNewModule, { timeout: 30000 })
    //     .click()   
    //     .get(moduleSelectors.txtEditTitle)
    //         .click()
    //         .get(moduleSelectors.moduleName)
    //         .should('be.visible')
    //         .find('input')
    //         .type(moduleName)

    
     

}
export default module