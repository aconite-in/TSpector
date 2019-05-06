import { Given, When, Then, Before, Scenario, HookCode, HookScenarioResult } from "cucumber";
import { Logger, LogLevel } from "../Core/DataAccess/Logger";
import { SQLHelper } from "../Core/DataAccess/SQLHelper";
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(120 * 1000);

let currentPageName: string;

async function InvokeMethod(pageName: string, method: string, args: string[]) {
    //When User navigate to that page, make it current page
    if (method == "navigateTo") {
        currentPageName = pageName;
        Logger.log(LogLevel.INFO, `UniversalStep: Changing current page to ${pageName}`)
    }
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

Before((scenario: HookScenarioResult) => {
    Logger.logSubHeading(`Scenario: ${scenario.pickle.name}`)
})

Given('User is on {string}', async (pageName: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User is on ${pageName}`)
    await InvokeMethod(pageName, "navigateTo", [])
});

When('User types {string} in {string}', async (inputText: string, elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User types ${inputText} in ${elementObject}`)
    await InvokeElementMethod(elementObject, "type", [inputText]);
});

When('User selects {string} from {string}', async (inputText: string, elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User selects ${inputText} from ${elementObject}`)
    await InvokeElementMethod(elementObject, "selectByText", [inputText]);
});

When('User clicks cell {string} in {string}', async (inputText: string, elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User clicks cell  ${inputText} in ${elementObject}`)
    await InvokeElementMethod(elementObject, "clickByText", ['a', inputText]);
});

When('User clicks {string}', async (elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User clicks  ${elementObject}`)
    await InvokeElementMethod(elementObject, "click", []);
});

When('User executes query {string} and store result in key {string}', async (inputText: string, elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User executes query  ${inputText}  and store result in key ${elementObject}`)
    await SQLHelper.query();
});

Then('Validate that user is on {string}', async (pageName: string) => {
    await InvokeMethod(pageName, "isOpen", [])
    currentPageName = pageName;
});

Then('Validate that {string} has inner text {string}', async (elementObject: string, innerText: string) => {
    await InvokeElementMethod(elementObject, "validateInnerText", [innerText]);
});