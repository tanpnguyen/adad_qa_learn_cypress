import commonSelectors from '../selectors/commonSelectors.json'
class basePage {
    constructor(){}
    ninebox = {
        "qtestManager": "",
        "insights": ""
    }
    adminMenu = commonSelectors.adminMenu
    requirementMenu = commonSelectors.requirementMenu
    divProjectArea = commonSelectors.divProjectArea
    ulClients = commonSelectors.ulClients

}
export default basePage