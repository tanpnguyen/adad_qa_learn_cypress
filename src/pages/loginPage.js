import loginSelector from '../selectors/loginPage.json'
class loginPage {
    constructor() {

    }
    inputText = (element, string) => cy.get(element).type(string)

    clickButton = (element) => cy.get(element).click()

    checkElementVisible = (element) => cy.get(element).should('be.visible')

    checkElementVisibleLoginPage = () => {
        this.checkElementVisible(loginSelector.txtusername)
        this.checkElementVisible(loginSelector.txtpassword)
        this.checkElementVisible(loginSelector.btnlogin)
    }

    loginAction = async (username, password) => {
        this.inputText(loginSelector.txtusername, username)
        this.inputText(loginSelector.txtpassword, password)
        this.clickButton(loginSelector.btnlogin)
        console.log("Checking if dialog is displayed")

        cy.get(loginSelector.body).then(($dialog) => {
            if ($dialog.find(loginSelector.dialogActiveSession).length > 0) {
                cy.get(loginSelector.btnTerminateActiveSession).click({ multiple: true })
                cy.get(loginSelector.btnRelogin).click()
            }
        })


    }
}
export default loginPage