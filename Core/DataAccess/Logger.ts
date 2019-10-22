import { assert } from "chai";
import { appendFile, writeFile } from "fs";
import fs from "fs";
import { browser } from "protractor";

export enum LogLevel { DEBUG, INFO, ERROR, WARN }

export class Logger {

    public static fileName: string = "./Reports/TSpector.log";

    public static InstantiateLogger(fileName?: string) {
        writeFile(this.fileName, "", (err) => { if (err) { console.error(err); } });
    }

    public static log(level: LogLevel, message: string) {
        switch (level) {
            case LogLevel.DEBUG:
                message = "\nDEBUG: " + message;
                appendFile(this.fileName, message, (err) => { if (err) { console.error(err); } });
            case LogLevel.INFO:
                message = "\nINFO: " + message;
                appendFile(this.fileName, message, (err) => { if (err) { console.error(err); } });
                break;
            case LogLevel.WARN:
                message = "\nWARN: " + message;
                appendFile(this.fileName, message, (err) => { if (err) { console.error(err); } });
                break;
            case LogLevel.ERROR:
                message = "\nERROR: " + message;
                appendFile(this.fileName, message, (err) => { if (err) { console.error(err); } });
                assert.fail(message);
                break;
        }
    }

    public static logSubHeading(subtitle: string) {
        appendFile(this.fileName, `\n\n${subtitle}`, (err) => { if (err) { console.error(err); } });
    }

    public static setCurrentScenario(CurrentScenario: string) {
        this.currentScenarioName = CurrentScenario;
    }
    private static currentScenarioName = "";

    private static async writeScreenShot(data: string, screenshotFilename: string) {
        const stream = fs.createWriteStream(screenshotFilename);
        await stream.write(new Buffer(data, "base64"));
        stream.end();
    }
}
