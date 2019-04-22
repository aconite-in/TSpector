"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const BasePage_1 = require("../Core/BasePage");
const TextBox_1 = require("../Core/WebElements/TextBox");
const Button_1 = require("../Core/WebElements/Button");
const Label_1 = require("../Core/WebElements/Label");
class HomePage extends BasePage_1.BasePage {
    constructor() {
        super("https://d1.fisintegratedpayables.com/fis/customerlogin.aspx", "llo");
        this.UserName = new TextBox_1.TextBox("id", "_Input");
        this.Password = new TextBox_1.TextBox("id", "main_PasswordTextBox");
        this.proceedButton = new Button_1.Button("id", "main_LoginButton");
        this.ErrorLabel = new Label_1.Label("id", "LoginError");
    }
    navigateTo() {
        protractor_1.browser.get(this.pageURL);
    }
}
exports.HomePage = HomePage;
//# sourceMappingURL=HomePage.js.map