import { appendFile, writeFile } from "fs";
import { assert } from "chai";

export enum LogLevel { INFO, ERROR, WARN }

export class Logger {

    static fileName: string = "TSpector.log"

    static init(fileName?: string) {
        writeFile(this.fileName, "", (err) => { if (err) console.error(err); })
    }

    static log(level: LogLevel, message: string): void {
        switch (level) {
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
                assert.fail(message);
                break;
        }
    }

    static logSubHeading(subtitle: string) {
        appendFile(this.fileName, `\n\n${subtitle}`, (err) => { if (err) console.error(err); });
    }
}