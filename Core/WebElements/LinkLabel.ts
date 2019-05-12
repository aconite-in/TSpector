import { BaseElement } from "./BaseElement";
import { browser } from "protractor";
import { protractor } from "protractor/built/ptor";
import { Logger, LogLevel } from "../DataAccess/Logger";

export class LinkLabel extends BaseElement {

    public async click() {
        await browser.wait(async () => { return await this.get().isPresent(); }, 10000).then(async () => {
            var EC = protractor.ExpectedConditions;
            var elm = await this.get();
            await browser.wait(async () => { return await EC.elementToBeClickable(elm); }, 10000).then(async () => {
                await elm.click();
                Logger.log(LogLevel.INFO, "Click on " + this.locatorValue);
            }, (err) => { Logger.log(LogLevel.ERROR, "Click on " + this.locatorValue + " failed") }); //throw new Error('Error occurred!'); this will fail the whole script
        }, (err) => { Logger.log(LogLevel.ERROR, "Click on " + this.locatorValue + " failed") });
    }
}