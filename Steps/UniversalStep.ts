import { Given, When, Then, Before, HookScenarioResult, TableDefinition } from "cucumber";
import { Logger, LogLevel } from "../Core/DataAccess/Logger";
import { SQLHelper } from "../Core/DataAccess/SQLHelper";
import { browser } from "protractor";
import { RestHelper } from "../Core/DataAccess/RestHelper";
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(120 * 1000);

let currentPageName: string;
const cacheManger = new Map<string, string>();

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
    return await Reflect.apply(Reflect.get(PageObject, method), PageObject, args);
}

async function InvokeElementMethod(element: string, action: string, args: any[]) {
    //Dynamically Import the Page from pages folder
    const PageClass = await import("../Pages/" + currentPageName);
    //Create a Object of Page 
    const PageObject = Reflect.construct(Reflect.get(PageClass, currentPageName), []);
    // getWebElement
    const ElementObject = Reflect.get(PageObject, element);
    //Replace Keys from cache if any
    args = await args.map(e => typeof e === 'string' && e.startsWith('#{') && e.endsWith("}") ? e = cacheManger.get(e) : e)
    // Invoke the method
    return await Reflect.apply(Reflect.get(ElementObject, action), ElementObject, args);
}

Before((scenario: HookScenarioResult) => {
    Logger.logSubHeading(`Scenario: ${scenario.pickle.name}`)
    Logger.setCurrentScenario(scenario.pickle.name);
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

When('User click {string} if present', async (elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User clicks ${elementObject} if present`)
    await InvokeElementMethod(elementObject, "click", [false]);
});

When('System EXE SQL: SELECT SINGLE {string} FROM {string} WHERE {string}', async (columnName: string, tableName: string, whereClause: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User executes query  ${columnName}  and store result in key ${tableName}`)
    await SQLHelper.query(columnName, tableName, whereClause).then((value) => {
        cacheManger.set(`#{${columnName}}`, value);
        Logger.log(LogLevel.INFO, `SQL: result stored in key ${columnName} with value ${value}`)
    }).catch((err) => Logger.log(LogLevel.INFO, `SQL: Could not be executed with excepetion: ${err}`))
});

When('User captures text from {string} as key {string}', async (elementObject: string, key: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User captures text from ${elementObject} as key ${key}`)
    let displayedTxt = await InvokeElementMethod(elementObject, "getDisplayedText", []);
    Logger.log(LogLevel.INFO, `UniversalStep: User captured text from "${elementObject}" as key "${key}":\n\t + ${displayedTxt}`)
    cacheManger.set(`#{${key}}`, displayedTxt);
});

When('System waits for {int} seconds', async (timeOut: number) => {
    await browser.sleep(timeOut * 1000);
    Logger.log(LogLevel.INFO, `User waited for ${timeOut} seconds`)
});

Then('Validate that user is on {string}', async (pageName: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: Validate that user is on ${pageName}`)
    await InvokeMethod(pageName, "isOpen", []).then((isPageOpen) => {
        if (isPageOpen) {
            currentPageName = pageName;
            Logger.log(LogLevel.INFO, `UniversalStep: Changed the current page to ${pageName}`)
        } else
            Logger.log(LogLevel.ERROR, `UniversalStep: User is not on ${pageName}`)
    })
});

Then('Validate that {string} has inner text {string}', async (elementObject: string, innerText: string) => {
    await InvokeElementMethod(elementObject, "validateInnerText", [innerText]);
});

Then('Validate that {string} does not have inner text {string}', async (elementObject: string, innerText: string) => {
    await InvokeElementMethod(elementObject, "validateInnerText", [innerText, true]);
});

Then('Validate table {string} contains row', async (elementObject: string, table: TableDefinition) => {
    await InvokeElementMethod(elementObject, "validateRow", [table]);
});

Then('Validate table {string} contains row in DB SQL SELECT {string} FROM {string} WHERE {string}', async (elementObject: string, columnName: string, tableName: string, whereClause: string) => {
    await InvokeElementMethod(elementObject, "validateRowFromDB", [columnName, tableName, whereClause]);
});

When('System makes GET request with parameter {string}', async (parameters: string) => {
    await RestHelper.getRequest(parameters);
});

When('System makes POST request with parameter {string}', async (parameters: string) => {
    await RestHelper.postRequest(parameters);
});

Given('API end point is {string}', async (apiEndPoint: string) => {
    await RestHelper.setEndPoint(apiEndPoint);
});

Given('API default headers are {string}', async (headers: string) => {
    await RestHelper.setDefaultHeaders(headers);
});

Then('Validate API response is {string}', async (expectedResponse: string) => {
    await RestHelper.validateResponse(expectedResponse);
});

Then('Validate API response from file {string}', async (filePath: string) => {
    await RestHelper.validateFromFile(filePath);
});