import { After, Before, Given, HookScenarioResult, TableDefinition, Then, When } from "cucumber";
import { browser, by, element } from "protractor";
import { Logger, LogLevel } from "../Core/DataAccess/Logger";
import { RestHelper } from "../Core/DataAccess/RestHelper";
import { SQLHelper } from "../Core/DataAccess/SQLHelper";
import { config } from "../protractor.conf";
const { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(120 * 1000);

let currentPageName: string;
const cacheManger = new Map<string, string>();
const constantsObj = config.constants;
Object.keys(constantsObj).forEach((key) => { cacheManger.set(`#{${key}}`, constantsObj[key]); });

async function InvokeMethod(pageName: string, method: string, args: string[]) {
    // When User navigate to that page, make it current page
    if (method === "navigateTo") {
        currentPageName = pageName;
        // Logger.log(LogLevel.INFO, `UniversalStep: Changing current page to ${pageName}`)
    }
    // Dynamically Import the Page from pages folder
    const PageClass = await import("../Pages/" + pageName);
    // Create a Object of Page
    const PageObject = Reflect.construct(Reflect.get(PageClass, pageName), []);
    // Invoke the method
    return await Reflect.apply(Reflect.get(PageObject, method), PageObject, args);
}

async function InvokeElementMethod(element: string, action: string, args: any[]) {
    // Dynamically Import the Page from pages folder
    const PageClass = await import("../Pages/" + currentPageName);
    // Create a Object of Page
    const PageObject = Reflect.construct(Reflect.get(PageClass, currentPageName), []);
    // getWebElement
    const ElementObject = Reflect.get(PageObject, element);
    // Replace Keys from cache if any
    args = await args.map((e) => typeof e === "string" && e.startsWith("#{") && e.endsWith("}") ? e = cacheManger.get(e) : e);
    // Invoke the method
    return await Reflect.apply(Reflect.get(ElementObject, action), ElementObject, args);
}

Before((scenario: HookScenarioResult) => {
    Logger.logSubHeading(`Scenario: ${scenario.pickle.name}`);
    Logger.setCurrentScenario(scenario.pickle.name);

});

After(function(scenario) {
    if (scenario.result.status === "failed") {
        const attach = this.attach;
        return browser.takeScreenshot().then((png) => {
            const decodedImage = new Buffer(png, "base64");
            return attach(decodedImage, "image/png");
        });
    }
});

/**
 * Calls the navigateTo function in the Page Object.
 * The navigateTo function should contain the code till navigation to the page.
 *
 * PageName(Parameter 1): ClassName Described in Page Object.
 */
Given("User is on Page {string}", async (pageName: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User is on Page ${pageName}`);
    await InvokeMethod(pageName, "navigateTo", []);
});

/**
 * Types text on the screen using the element specified in the input text of step.
 *
 * Input Text (Parameter 1): The text to be typed in the text box.
 * Element (Parameter 2): The element in the Page Object.
 */
When("User types {string} in textbox {string}", async (inputText: string, elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User types ${inputText} in textbox ${elementObject}`);
    await InvokeElementMethod(elementObject, "type", [inputText]);
});

/**
 * Types random text appended to input tex on the screen using the element specified in the input text of step.
 *
 * Input Text (Parameter 1): The text to be typed appended with some random text in the text box.
 * Element (Parameter 2): The element in the Page Object.
 */
When("User types randaom data starting with {string} in textbox {string}", async (inputText: string, elementObject: string) => {
    inputText = inputText + Math.floor(9999 * Math.random() + 1);
    Logger.log(LogLevel.INFO, `UniversalStep: User types random data starting with ${inputText} in textbox ${elementObject}`);
    await InvokeElementMethod(elementObject, "type", [inputText]);
});

/**
 * Select specifed element in the combo box. The text in the selection should be specified.
 *
 * Option (Parameter 1): Text of the option specified in combo box to be selected.
 * Element (Parameter 2): The element in the Page Object.
 */
