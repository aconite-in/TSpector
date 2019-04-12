"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var cucumber_1 = require("cucumber");
var HomePage_1 = require("../Pages/HomePage");
cucumber_1.Given('I go to {string}', function (test) {
    console.log("ss");
    protractor_1.browser.navigate().to("https://www.google.com/");
});
cucumber_1.When('User types {string}', function (test) {
    var ss = new HomePage_1.HomePage();
    ss.searchTextBox.sendKeys(test);
});
