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
        //cy
         //   .get(releaseSelectors.txtReleaseName)
          //  .should('be.visible')
        cy
            .get(releaseSelectors.txtReleaseName)
            .type(releaseName)
        cy
            .get(releaseSelectors.btnSave)
            .click()
    }
}
export default releasePage