When("User selects {string} from Combobox {string}", async (inputText: string, elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User selects ${inputText} from Combobox ${elementObject}`);
    await InvokeElementMethod(elementObject, "selectByText", [inputText]);
});

/**
 * The switch provides the flexiblity to wait for anugular application or to reach as non-angular application.
 * Protactor provides a functionality to auto sync with angular application which helps in avoiding use wait.
 * This switch can be set in the config file and only be used in case where an angular application has a non-angular login page.
 *
 * Flag (Parameter 1): set flag to true or false.
 */
When("User switch ignoresynchronization to {string}", async (inputText: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User switches ignoresynchronization to ${inputText}`);
    if (inputText.toLocaleLowerCase() === "false") { browser.ignoreSynchronization = false; } else { browser.ignoreSynchronization = true; }
});

/**
 * Clicks cell of HTMLTable or DataTable with the given cell text. If the next page and previous page button locators are specified then the step will try to navigate all pages in the HTMLTable or DataTable until it find the element to click or will fail.
 * The cell text is not specific to any column and can be present in any column and any row.
 *
 * Cell Text (Parameter 1): The text in the table to be clicked.
 * Element (Parameter 2): The element in the Page Object.
 */
When("User clicks cell {string} in table {string}", async (inputText: string, elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User clicks cell  ${inputText} in table ${elementObject}`);
    await InvokeElementMethod(elementObject, "clickByText", ["*", inputText]);
});

/**
 * Double clicks cell of HTMLTable or DataTable with the given cell text. If the next page and previous page button locators are specified then the step will try to navigate all pages in the HTMLTable or DataTable until it find the element to click or will fail.
 * The cell text is not specific to any column and can be present in any column and any row.
 *
 * Cell Text (Parameter 1): The text in the table to be double clicked.
 * Element (Parameter 2): The element in the Page Object.
 */
When("User doubleclicks cell {string} in table {string}", async (inputText: string, elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User doubleclicks cell  ${inputText} in table ${elementObject}`);
    await InvokeElementMethod(elementObject, "doubleclickByText", ["*", inputText]);
});

/**
 * Clicks the specified element.
 *
 * Element (Parameter 1): The element in the Page Object.
 */
When("User clicks on element {string}", async (elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User clicks on element ${elementObject}`);
    await InvokeElementMethod(elementObject, "click", []);
});

/**
 * Clicks the specified element, however if the element is not present the step will not fail but log a warning in log and will continue the execution of the consecutive of the steps. This step can be used where there are concurrent login pop-up, which are not always appear and in case the show up, we need to click OK on them.
 *
 * Element (Parameter 1): The element in the Page Object.
 */
When("User clicks on element {string} if present", async (elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User clicks on element ${elementObject} if present`);
    await InvokeElementMethod(elementObject, "click", [false]);
});

/**
 * The step will explicity wait for the number of seconds that are provided in the parameters. This step should be only used in case of a non-angular application.
 *
 * Usage: This step can be used in angular applications as well where there is some uncertain wait required which is not dependent on browser, like downloading of the file.
 *
 * Time (Parameter 1): The time in seconds to wait.
 */
When("System waits for {int} seconds", async (timeOut: number) => {
    await browser.sleep(timeOut * 1000);
    Logger.log(LogLevel.INFO, `User waited for ${timeOut} seconds`);
});

/**
 * This step will execute the arbitrary JavaScript specified in the 1st parameter and will store the result in cache memory with key in the 2nd parameter to be used in next steps. Make sure to pass the JavaScript that returns some value.
 *
 * Usage: This step can be used in the situtaion where you require some dynamic value like current date or perform some calculations changing card numbers.
 *
 * Input Text (Parameter 1):
 * Element (Parameter 2): The element in the Page Object.
 */
When("System EXE JS {string} and sorts result in key {string}", async (jsCode: string, key: string) => {
    const result = await eval(jsCode);
    cacheManger.set(key, result);
    Logger.log(LogLevel.INFO, `JS exeuction returned: ${result} and stored in Key ${key}`);
});

/**
 * This will simply take a screenshot of the current page and will attach it in the report. This step should be avoided as it will increase the size of the report.
 */
