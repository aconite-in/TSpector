import { $, ElementFinder } from "protractor"
import { BasePage } from "../Core/BasePage";

export class HomePage extends BasePage {
    public searchTextBox: ElementFinder;
    //public searchButton: ElementFinder;
    //public logo: ElementFinder;
    public ss: string;

    constructor() {
        super();
        this.searchTextBox = $("#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input");
        this.ss = "I am in con";
        //this.searchButton = $("input[value='Google Search']");
        //this.logo = $("div.logo img");

    }
}