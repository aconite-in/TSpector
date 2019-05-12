import { BaseElement } from "./BaseElement";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { browser } from "protractor";

export class TextBox extends BaseElement {

    // public async type(inputText: string) {
    //     await this.get().sendKeys(inputText).then(
    //         () => Logger.log(LogLevel.INFO, `TextBox, entered "${inputText}"locator "${this.locatorType}" with value "${this.locatorValue}"`)
    //     ).catch(() => Logger.log(LogLevel.ERROR, `TextBox, unable to entered "${inputText}"locator "${this.locatorType}" with value "${this.locatorValue}"`));
    // }  

    public async type(inputText: string) {
        await browser.wait(() => { return this.get().isPresent(); }, 10000).then(async () => {
            await browser.wait(async () => { return await this.get().isEnabled(); }, 10000).then(async () => {
                await this.get().clear();
                await this.get().sendKeys(inputText);
                Logger.log(LogLevel.INFO, `TextBox: Typed ${inputText} on element with ${this.locatorType} =  ${this.locatorValue}`);
            }, (err) => { Logger.log(LogLevel.ERROR, `TextBox: Failed to Type ${inputText} on element with ${this.locatorType} =  ${this.locatorValue}`); }); //throw new Error('Error occurred!'); this will fail the whole script
        }, (err) => { Logger.log(LogLevel.ERROR, `TextBox: Failed to Type ${inputText} on element with ${this.locatorType} =  ${this.locatorValue}`); });
    }
}