import { BaseElement } from "./BaseElement";
import { browser } from "protractor";
import { protractor } from "protractor/built/ptor";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { config } from "../../protractor.conf";

export class LinkLabel extends BaseElement {

    public async click() {
        await browser.wait(async () => { return await this.get().isPresent(); }, config.elementTimeout).then(async () => {
            var EC = protractor.ExpectedConditions;
            var elm = await this.get();
            await browser.wait(async () => { return await EC.elementToBeClickable(elm); }, config.elementTimeout).then(async () => {
                await elm.click();
                Logger.log(LogLevel.INFO, `LinkLabel: Clicked label with ${this.locatorType} =  ${this.locatorValue}`);
            }, (err) => { Logger.log(LogLevel.ERROR, `LinkLabel: Failed to click label with ${this.locatorType} =  ${this.locatorValue}`) });
        }, (err) => { Logger.log(LogLevel.ERROR, `LinkLabel: Failed to click label with ${this.locatorType} =  ${this.locatorValue}`) });
    }
}