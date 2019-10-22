import { browser } from "protractor";
import { config } from "../../protractor.conf";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { BaseElement } from "./BaseElement";

export class TextBox extends BaseElement {

    public async type(inputText: string) {
        await browser.wait(() => this.get().isDisplayed(), config.elementTimeout).then(async () => {
            await browser.wait(async () => await this.get().isEnabled(), config.elementTimeout).then(async () => {
                await this.get().clear();
                await this.get().sendKeys(inputText);
                Logger.log(LogLevel.INFO, `TextBox: Typed ${inputText} on element with ${this.locatorType} =  ${this.locatorValue}`);
            }, (err) => { Logger.log(LogLevel.ERROR, `TextBox: Failed to Type ${inputText} on element with ${this.locatorType} =  ${this.locatorValue}`); });
        }, (err) => { Logger.log(LogLevel.ERROR, `TextBox: Failed to Type ${inputText} on element with ${this.locatorType} =  ${this.locatorValue}`); });
    }
}
