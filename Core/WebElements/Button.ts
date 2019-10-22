import { browser, protractor } from "protractor";
import { config } from "../../protractor.conf";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { BaseElement } from "./BaseElement";

export class Button extends BaseElement {

    public async click(failOnError: boolean = true) {
        await browser.wait(async () => await this.get().isDisplayed(), config.elementTimeout).then(async () => {
            const EC = protractor.ExpectedConditions;
            await browser.wait(async () => await EC.elementToBeClickable(this.get()), config.elementTimeout).then(async () => {
                await this.get().click();
                Logger.log(LogLevel.INFO, `Button: Clicked Button with ${this.locatorType} =  ${this.locatorValue}`);
            }, (err) => { Logger.log(failOnError ? LogLevel.ERROR : LogLevel.WARN, `Button: Failed to click Button with ${this.locatorType} =  ${this.locatorValue}`); });
        }, (err) => { Logger.log(failOnError ? LogLevel.ERROR : LogLevel.WARN, `Button: Failed to click Button with ${this.locatorType} =  ${this.locatorValue}`); });
    }
}
