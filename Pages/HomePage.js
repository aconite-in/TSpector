"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const BasePage_1 = require("../Core/BasePage");
const TextBox_1 = require("../Core/WebElements/TextBox");
class HomePage extends BasePage_1.BasePage {
    constructor() {
        super("https://spdissues.fnis.com/secure/Dashboard.jspa", "llo");
        this.searchTextBox = new TextBox_1.TextBox("usernamelabel");
        this.ss = "I am in homePage";
    }
    navigateTo() {
        protractor_1.browser.navigate().to(this.pageURL);
    }
}
exports.HomePage = HomePage;
//# sourceMappingURL=HomePage.js.map