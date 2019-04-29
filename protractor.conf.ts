import { browser, Config } from "protractor"
import { Logger } from "./Core/DataAccess/Logger";

export const config: Config = {
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    getPageTimeout: 100000,
    allScriptsTimeout: 500000,
    framework: 'custom',
    // path relative to the current config file
    frameworkPath: "./node_modules/protractor-cucumber-framework",
    capabilities: {
        'browserName': 'chrome'
    },
    chromeDriver: 'C:/Users/E5555287/Downloads/chromedriver/chromedriver.exe',

    // Spec patterns are relative to this directory.
    specs: [
        'Features/**/*.feature'
    ],

    baseURL: 'https://d1.fisintegratedpayables.com/fis/customerlogin.aspx',

    cucumberOpts: {
        require: 'Steps/*.js',
        tags: false,
        profile: false,
        'no-source': true,
    },
    onPrepare: function () {
        browser.ignoreSynchronization = true;
        browser.driver.manage().window().maximize();
        Logger.init();
    }
};