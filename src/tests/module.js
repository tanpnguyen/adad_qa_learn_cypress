import moduleObject from '../pages/moduleObject'

describe('qTest Manager Module', () => {
    const moduleObj = new moduleObject();

    beforeEach('Navigate to Requirements page',()=>{
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
      
       
    });

    it('Create New Module', () => {  
      moduleObj.navigateToRequirements()
      moduleObj.verifyNavigateSuccessfully()
      moduleObj.createNewModule('Automation Module')
        
});
   
    //it('Update name, assert new moodule created by clicking on the Reload button', () => {
        
       // moduleObj.updateModuleName('ADAD New Module');
        // cy
        //     .wrap(admin.getCreatedProjectId('ADAD_Cypress_Projects'))
        //     .then(() => {
        //         admin.navigateToCreatedProject(admin.projectId)
        //     })

   // });

//     it('Delete test project',()=>{
//         admin.deleteProject('ADAD_Cypress_Projects')
//     })

})