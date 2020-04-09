import releaseSelectors from '../../selectors/main_page/releaseTabSelectors.json';
import basePage from '../basePage.js'

const getIframeDocument = () => {
    return cy
    .get(releaseSelectors.txtDescription)
    .its('0.contentDocument').should('exist')
  }

const getIframeBody = () => {
    return getIframeDocument()
    .its('body').should('not.be.undefined')
    .then(cy.wrap)
  }
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

    verifyNavigateToReleasePageSuccessfully = () => {
        cy
            .url()
            .should('contain', '/project#tab=testplan') 
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

    verifyNewReleaseIsCreatedSuccessfully = () => {
        cy
            .url()
            .should('contain', 'object=8', 'create=1')
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

    modifyDescription = (releaseId, releaseDescription) => {
        this.selectRelease(releaseId)
        cy
            .reload()
            .then(() => {
                getIframeBody().should('be.visible')
                    .click({force: true})
                    .type(releaseDescription)
                cy
                    .get(releaseSelectors.btnSave)
                    .click()
                    .then(() => {
                        cy
                            .get(releaseSelectors.msgSuccess)
                            .should('contain', 'Changes were saved successfully.')    
                    })
            })
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

    verifyNewReleaseIsDeletedSuccessfully = () => {
        cy
            .get(releaseSelectors.releaseIcon)
            .should('be.visible')
         
    }
}
export default releasePage