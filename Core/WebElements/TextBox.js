"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class TextBox {
    get() {
        return protractor_1.element(protractor_1.by.id(this.locatorValue));
    }
    constructor(locatorValue) {
        this.locatorValue = locatorValue;
    }
    type(inputText) {
        this.get().click();
        this.get().sendKeys(inputText);
    }
}
exports.TextBox = TextBox;
//# sourceMappingURL=TextBox.js.map