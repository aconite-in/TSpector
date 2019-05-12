import { BaseElement } from "./BaseElement";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { browser, protractor } from "protractor";

export class Button extends BaseElement {

    public async click(failOnError: boolean = true) {
        await browser.wait(async () => { return await this.get().isPresent(); }, 10000).then(async () => {
            var EC = protractor.ExpectedConditions;
            var elm = await this.get();
            await browser.wait(async () => { return await EC.elementToBeClickable(elm); }, 10000).then(async () => {
                await elm.click();
                Logger.log(LogLevel.INFO, `Button: Clicked Button with ${this.locatorType} =  ${this.locatorValue}`);
            }, (err) => { Logger.log(failOnError ? LogLevel.ERROR : LogLevel.WARN, `Button: Failed to click Button with ${this.locatorType} =  ${this.locatorValue}`) });
        }, (err) => { Logger.log(failOnError ? LogLevel.ERROR : LogLevel.WARN, `Button: Failed to click Button with ${this.locatorType} =  ${this.locatorValue}`) });
    }
}