When("System takes a screenshot", async function() {
    const attach = this.attach;
    return browser.takeScreenshot().then((png) => {
        const decodedImage = new Buffer(png, "base64");
        Logger.log(LogLevel.INFO, `System took a screenshot and added to report`);
        return attach(decodedImage, "image/png");
    }).catch((err) => Logger.log(LogLevel.WARN, `System was unable to take screenshot due to ${err}`));
});

/**
 * Swtich to the newly opened window during the execution.
 */
When("System switch to new window", async () => {
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[handles.length - 1]);
    const newWindow = await browser.getWindowHandle();
    Logger.log(LogLevel.INFO, `Swtiched to new window ${newWindow}`);
});

/**
 * Executes the SQL query in the parameter and stores the result in the cache with the column name specified. The step should be provided with only one column in parameter. All joins are allowed in the From parameter and nested queries are allowed in the where and from clause.
 *
 * Note: Value stored in the cache can be used by specifying #{key} in any step.
 *
 * Column Name (Parameter 1): The Column name in the sql table
 * From (Parameter 2): The table or table with the join from where the data to be fetched.
 * Where(Parameter 3): The where clause condition for the retrival of the data.
 */
When("System EXE SQL: SELECT SINGLE {string} FROM {string} WHERE {string}", async (columnName: string, tableName: string, whereClause: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User executes query  ${columnName}  and store result in key ${tableName}`);
    await SQLHelper.query(columnName, tableName, whereClause).then((value) => {
        cacheManger.set(`#{${columnName}}`, value);
        Logger.log(LogLevel.INFO, `SQL: result stored in key ${columnName} with value ${value}`);
    }).catch((err) => Logger.log(LogLevel.INFO, `SQL: Could not be executed with excepetion: ${err}`));
});

/**
 * This step will capture the displayed text of the element specified in Parameter 1 and will store it the cache for later use in the consecutive steps with the key mentioned in the 2nd parameter. If the same key used twice then the old existing data in the key will be replaced, in case there is no existing key, then a new key would be created. To capture value from a text box or text area, please use an alternative step.
 *
 * Note: Value stored in the cache can be used by specifying #{key} in any step.
 *
 * Element (Parameter 1): The element in the Page Object.
 * Key (Parameter 2): The key of the cache where the data is to be stored.
 */
When("User captures text from {string} as key {string}", async (elementObject: string, key: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User captures text from ${elementObject} as key ${key}`);
    const displayedTxt = await InvokeElementMethod(elementObject, "getDisplayedText", []);
    Logger.log(LogLevel.INFO, `UniversalStep: User captured text from "${elementObject}" as key "${key}":\n\t + ${displayedTxt}`);
    cacheManger.set(`#{${key}}`, displayedTxt);
});

/**
 * This step will capture the displayed text of the text box specified in Parameter 1 and will store it the cache for later use in the consecutive steps with the key mentioned in the 2nd parameter. If the same key used twice then the old existing data in the key will be replaced, in case there is no existing key, then a new key would be created.
 *
 * Note: Value stored in the cache can be used by specifying #{key} in any step.
 *
 * TextBox (Parameter 1): The element in the Page Object.
 * Key (Parameter 2): The key of the cache where the data is to be stored.
 */
When("User captures datavalue from {string} as key {string}", async (elementObject: string, key: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User captures datavalue from ${elementObject} as key ${key}`);
    const displayedTxt = await InvokeElementMethod(elementObject, "getDisplayeddata", []);
    Logger.log(LogLevel.INFO, `UniversalStep: User captured datavalue from "${elementObject}" as key "${key}":\n\t + ${displayedTxt}`);
    cacheManger.set(`#{${key}}`, displayedTxt);
});

/**
 * Verify if the user is on the specified page or not by validating the XPathValidator specified in the construtor of the page object (i.e. The XPath specified in the super keyword of the construtor of the page object).
 *
 * PageName (Parameter 1): Class name of the page object.
 */
