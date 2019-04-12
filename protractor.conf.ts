import { browser, Config } from "protractor"

export const config: Config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    directConnect: true,
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    framework: 'custom',
    // path relative to the current config file
    frameworkPath: "./node_modules/protractor-cucumber-framework",
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to this directory.
    specs: [
        'Features/**/*.feature'
    ],

    baseURL: 'https://www.phptravels.net/',

    cucumberOpts: {
        require: 'Steps/UniversalStep.js',
        tags: false,
        profile: false,
        'no-source': true
    },
    onPrepare: function () {
        browser.ignoreSynchronization = true;
    }
};