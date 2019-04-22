"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseElement_1 = require("./BaseElement");
class TextBox extends BaseElement_1.BaseElement {
    async type(inputText) {
        await this.get().sendKeys(inputText);
    }
}
exports.TextBox = TextBox;
//# sourceMappingURL=TextBox.js.map