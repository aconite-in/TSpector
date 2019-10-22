import { browser, protractor } from "protractor";
import { config } from "../../protractor.conf";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { BaseElement } from "./BaseElement";

export class Label extends BaseElement {

    public async click() {
        await browser.wait(async () => await this.get().isDisplayed(), config.elementTimeout).then(async () => {
            const EC = protractor.ExpectedConditions;
            const elm = await this.get();
            await browser.wait(async () => await EC.elementToBeClickable(elm), config.elementTimeout).then(async () => {
                await elm.click();
                Logger.log(LogLevel.INFO, `Label: Clicked label with ${this.locatorType} =  ${this.locatorValue}`);
            }, (err) => { Logger.log(LogLevel.ERROR, `Label: Failed to click label with ${this.locatorType} =  ${this.locatorValue}`); });
        }, (err) => { Logger.log(LogLevel.ERROR, `Label: Failed to click label with ${this.locatorType} =  ${this.locatorValue}`); });
    }

}
