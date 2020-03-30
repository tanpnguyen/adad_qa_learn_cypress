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
            .should('contain','/project#tab=requirements')
    }
    clickProjectRoot = () => {
        cy
            .get(moduleSelectors.projectRoot, {timeout: 30000})
            .click({force:true})
    }
    pressCreateNewBtn = () => {
         cy 
            .get(moduleSelectors.iconNewModule,{ timeout: 30000 })
            .click({force:true})            
    }
    verifyNewModuleBtnCreatedSuccessfully = () => {
        cy
            .url().should('contain', 'create=1')   
            .get(moduleSelectors.txtEditTitle).should('be.visible')
    }
    createNewModule = (moduleName) => {
      
       this.pressCreateNewBtn()
       this.verifyNewModuleBtnCreatedSuccessfully()
       cy.wait(1000)
       Cypress.on('uncaught:exception', (err, runnable) => {    
        cy
            .get(moduleSelectors.txtEditTitle,{ timeout: 30000 })
            .select()
            .click({force:true})
            
            .get(moduleSelectors.txtInputTitle,{ timeout: 30000 })
            .invoke()
            .click({force:true})
            .wait(2000)
            .type(moduleName) 

            .get(moduleSelectors.btnReload,{ timeout: 30000 }).click({force:true})
      
        // cy.get('#moduleHeader_editableContent').click({force: true}).then(() => {
        //     cy.get('input#moduleHeader_editableContentInput').invoke()
        //     cy.wait(1000)
        //     cy.get('input#moduleHeader_editableContentInput').type('abc')
           
        //   })

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