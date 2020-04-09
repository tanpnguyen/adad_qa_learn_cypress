import releasePage from '../pages/main_page/releaseTab.js';
import adminPage from '../pages/admin/adminPage.js'
import moduleObject from '../pages/main_page/moduleTab'

const admin = new adminPage();
const release = new releasePage();
const moduleObj = new moduleObject(); 

describe('qTest Manager Project', () => {

    beforeEach('Navigate to Admin page', () => {
        cy.clearCookies()
        cy.login(Cypress.env('username'), Cypress.env('password'))
        admin.navigateToAdminPage()
        admin.verifyNavigateSuccessfully()
        admin.navigateToProjectsTab()
    });

    it('Create new Project', () => {

        admin.createNewProject('ADAD_Cypress_Projects')
        cy
            .wrap(admin.getCreatedProjectId('ADAD_Cypress_Projects'))
            .then(() => {
                admin.navigateToCreatedProject(admin.projectId)
            })

    });
})
describe('qTest Manager Project Release', () => { 

    beforeEach('Navigate to Release page',()=>{
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        admin.navigateToCreatedProject(admin.projectId)
        release.navigateToReleasePage() 
        release.verifyNavigateToReleasePageSuccessfully()  
    });
    
    it('Create new Release object', () => {      
        release.createNewRelease('Mai Release')
        release.verifyNewReleaseIsCreatedSuccessfully()
        cy
        .wrap(release.getCreatedReleaseId())
        .then(()=>{
            release.selectRelease(release.releaseId)
            const testreleaseId = release.releaseId
        })
    });

    it('Modify Release object', () => {
        release.modifyDescription(release.releaseId, 'This is Release Description')
    });

    it('Delete Release object', () => {
        release.deleteRelease(release.releaseId)
        release.verifyNewReleaseIsDeletedSuccessfully()
    });

    
})
describe('qTest Manager Module', () => {
        
    let mdlName = 'Automated Module'
    let mdlDescription = 'This is a sample module description created automatically'
    
    beforeEach('Navigate to Requirements page',()=>{
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        admin.navigateToCreatedProject(admin.projectId)
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
describe('Delete Project', () => {
    beforeEach('Navigate to Admin page', () => {
        cy.clearCookies()
        cy.login(Cypress.env('username'), Cypress.env('password'))
        admin.navigateToAdminPage()
        admin.verifyNavigateSuccessfully()
        admin.navigateToProjectsTab()
    });

    it('Delete test project', () => {
        admin.deleteProject('ADAD_Cypress_Projects')
    })
})