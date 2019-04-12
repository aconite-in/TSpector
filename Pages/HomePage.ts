import { $, ElementFinder } from "protractor"
import { BasePage } from "../Core/BasePage";

export class HomePage extends BasePage {
    public searchTextBox: ElementFinder;
    //public searchButton: ElementFinder;
    //public logo: ElementFinder;

    constructor() {
        super();
        this.searchTextBox = $("#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input");
        //this.searchButton = $("input[value='Google Search']");
        //this.logo = $("div.logo img");
    }
}