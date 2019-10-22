
import { browser, protractor } from "protractor";
import { config } from "../../protractor.conf";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { BaseElement } from "./BaseElement";

export class LinkLabel extends BaseElement {
    public async click() {
        await browser.wait(async () => await this.get().isDisplayed(), config.elementTimeout).then(async () => {
            const EC = protractor.ExpectedConditions;
            await browser.wait(async () => await EC.elementToBeClickable(this.get()), config.elementTimeout).then(async () => {
                await this.get().click();
                Logger.log(LogLevel.INFO, `LinkLabel: Clicked label with ${this.locatorType} =  ${this.locatorValue}`);
            }, (err) => { Logger.log(LogLevel.ERROR, `LinkLabel: Failed to click label with ${this.locatorType} =  ${this.locatorValue}`); });
        }, (err) => { Logger.log(LogLevel.ERROR, `LinkLabel: Failed to click label with ${this.locatorType} =  ${this.locatorValue}`); });
    }
}
