import { BaseElement } from "./BaseElement";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { browser, protractor } from "protractor";
import { config } from "../../protractor.conf";

export class Button extends BaseElement {

    public async click(failOnError: boolean = true) {
        await browser.wait(async () => { return await this.get().isDisplayed(); }, config.elementTimeout).then(async () => {
            var EC = protractor.ExpectedConditions;
            await browser.wait(async () => { return await EC.elementToBeClickable(this.get()); }, config.elementTimeout).then(async () => {
                await this.get().click();
                Logger.log(LogLevel.INFO, `Button: Clicked Button with ${this.locatorType} =  ${this.locatorValue}`);
            }, (err) => { Logger.log(failOnError ? LogLevel.ERROR : LogLevel.WARN, `Button: Failed to click Button with ${this.locatorType} =  ${this.locatorValue}`) });
        }, (err) => { Logger.log(failOnError ? LogLevel.ERROR : LogLevel.WARN, `Button: Failed to click Button with ${this.locatorType} =  ${this.locatorValue}`) });
    }
}