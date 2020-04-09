import releasePage from '../pages/main_page/releaseTab.js';
import adminPage from '../pages/admin/adminPage.js'
import moduleObject from '../pages/main_page/moduleTab'
import requirementPage from '../pages/main_page/requirementTab.js'
const requirement = new requirementPage();

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

        admin.createNewProject(Cypress.env('projectName'))
        cy
            .wrap(admin.getCreatedProjectId(Cypress.env('projectName')))
            .then(() => {
                admin.navigateToCreatedProject(admin.projectId)
            })

    });
})
describe('qTest Manager Project Release', () => { 

    beforeEach('Navigate to Release Tab',()=>{
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
    
    beforeEach('Navigate to Requirements Tab',()=>{
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
        moduleObj.getModuleId()
        //cy.wait(3000)
        //moduleObj.verifyModuleDeletedSuccessfully()
    });
})
describe('qTest Manager Requirement', () => {
    let reqID

    beforeEach('Login to qTest Manager page', () => {
        cy.clearCookies()
        cy.login(Cypress.env("username"), Cypress.env("password"))
        admin.navigateToCreatedProject(admin.projectId)
        requirement.navigateToRequirementPage()
    })

    it('Create a new requirement', () => {
        requirement.createNewRequirement(Cypress.env('projectName'), moduleObj.moduleId,'Requirement 1', 'Nice to Have', 'Test creating Requirement')
        // get Requirement ID
        cy
        .wrap(requirement.getRequirementId())
        .then(()=>{
            reqID = requirement.reqId
            // requirement.deleteRequirement('Tu Project', 'MD-2', reqID)
            console.log("Created ReqID : " + reqID)
        })
    })

    // it('Delete created requirement', () => {
    //     requirement.selectProject(Cypress.env('projectName'))
    //     requirement.navigateToRequirementPage()
    //     requirement.deleteRequirement(Cypress.env('projectName'), moduleObj.moduleId, reqID)
    // })

    // afterEach('Logout from qTest Manager', () => {
    //     requirement.logOut()

    // })
})

describe('Clean data', () => {

    beforeEach('Navigate to Admin page', () => {
        cy.clearCookies()
        cy.login(Cypress.env('username'), Cypress.env('password'))
        
    });

    it('Delete Module', () => {
        moduleObj.navigateToRequirements()
        moduleObj.verifyNavigateSuccessfully()
        moduleObj.deleteModule(moduleObj.moduleId)
    })

    it('Delete test project', () => {
        admin.navigateToAdminPage()
        admin.verifyNavigateSuccessfully()
        admin.navigateToProjectsTab()
        admin.deleteProject(Cypress.env('projectName'))
    })
})