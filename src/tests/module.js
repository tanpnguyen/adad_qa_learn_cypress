import moduleObject from '../pages/moduleObject'

describe('qTest Manager Module', () => {
    const moduleObj = new moduleObject();

    beforeEach('Navigate to Requirements page',()=>{
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        moduleObj.navigateToRequirements()
        moduleObj.verifyNavigateSuccessfully()
       
    });

    it('Click New Module button', () => {      

       moduleObj.pressCreateNewBtn();

    });

//     it('Delete test project',()=>{
//         admin.deleteProject('ADAD_Cypress_Projects')
//     })

})