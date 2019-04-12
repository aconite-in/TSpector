import { browser } from "protractor";
import { Given, When, Then } from "cucumber";
import { HomePage } from "../Pages/HomePage";


Given('I go to {string}', function (test: string) {
    console.log("ss");
    browser.navigate().to("https://www.google.com/");
});

When('User types {string}', function (test: string) {
    let ss: HomePage = new HomePage();
    ss.searchTextBox.sendKeys(test);
});