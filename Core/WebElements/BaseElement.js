"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const chai_1 = require("chai");
class BaseElement {
    get() {
        switch (this.locatorType.toLocaleLowerCase()) {
            case "css":
                return protractor_1.element(protractor_1.by.css(this.locatorValue));
            case "classname":
                return protractor_1.element(protractor_1.by.className(this.locatorValue));
            case "linktext":
                return protractor_1.element(protractor_1.by.linkText(this.locatorValue));
            case "tagname":
                return protractor_1.element(protractor_1.by.tagName(this.locatorValue));
            case "xpath":
                return protractor_1.element(protractor_1.by.xpath(this.locatorValue));
            case "name":
                return protractor_1.element(protractor_1.by.name(this.locatorValue));
            case "partiallinktext":
                return protractor_1.element(protractor_1.by.partialLinkText(this.locatorValue));
            case "id":
                return protractor_1.element(protractor_1.by.id(this.locatorValue));
            case "model":
                return protractor_1.element(protractor_1.by.model(this.locatorValue));
            default:
                return protractor_1.element(protractor_1.by.id(this.locatorValue));
        }
    }
    constructor(locatorType, locatorValue) {
        this.locatorValue = locatorValue;
        this.locatorType = locatorType;
    }
    async validateInnerText(validationText) {
        let innertext = await this.get().getText();
        chai_1.assert.equal(innertext, validationText);
    }
}
exports.BaseElement = BaseElement;
//# sourceMappingURL=BaseElement.js.map