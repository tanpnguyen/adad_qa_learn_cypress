import defectSelector from '../selectors/defectTabSelectors.json'
import basePage from './basePage.js'

class defectPage extends basePage {
    defectId = 0
    constructor() {
        super()
    }

    
    navigateDefectTab = () => {
        cy  
           .get(this.defectTab)
           .click({force:true})
           
    }

    verifyNavigateSuccessfully = () => {
        cy
            .url()
            .should('contain', '/project#tab=defects')
    }

    checkElementVisible = (element) => {
        cy
            .get(element)
            .should('be.visible')
    }

    pressNewDefectBtn = () => {
        this.checkElementVisible(defectSelector.btnNewDefect)
        cy  
            .get(defectSelector.btnNewDefect, {timeout:3000})
            .should('be.visible')
            .click({force:true})
    }

    createNewDefect = (defectName, description) => {
        this.pressNewDefectBtn()
        cy  
            .get(defectSelector.txtSummary)
            .should('be.visible')
            .type(defectName)
        cy
            .get(defectSelector.txtDescription)
            .should('be.visible')
            .type(description)

        cy
            .get(defectSelector.btnSaveClose)
            .click({force:true})
    }

    queryDefect = (defectName) => {
        cy.wait(3000)
        cy
            .get(defectSelector.gridQuery, {timeout: 3000})
            .should('be.visible')

        cy
            .get(defectSelector.cellCriteria)
            .type('Summary')
        cy
            .get(defectSelector.cellOperator)
            .click({force:true})
            //desire to select menu item = 'contains' from hidden dropdown list

        cy
            .get(defectSelector.cellValue)
            .type(defectName)
    }
}
export default defectPage

