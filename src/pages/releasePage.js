import releaseSelectors from '../selectors/releasePageSelectors.json';
import basePage from './basePage.js'

class releasePage extends basePage {
    constructor() {
        super()
    }

    navigateToReleasePage = () => {
        cy
            .get(releaseSelectors.lblManager)
            .click({ force: true })
            .get(releaseSelectors.lblTestPlan)
            .click()
    }

    pressCreateNewBtn = () => {
        cy
            .get(releaseSelectors.btnNewRelease)
            .click()
    }

    createNewRelease = (releaseName) => {

        this.pressCreateNewBtn()
        cy
           .get(releaseSelectors.txtReleaseName)
           .should('be.visible')
           .click()
           .type(releaseName)
        cy
            .get(releaseSelectors.btnSave)
            .click()
    }

    deleteRelease = () => {
        cy
            .reload()
            .get(releaseSelectors.btnSelect)
            //.first().select()
            //.click({ multiple: true })
            .get(releaseSelectors.drpOption)
            .should('be.visible')
            .rightclick()
            .get(releaseSelectors.btnDeleteRelease)
            //.should('be.visible')
            .click({ force: true })
            .get(releaseSelectors.btnConfirm)
            .should('be.visible')
            .click({ force: true })
    }
}
export default releasePage