import releasePage from '../pages/releasePage.js';
import adminPage from '../pages/adminPage.js'

describe('qTest Manager Release Object', () => {
    const release = new releasePage(); 
    const admin = new adminPage();

    beforeEach('Navigate to Admin page',()=>{
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        //admin.navigateToAdminPage()
        //admin.verifyNavigateSuccessfully()
        //admin.navigateToProjectsTab()
        //admin.createNewProject('MaiPhan_Cypress_Projects')        
        //admin.navigateToCreatedProject('MaiPhan_Cypress_Projects')
    });
    
    it('Navigate to Test Plan tab & create new Release object', () => {      
        release.navigateToReleasePage()   
        release.pressCreateNewBtn()
        release.createNewRelease('Mai Release')     
    });
})