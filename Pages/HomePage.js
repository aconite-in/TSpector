"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const BasePage_1 = require("../Core/BasePage");
const TextBox_1 = require("../Core/WebElements/TextBox");
const Button_1 = require("../Core/WebElements/Button");
class HomePage extends BasePage_1.BasePage {
    constructor() {
        super("https://d1.fisintegratedpayables.com/fis/customerlogin.aspx", "llo");
        this.UserName = new TextBox_1.TextBox("_Input");
        this.Password = new TextBox_1.TextBox("main_PasswordTextBox");
        this.proceed = new Button_1.Button("main_LoginButton");
    }
    navigateTo() {
        protractor_1.browser.get(this.pageURL);
    }
}
exports.HomePage = HomePage;
//# sourceMappingURL=HomePage.js.map