import moduleSelectors from '../selectors/moduleObjectSelectors.json'
import basePage from './basePage.js'

class module extends basePage {
    constructor () {
        super ()
    }

    navigateToRequirements = () => {
        cy
        .get(this.requirementMenu)
        .click({ force: true })
    }

    verifyNavigateSuccessfully = () => {
        cy
            .url()
            .should('contain', '/project#tab=requirements')
    }

    pressCreateNewBtn = () => {
        cy
            .get(moduleSelectors.iconNewModule, { timeout: 30000 })
            .click({ force: true })
        cy
            .get(moduleSelectors.txtEditTitle)
            .should('be.visible')
        cy
            .get(moduleSelectors.txtEditTitle)
            .should($title => {
                expect($title).to.contain('Untitled')
            })
    }
   
}
export default module