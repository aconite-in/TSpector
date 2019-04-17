"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class Button {
    get() {
        return protractor_1.element(protractor_1.by.id(this.locatorValue));
    }
    constructor(locatorValue) {
        this.locatorValue = locatorValue;
    }
    async click() {
        await this.get().click();
    }
}
exports.Button = Button;
//# sourceMappingURL=Button.js.map