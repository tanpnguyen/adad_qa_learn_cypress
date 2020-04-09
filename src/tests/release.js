import releasePage from '../pages/main_page/releaseTab.js';
import adminPage from '../pages/admin/adminPage.js'

describe('qTest Manager Release Object', () => {
    const release = new releasePage(); 
    const admin = new adminPage();
    let testreleaseId;

    beforeEach('Navigate to Release page',()=>{
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        release.navigateToReleasePage() 
        release.verifyNavigateToReleasePageSuccessfully()  
       // admin.navigateToAdminPage()
       // admin.verifyNavigateSuccessfully()
       // admin.navigateToProjectsTab()
        //admin.createNewProject('MaiPhan_Cypress_Projects')        
        //admin.navigateToCreatedProject('MaiPhan_Cypress_Projects')
    });
    
    it('Create new Release object', () => {      
        release.createNewRelease('Mai Release')
        release.verifyNewReleaseIsCreatedSuccessfully()
        cy
        .wrap(release.getCreatedReleaseId())
        .then(()=>{
            release.selectRelease(release.releaseId)
            testreleaseId = release.releaseId
        })
    });

    it('Modify Release object', () => {
        release.modifyDescription(release.releaseId, 'This is Release Description')
    });

    it('Delete Release object', () => {
        //console.log(`release id is: ${release.releaseId}`)
        release.deleteRelease(release.releaseId)
        release.verifyNewReleaseIsDeletedSuccessfully()
    });

    
})