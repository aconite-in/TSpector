import { $, ElementFinder, browser } from "protractor"
import { BasePage } from "../Core/BasePage";
import { TextBox } from "../Core/WebElements/TextBox";

export class HomePage extends BasePage {
    public searchTextBox: TextBox = new TextBox("usernamelabel");
    public ss: string;

    constructor() {
        super("https://spdissues.fnis.com/secure/Dashboard.jspa", "llo");
        this.ss = "I am in homePage";
    }

    navigateTo(): void {
        browser.navigate().to(this.pageURL);
    }
}