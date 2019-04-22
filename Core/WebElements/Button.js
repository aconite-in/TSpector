"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseElement_1 = require("./BaseElement");
class Button extends BaseElement_1.BaseElement {
    async click() {
        await this.get().click();
    }
}
exports.Button = Button;
//# sourceMappingURL=Button.js.map