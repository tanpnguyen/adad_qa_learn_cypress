import moduleObject from '../pages/moduleObject'
import module from '../pages/moduleObject';

describe('qTest Manager Module', () => {
    const moduleObj = new moduleObject();
        
    let mdlName = 'Automated Module'
    let mdlDescription = 'This is a sample module description created automatically'
    

    beforeEach('Navigate to Requirements page',()=>{
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        moduleObj.navigateToRequirements()
        moduleObj.verifyNavigateSuccessfully()
    });

    it('Create New Parent Module, Update Its name, description; and then delete it', () => {  
        cy.wait(2000)
        moduleObj.createNewParentModule()
        moduleObj.verifyNewModuleBtnCreatedSuccessfully()
        moduleObj.updateModuleName(mdlName)
        moduleObj.verifyModuleNameUpdatedSuccessfully(mdlName)   
        moduleObj.updateModuleProperties(mdlDescription)
        moduleObj.getModuleIdAndDeleteModule()
        cy.wait(3000)
        moduleObj.verifyModuleDeletedSuccessfully()
    });
})