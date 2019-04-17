"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(120 * 1000);
async function InvokeMethod(pageName, method, args) {
    //Dynamically Import the Page from pages folder
    const PageClass = await Promise.resolve().then(() => __importStar(require("../Pages/" + pageName)));
    //Create a Object of Page 
    const PageObject = Reflect.construct(Reflect.get(PageClass, pageName), []);
    // Invoke the method
    return Reflect.apply(Reflect.get(PageObject, method), PageObject, args);
}
async function InvokeElementMethod(pageName, element, action, args) {
    //Dynamically Import the Page from pages folder
    const PageClass = await Promise.resolve().then(() => __importStar(require("../Pages/" + pageName)));
    //Create a Object of Page 
    const PageObject = Reflect.construct(Reflect.get(PageClass, pageName), []);
    // getWebElement
    const ElementObject = Reflect.get(PageObject, element);
    // Invoke the method
    await Reflect.apply(Reflect.get(ElementObject, action), ElementObject, args);
}
cucumber_1.Given('User is on {string}', async (pageName) => {
    await InvokeMethod(pageName, "navigateTo", []);
});
cucumber_1.When('User types {string} in {string} on {string}', async (inputText, elementObject, pageName) => {
    await InvokeElementMethod(pageName, elementObject, "type", [inputText]);
});
cucumber_1.When('User clicks {string} on {string}', async (elementObject, pageName) => {
    await InvokeElementMethod(pageName, elementObject, "click", []);
});
cucumber_1.Then('Validate that user is on {string}', async (pageName) => {
    await InvokeMethod(pageName, "isOpen", []);
});
//# sourceMappingURL=UniversalStep.js.map