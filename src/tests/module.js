import moduleObject from '../pages/moduleObject'
import module from '../pages/moduleObject';

describe('qTest Manager Module', () => {
    const moduleObj = new moduleObject();
    let mdlName = 'Automated Module'

    beforeEach('Navigate to Requirements page',()=>{
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        moduleObj.navigateToRequirements()
        moduleObj.verifyNavigateSuccessfully()
    });

    it('Create New Parent Module and Update Name', () => {  
        cy.wait(2000)
        moduleObj.createNewParentModule()
        moduleObj.verifyNewModuleBtnCreatedSuccessfully()
        moduleObj.updateModuleName(mdlName)
        moduleObj.verifyModuleNameUpdatedSuccessfully(mdlName)
          
    });
})