Then("Validate that user is on page {string}", async (pageName: string) => {
    await InvokeMethod(pageName, "isOpen", ["true"]).then((isPageOpen) => {
        Logger.log(LogLevel.INFO, `UniversalStep: Validate that user is on page ${pageName}`);
        if (isPageOpen) {
            currentPageName = pageName;
            Logger.log(LogLevel.INFO, `UniversalStep: Changed the current page to ${pageName}`);
        } else {
            Logger.log(LogLevel.ERROR, `UniversalStep: User is not on ${pageName}`);
        }
    });
});

/**
 * Validates if the specified text in 1st parameter is displayed on the webpage in web element specified in the second parameter.
 *
 * Text (Parameter 1): The text to be validated.
 * Element (Parameter 2): The element in the Page Object.
 */
Then("Validate that {string} has inner text {string}", async (elementObject: string, innerText: string) => {
    await InvokeElementMethod(elementObject, "validateInnerText", [innerText]);
});

/**
 * Validates if the specified text in 1st parameter is not displayed on the webpage in web element specified in the second parameter.
 *
 * Text (Parameter 1): The text to be validated.
 * Element (Parameter 2): The element in the Page Object.
 */
Then("Validate that {string} does not have inner text {string}", async (elementObject: string, innerText: string) => {
    await InvokeElementMethod(elementObject, "validateInnerText", [innerText, true]);
});

/**
 * Validates if the specified text in 1st parameter is displayed on the webpage in web element specified in the second parameter. In case the specified text is not displayed, this step will log a warining and will continue the execution.
 *
 * Text (Parameter 1): The text to be validated.
 * Element (Parameter 2): The element in the Page Object.
 */
Then("Validate that {string} has inner text {string},skip failure", async (elementObject: string, innerText: string) => {
    await InvokeElementMethod(elementObject, "validateInnerText", [innerText, false, false]);
});

/**
 * Validates if the specified text in 1st parameter is not displayed on the webpage in web element specified in the second parameter.In case the specified text is displayed, this step will log a warining and will continue the execution.
 *
 * Text (Parameter 1): The text to be validated.
 * Element (Parameter 2): The element in the Page Object.
 */
Then("Validate that {string} does not have inner text {string},skip failure", async (elementObject: string, innerText: string) => {
    // await InvokeElementMethod(elementObject, "validateInnerTextNotMandatory", [innerText, true, false]);
    await InvokeElementMethod(elementObject, "validateInnerText", [innerText, true, false]);
});

/**
 * Wait for an element specified in the parameter to be loaded.
 *
 * Element (Parameter 1): The element in the Page Object.
 */
When("User waits for {string} to be present in screen", async (elementObject: string) => {
    Logger.log(LogLevel.INFO, `User waits for ${elementObject} to be present in screen`);
    await InvokeElementMethod(elementObject, "waitfor", [false]);
});

/**
 * This step uses Data table provided by Cucumber to validate if the table mentioned in parameter contains the row in the DataTable. The step can work multiple rows if provided in the datable. If the next page and previous page locators are specified in the DataTable or HTML table then, it would navigate through all to find the rows.
 *
 * HTMLTable|DataTable (Parameter 1): The element in the Page Object.
 */
Then("Validate table {string} contains row", async (elementObject: string, table: TableDefinition) => {
    await InvokeElementMethod(elementObject, "validateRow", [table]);
});

/**
 * This step will refresh the webpage the given number of times.
 *
 * Number (Parameter 1): The number of times to webpage to be refreshed.
 */
When("User refresh current page {int} times", async (refreshcount: number) => {
    let refreshtime;
    for (refreshtime = 1; refreshtime <= refreshcount; refreshtime++) {
        await browser.driver.navigate().refresh();
    }
    Logger.log(LogLevel.INFO, `User refreshed current page ${refreshcount} times`);
});

/**
 * This step will validate if the table mentioned in parameter contains the row in the table as produced by SQL Query. The step can work multiple rows if provided in the datable. If the next page and previous page locators are specified in the DataTable or HTML table then, it would navigate through all the pages to find the rows.
 *
 * Note: The columns out from the SQL query should match the columns displayed on the webpage with exact sequence.
 *
 * HTMLTable|DataTable (Parameter 1): The element in the Page Object.
 * Column Name (Parameter 2): The Column name in the sql table
 * From (Parameter 3): The table or table with the join from where the data to be fetched.
 * Where(Parameter 4): The where clause condition for the retrival of the data.
 */
