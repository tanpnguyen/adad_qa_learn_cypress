import loginPage from '../pages/loginPage'
import requirementPage from '../pages/requirementPage'

describe('Create a requirement in qTest Manager', () => {
    const login = new loginPage();
    const requirement = new requirementPage();
    let reqID

    beforeEach('Login to qTest Manager page', () => {
        cy.clearCookies()
        // cy.getCookies().should('be.empty')
        cy.login(Cypress.env("username"), Cypress.env("password"))
    })

    it('Create a new requirement successfully', () => {
        requirement.selectProject('Tu Project')
        requirement.navigateToRequirementPage()
        requirement.createNewRequirement('Tu Project', 'MD-2','Requirement 1', 'Nice to Have', 'Test creating Requirement')
        // get Requirement ID
        cy
        .wrap(requirement.getRequirementId())
        .then(()=>{
            reqID = requirement.reqId
            // requirement.deleteRequirement('Tu Project', 'MD-2', reqID)
            console.log("Created ReqID : " + reqID)
        })
    })

    it('Delete created requirement', () => {
        requirement.selectProject('Tu Project')
        requirement.navigateToRequirementPage()
        requirement.deleteRequirement('Tu Project', 'MD-2', reqID)
    })

    afterEach('Logout from qTest Manager', () => {
        requirement.logOut()

    })
})
