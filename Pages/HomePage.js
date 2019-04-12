"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var HomePage = /** @class */ (function () {
    //public searchButton: ElementFinder;
    //public logo: ElementFinder;
    function HomePage() {
        this.searchTextBox = protractor_1.$("#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input");
        //this.searchButton = $("input[value='Google Search']");
        //this.logo = $("div.logo img");
    }
    return HomePage;
}());
exports.HomePage = HomePage;
