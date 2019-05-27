import { browser, Config } from "protractor"
import { Logger } from "./Core/DataAccess/Logger";

export const config: Config = {
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: true,
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
        //format: ['json:TSpector.json'],
        tags: ['@smoke'],
        profile: false,
        'no-source': true,
    },
    onPrepare: function () {
        browser.driver.manage().window().maximize();
        browser.ignoreSynchronization = true;
        Logger.InstantiateLogger();
    }
    },
    // onComplete: () => {
    //     var reporter = require('cucumber-html-reporter');

    //     var options = {
    //         theme: 'bootstrap',
    //         jsonFile: 'TSpector.json',
    //         output: 'TSpector.html',
    //         reportSuiteAsScenarios: true,
    //         metadata: {
    //             "App Version": "0.3.2",
    //             "Test Environment": "STAGING",
    //             "Browser": "Chrome  54.0.2840.98",
    //             "Platform": "Windows 10",
    //             "Parallel": "Scenarios",
    //             "Executed": "Remote"
    //         }
    //     };
    //     reporter.generate(options);
    // }
};