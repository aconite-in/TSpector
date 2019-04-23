import { Given, When, Then } from "cucumber";
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(120 * 1000);

let currentPageName: string;

async function InvokeMethod(pageName: string, method: string, args: string[]) {
    //When User navigate to that page, make it current page
    if (method == "navigateTo")
        currentPageName = pageName;
    //Dynamically Import the Page from pages folder
    const PageClass = await import("../Pages/" + pageName);
    //Create a Object of Page 
    const PageObject = Reflect.construct(Reflect.get(PageClass, pageName), []);
    // Invoke the method
    Reflect.apply(Reflect.get(PageObject, method), PageObject, args);
}

async function InvokeElementMethod(element: string, action: string, args: string[]) {
    //Dynamically Import the Page from pages folder
    const PageClass = await import("../Pages/" + currentPageName);
    //Create a Object of Page 
    const PageObject = Reflect.construct(Reflect.get(PageClass, currentPageName), []);
    // getWebElement
    const ElementObject = Reflect.get(PageObject, element);
    // Invoke the method
    await Reflect.apply(Reflect.get(ElementObject, action), ElementObject, args);
}

Given('User is on {string}', async (pageName: string) => {
    await InvokeMethod(pageName, "navigateTo", [])
});

When('User types {string} in {string}', async (inputText: string, elementObject: string) => {
    await InvokeElementMethod(elementObject, "type", [inputText]);
});

When('User clicks {string}', async (elementObject: string) => {
    await InvokeElementMethod(elementObject, "click", []);
});

Then('Validate that user is on {string}', async (pageName: string) => {
    await InvokeMethod(pageName, "isOpen", [])
    currentPageName = pageName;
});

Then('Validate that {string} has inner text {string}', async (elementObject: string, innerText: string) => {
    await InvokeElementMethod(elementObject, "validateInnerText", [innerText]);
});