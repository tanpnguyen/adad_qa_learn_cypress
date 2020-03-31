import releaseSelectors from '../selectors/releasePageSelectors.json';
import basePage from './basePage.js'

class releasePage extends basePage {
    releaseId = 0
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

    getCreatedReleaseId = () => {
        let stringUrl = null
        cy
            .url()
            .then(url => {
                stringUrl = url
                const idPosition = stringUrl.indexOf('id=')
                let listAndPosition = stringUrl.indexOf('&')
                let andPosition = 0
                while (listAndPosition != -1) {
                    listAndPosition = stringUrl.indexOf('&', listAndPosition + 1)
                    if (listAndPosition > idPosition) {
                        andPosition = listAndPosition
                        break
                    }
                }
                const releaseId = stringUrl.substring(idPosition + 3, andPosition)
                this.releaseId = releaseId
            })

    }

    selectRelease = (releaseId) => {
        //const selectedReleaseSelector = `span[data-objid="${releaseId}" ]`
        const selectedReleaseSelector = `#test-plan-tree-8-${releaseId}`
        cy
            .get(selectedReleaseSelector)
            .click()
    }

    deleteRelease = (releaseId) => {
        this.selectRelease(releaseId)
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