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
async function InvokeMethod(pageName, method, args) {
    //Dynamically Import the Page from pages folder
    const PageClass = await Promise.resolve().then(() => __importStar(require("../Pages/" + pageName)));
    //Create a Object of Page 
    const PageObject = Reflect.construct(Reflect.get(PageClass, pageName), []);
    // Invoke the method
    Reflect.apply(Reflect.get(PageObject, method), PageObject, args);
}
async function InvokeElementMethod(pageName, element, action, args) {
    //Dynamically Import the Page from pages folder
    const PageClass = await Promise.resolve().then(() => __importStar(require("../Pages/" + pageName)));
    //Create a Object of Page 
    const PageObject = Reflect.construct(Reflect.get(PageClass, pageName), []);
    // getWebElement
    const ElementObject = Reflect.get(PageObject, element);
    // Invoke the method
    Reflect.apply(Reflect.get(ElementObject, action), ElementObject, args);
}
cucumber_1.Given('User is on {string}', function (pageName) {
    InvokeMethod(pageName, "navigateTo", []);
});
cucumber_1.Given('I go to {string}', function (test) {
    console.log("ss");
});
cucumber_1.When('User types {string} in {string} on {string}', function (inputText, elementObject, pageName) {
    InvokeElementMethod(pageName, elementObject, "type", [inputText]);
});
//# sourceMappingURL=UniversalStep.js.map