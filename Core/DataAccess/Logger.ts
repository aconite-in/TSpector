import { appendFile, writeFile } from "fs";
import { assert } from "chai";
import fs from 'fs';
import { browser } from "protractor";

export enum LogLevel { DEBUG, INFO, ERROR, WARN }

export class Logger {

    static fileName: string = "TSpector.log"
    private static currentScenarioName = "";

    static InstantiateLogger(fileName?: string) {
        writeFile(this.fileName, "", (err) => { if (err) console.error(err); })
    }

    static log(level: LogLevel, message: string) {
        switch (level) {
            case LogLevel.DEBUG:
                message = "\nDEBUG: " + message;
                appendFile(this.fileName, message, (err) => { if (err) console.error(err); });
            case LogLevel.INFO:
                message = "\nINFO: " + message;
                appendFile(this.fileName, message, (err) => { if (err) console.error(err); });
                break;
            case LogLevel.WARN:
                message = "\nWARN: " + message;
                appendFile(this.fileName, message, (err) => { if (err) console.error(err); });
                break;
            case LogLevel.ERROR:
                message = "\nERROR: " + message;
                appendFile(this.fileName, message, (err) => { if (err) console.error(err); });
                // browser.takeScreenshot().then((png) => {
                //     Logger.writeScreenShot(png, `Failure_${this.currentScenarioName}.png`);
                // });
                assert.fail();
                break;
        }
    }

    static logSubHeading(subtitle: string) {
        appendFile(this.fileName, `\n\n${subtitle}`, (err) => { if (err) console.error(err); });
    }

    static setCurrentScenario(CurrentScenario: string) {
        this.currentScenarioName = CurrentScenario
    }

    private static async writeScreenShot(data: string, screenshotFilename: string) {
        var stream = fs.createWriteStream(screenshotFilename);
        await stream.write(new Buffer(data, 'base64'));
        stream.end();
    }
}