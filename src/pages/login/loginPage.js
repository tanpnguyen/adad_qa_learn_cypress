import loginSelectors from '../../selectors/login/loginPageSelectors.json'
import commonSelectors from '../../selectors/commonSelectors.json'
import basePage from '../basePage.js'
class loginPage extends basePage {
    constructor() {
        super()
    }

    inputText = (element, string) => cy
        .get(element)
        .type(string)

    clickButton = (element) => cy
        .get(element)
        .click()

    checkElementVisible = (element) => cy
        .get(element)
        .should('be.visible')

    checkElementVisibleLoginPage = () => {
        this.checkElementVisible(loginSelectors.txtusername)
        this.checkElementVisible(loginSelectors.txtpassword)
        this.checkElementVisible(loginSelectors.btnlogin)
    }

    loginAction = async (username, password) => {
        // Input username/password then click Login button
        this.inputText(loginSelectors.txtusername, username)
        this.inputText(loginSelectors.txtpassword, password)
        this.clickButton(loginSelectors.btnlogin)

        // If terminate session is displayed, they will be termited
        cy
            .get(loginSelectors.body)
            .then(($dialog) => {
                if ($dialog.find(loginSelectors.dialogActiveSession).length > 0) {
                    cy
                        .get(loginSelectors.btnTerminateActiveSession)
                        .each($element => {
                            $element.click()
                        });
                    cy.get(loginSelectors.btnRelogin).click()
                }
            })
    }

    verifyLoginSuccessfully = () => {
        cy
            .get(commonSelectors.headerWelcome)
            .should('be.visible')
    }
}
export default loginPage