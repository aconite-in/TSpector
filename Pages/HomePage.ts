import { $, ElementFinder, browser } from "protractor"
import { BasePage } from "../Core/BasePage";

export class HomePage extends BasePage {
    public searchTextBox: ElementFinder;
    public ss: string;

    constructor() {
        super("https://www.google.com/", "llo");
        this.searchTextBox = $("#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input");
        this.ss = "I am in homePage";
    }

    navigateTo(): void {
        browser.navigate().to(this.pageURL);
    }
}