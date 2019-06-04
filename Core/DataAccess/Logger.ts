import { appendFile, writeFile } from "fs";
import { assert } from "chai";
import fs from 'fs';
import { browser } from "protractor";

export enum LogLevel { DEBUG, INFO, ERROR, WARN }

export class Logger {

    static fileName: string = "TSpector.log"

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
                browser.takeScreenshot().then(async (png) => {
                    let dateString = new Date().toDateString();
                    await Logger.writeScreenShot(png, `Error_${dateString}.png`);
                    assert.fail(message);
                });
                break;
        }
    }

    static logSubHeading(subtitle: string) {
        appendFile(this.fileName, `\n\n${subtitle}`, (err) => { if (err) console.error(err); });
    }

    private static async  writeScreenShot(data: string, screenshotFilename: string) {
        var stream = fs.createWriteStream(screenshotFilename);
        await stream.write(new Buffer(data, 'base64'));
        stream.end();
    }
}