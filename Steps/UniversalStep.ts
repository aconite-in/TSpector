import { Given, When, Then } from "cucumber";
var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(120 * 1000);

async function InvokeMethod(pageName: string, method: string, args: string[]) {
    //Dynamically Import the Page from pages folder
    const PageClass = await import("../Pages/" + pageName);
    //Create a Object of Page 
    const PageObject = Reflect.construct(Reflect.get(PageClass, pageName), []);
    // Invoke the method
    return Reflect.apply(Reflect.get(PageObject, method), PageObject, args);
}

async function InvokeElementMethod(pageName: string, element: string, action: string, args: string[]) {
    //Dynamically Import the Page from pages folder
    const PageClass = await import("../Pages/" + pageName);
    //Create a Object of Page 
    const PageObject = Reflect.construct(Reflect.get(PageClass, pageName), []);
    // getWebElement
    const ElementObject = Reflect.get(PageObject, element);
    // Invoke the method
    await Reflect.apply(Reflect.get(ElementObject, action), ElementObject, args);
}

Given('User is on {string}',  async (pageName: string) => {
    await InvokeMethod(pageName, "navigateTo", [])
});

When('User types {string} in {string} on {string}', async (inputText: string, elementObject: string, pageName: string) => {
    await InvokeElementMethod(pageName, elementObject, "type", [inputText]);
});

When('User clicks {string} on {string}', async (elementObject: string, pageName: string) => {
    await InvokeElementMethod(pageName, elementObject, "click", []);
});

Then('Validate that user is on {string}', async (pageName: string) => {
    await InvokeMethod(pageName, "isOpen", [])
});