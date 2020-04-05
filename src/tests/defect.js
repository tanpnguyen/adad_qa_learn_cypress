import defectPage from '../pages/defectPage.js'
import adminPage from '../pages/adminPage.js'

let projectName = 'Test_pro'
let defectName = 'New defect'
let defectDescription = 'This is description'



describe('Submit new qTest defect', () => {
    const admin = new adminPage();
    const defect = new defectPage();

    beforeEach('Login to qTest, navigate to Admin page to create new project, then navigate to Defect Tab',()=>{
        
        cy.clearCookies()
        cy.login(Cypress.env('username'),Cypress.env('password'))
    
        admin.navigateToAdminPage()
        admin.verifyNavigateSuccessfully()
        admin.navigateToProjectsTab()
        admin.createNewProject(projectName)
        cy.wrap(admin.getCreatedProjectId(projectName))
        cy.then(() => {
            admin.navigateToCreatedProject(admin.projectId)
        })
        defect.navigateDefectTab()
        defect.verifyNavigateSuccessfully()
    });

   it('Create new defect', () => {      
        defect.createNewDefect(defectName, defectDescription)
        defect.queryDefect(defectName)
    });

    
})