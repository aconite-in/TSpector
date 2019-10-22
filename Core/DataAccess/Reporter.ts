const reporter = require("cucumber-html-reporter");
const options = {
    // jsonFile: `./Reports/TSpector_@set2.json`,
    jsonDir: "./Reports",
    metadata: {
        "App Version": "0.3.2",
        "Browser": "Chrome 75.0.3770.90",
        "Executed": "Locally",
        "Parallel": "No",
        "Platform": "Windows 10",
        "Test Environment": "Pre-Production",
    },
    output: `./Reports/TSpector.html`,
    reportSuiteAsScenarios: true,
    theme: "bootstrap",
};
reporter.generate(options);