Then("Validate table {string} contains row in DB SQL SELECT {string} FROM {string} WHERE {string}", async (elementObject: string, columnName: string, tableName: string, whereClause: string) => {
    await InvokeElementMethod(elementObject, "validateRowFromDB", [columnName, tableName, whereClause]);
});

/**
 * This step makes a GET request to API with the parameters specified in the 1st parameter.
 * The API End point can be set using other step Given('API end point is ""), which should be used before using this step.
 *
 * Payload (Parameter 1): Payload to be sent in the request.
 */
When("System makes GET request with parameter {string}", async (parameters: string) => {
    await RestHelper.getRequest(parameters);
});

/**
 * This step makes a POST request to API with the parameters specified in the 1st parameter.
 * The API End point can be set using other step Given('API end point is ""), which should be used before using this step.
 *
 * Payload (Parameter 1): Payload to be sent in the request.
 */
When("System makes POST request with parameter {string}", async (parameters: string) => {
    await RestHelper.postRequest(parameters);
});

/**
 * This step makes a POST request to API with the parameters specified in the 1st parameter and compares it again 2nd parameter.
 * This step requires payload and expected response from the file and paramter should be passed with file path instead of direct payload.
 * The API End point can be set using other step Given('API end point is ""), which should be used before using this step.
 *
 * Payload File Path(Parameter 1): File path of file containing the payload to be sent in the request.
 * Expected Payload File Path(Parameter 2): File path of the file containing expected payload to be received in the response of the request.
 */
When("System makes POST request with parameter from {string} and compare response again {string}", async (requestfileName: string, responsefileName: string) => {
    await RestHelper.postComplete(requestfileName, responsefileName);
});

/**
 * This step makes a GET request to API with the parameters specified in the 1st parameter and compares it again 2nd parameter.
 * This step requires payload and expected response from the file and paramter should be passed with file path instead of direct payload.
 * The API End point can be set using other step Given('API end point is ""), which should be used before using this step.
 *
 * Payload File Path(Parameter 1): File path of file containing the payload to be sent in the request.
 * Expected Payload File Path(Parameter 2): File path of the file containing expected payload to be received in the response of the request.
 */
When("System makes GET request with parameters {string} and compare response again {string}", async (requestParameters: string, responsefileName: string) => {
    await RestHelper.getComplete(requestParameters, responsefileName);
});

/**
 * This step stores the End-Point of API to be used in the POST and GET request steps. In case your API calls requires headers, those can be specified using a other step provided to set the default headers.
 * It is highly recommended to use this step in "Backgroud" of the feature file so various scenarios can be tested for same end-point and feature file becomes more readable.
 *
 * End-Point (Parameter 1): The URL of API to be used for next requests.
 */
Given("API end point is {string}", async (apiEndPoint: string) => {
    await RestHelper.setEndPoint(apiEndPoint);
});

/**
 * This step stores the headers of the End-Point of the API to be used in the POST and GET request steps.
 * It is highly recommended to use this step in "Backgroud" of the feature file so various scenarios can be tested for same end-point and feature file becomes more readable.
 *
 * Headers (Parameter 1): The headers of API to be used for next requests.
 */
Given("API default headers are {string}", async (headers: string) => {
    await RestHelper.setDefaultHeaders(headers);
});

/**
 * This step select the date from the calendar control of an angular application
 *
 * Year (Parameter 1): Year to be selected in the calender control
 * Month (Parameter 2): Month to be selected in the calender control
 * Day (Parameter 3): Date to be selected in the calender control
 */
When("User select Year {string} Month {string} Day {string} from calendar {string}", async (year: string, month: string, day: string, elementObject: string) => {
    Logger.log(LogLevel.INFO, `UniversalStep: User clicks on element ${elementObject}`);
    await InvokeElementMethod(elementObject, "selectCalendarDate", [year, month, day]);
});
