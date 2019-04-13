"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var BasePage_1 = require("../Core/BasePage");
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        var _this = _super.call(this) || this;
        _this.searchTextBox = protractor_1.$("#tsf > div:nth-child(2) > div > div.RNNXgb > div > div.a4bIc > input");
        _this.ss = "I am in con";
        return _this;
        //this.searchButton = $("input[value='Google Search']");
        //this.logo = $("div.logo img");
    }
    return HomePage;
}(BasePage_1.BasePage));
exports.HomePage = HomePage;
