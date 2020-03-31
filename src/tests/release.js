import releasePage from '../pages/releasePage.js';
import adminPage from '../pages/adminPage.js'

describe('qTest Manager Release Object', () => {
    const release = new releasePage(); 
    const admin = new adminPage();
    let testreleaseId
    beforeEach('Navigate to Admin page',()=>{
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
       // admin.navigateToAdminPage()
       // admin.verifyNavigateSuccessfully()
       // admin.navigateToProjectsTab()
        //admin.createNewProject('MaiPhan_Cypress_Projects')        
        //admin.navigateToCreatedProject('MaiPhan_Cypress_Projects')
    });
    
    it('Navigate to Test Plan tab & create new Release object', () => {      
        release.navigateToReleasePage()   
        //release.pressCreateNewBtn()
        release.createNewRelease('Mai Release')
        cy
        .wrap(release.getCreatedReleaseId())
        .then(()=>{
            release.selectRelease(release.releaseId)
            testreleaseId = release.releaseId
        })
    });

    it('Delete Release object', () => {
        console.log(`release id is: ${release.releaseId}`)
        release.deleteRelease(release.releaseId)
    });

    //after('Delete',()=>{
    //    admin.deleteProject('MaiPhan_Cypress_Projects')
    //});
})