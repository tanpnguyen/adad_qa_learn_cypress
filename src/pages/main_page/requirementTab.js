import requirementSelectors from '../../selectors/main_page/requirementTabSelectors.json'
import basePage from '../basePage.js'


class requirementPage extends basePage {

    constructor() {
        super()
        // this.reqId = ''
    }

    // get reqID()
    // {
    //     console.log(this.reqId)
    //     return this.getRequirementId()
    // }

    // set reqID(Id)
    // {
    //     this.reqId = Id
    // }

    navigateToRequirementPage = () => {
        cy
            .get(this.requirementMenu, { timeout: 20000 })
            .click()
    }

    clickButton = (element) => cy
        .get(element)
        .click()

    inputText = (element, string) => cy
        .get(element)
        .type(string)

    checkElementVisible = (element) => cy
        .get(element)
        .should('be.visible')

    selectProject = (projectName) => {
        cy.get(this.divProjectArea)
            .trigger('mouseover')
            .click()
        cy.get(this.ulClients)
            .contains(projectName)
            .click({ force: true })

    }

    getIframeDocument = (iframeSelector) => {
        return cy
            .get(iframeSelector)
            // Cypress yields jQuery element, which has the real
            // DOM element under property "0".
            // From the real DOM iframe element we can get
            // the "document" element, it is stored in "contentDocument" property
            // Cypress "its" command can access deep properties using dot notation
            // https://on.cypress.io/its
            .its('0.contentDocument').should('exist')
    }

    getIframeBody = (iframeSelector) => {
        // get document
        return this.getIframeDocument(iframeSelector)
            // automatically retries until body is loaded
            .its('body').should('not.be.undefined')
            // wraps "body" DOM element to allow
            // chaining more Cypress commands, like ".find(...)"
            .then(cy.wrap)
    }

    getRequirementId = () => {
        cy
            .get(requirementSelectors.lblRequirementId)
            .should(($span) => {
                const reqId = $span.text()

                // return text
                console.log("Req ID is: " + reqId)
                // console.log('ReqID = ' + this.reqId)
                this.reqId = reqId
            })

    }

    selectModule = (projectName, moduleId) => {
        //expand project
        let toggleProject = "#requirement-tree-content div[title='" + projectName + "'] span[class~='toggle']"
        cy
            .get(toggleProject, { timeout: 30000 })
            .then(($span) => {
                const cls = $span.attr('class')
                if (cls == 'icon toggle icon-collapsed') {
                    console.log("Clicking Expand Project")
                    cy.wrap($span).click()
                }

            })

        // select module
        cy
            .get(`#requirement-tree-0-${moduleId}`)
            .focused()
        // cy.get("div[title^='" + moduleId + "'] a", { timeout: 30000 })
        //     .click()

    }

    createNewRequirement = (projectName, moduleId, requirementName, priority, description) => {

        this.selectModule(projectName, moduleId)

        cy
            .get(requirementSelectors.btnNewRequirement)
            .click({ force: true })

        // Validate title of Requirement page
        cy
            .get(requirementSelectors.titleRequirement)
            .then(($span) => {
                cy
                    .wrap($span)
                    .should('be.visible')
                    .should('have.text', 'Requirement')
            })

        //enter Requirement name 
        cy
        .get('#customtitlepaneRequirement_innerEditor span.dijitInlineEditBoxDisplayMode')
        .click({ force: true })
        .then(()=>{
            cy
            .get(requirementSelectors.txtRequirementName)
            .should('be.visible')
            .click({ force: true })
            //.type('{del}', { delay: 2000 })
            .type(requirementName, { delay: 30 },{ force: true })
            .type('{enter}')
        })

        // Select priority
        cy
            .get(requirementSelectors.selectPriority)
            .click()

        cy
            .get(requirementSelectors.selectPriorityArrow).contains(priority, { matchCase: false })
            .should('be.visible')
            .click()

        // enter description
        this.getIframeBody(requirementSelectors.iframeDescription).find('p').eq(0)
            .should('be.visible')
            .type(description)

        // click save button
        cy
            .get(requirementSelectors.btnSave)
            .click()

        // this.getRequirementId()
        // return reqId
    }

    selectRequirement = (reqId) => {
        cy
            .get("div[title^='" + reqId + "'] a")
            .should('be.visible')
            .click()
    }

    deleteRequirement = (projectName, moduleId, reqId) => {

        this.selectModule(projectName, moduleId)

        // expand Module
        let toggleModule = "div[title^=\'" + moduleId + "\'] span[class~='toggle']"
        cy
            .get(toggleModule, { timeout: 30000 })
            // .should('be.visible')
            .then(($span) => {
                // access the native DOM element

                const cls = $span.attr('class')
                if (cls == 'icon icon-collapsed toggle') {
                    console.log('Clicking Expand Module')
                    cy.wrap($span).click()
                }
            })

        cy
            .get("div[title^='" + reqId + "'] a.tree-item.removable", { timeout: 30000 })
            .should('be.visible')
            .click()
            .rightclick()

        cy
            .get(requirementSelectors.optionDelete)
            .should('be.visible')
            .click()

        cy.get(requirementSelectors.confirmYes)
            .should('be.visible')
            .click()

    }

    logOut = () => {
        cy.get(requirementSelectors.lblUser)
            .should('be.visible')
            .trigger('mouseover')

        cy.get(requirementSelectors.optionLogOut)
            .should('be.visible')
            .click()
    }
}
export default requirementPage