"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const BasePage_1 = require("../Core/BasePage");
class HomePage extends BasePage_1.BasePage {
    constructor() {
        super("https://www.google.com/", "llo");
        this.searchTextBox = protractor_1.$("#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input");
        this.ss = "I am in homePage";
    }
    navigateTo() {
        protractor_1.browser.navigate().to(this.pageURL);
    }
}
exports.HomePage = HomePage;
//# sourceMappingURL=HomePage.js.map