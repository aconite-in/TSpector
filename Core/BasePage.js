"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasePage {
    constructor(pageURL, xPathValidator) {
        this.pageURL = pageURL;
        this.xPathValidator = xPathValidator;
    }
    async isOpen() {
        await console.log("sapadla");
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map