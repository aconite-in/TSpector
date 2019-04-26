import { BaseElement } from "./BaseElement";
import { Logger, LogLevel } from "../DataAccess/Logger";

export class TextBox extends BaseElement {

    public async type(inputText: string) {
        await this.get().sendKeys(inputText).then(
            () => Logger.log(LogLevel.INFO, `TextBox, entered "${inputText}"locator "${this.locatorType}" with value "${this.locatorValue}"`)
        ).catch(() => Logger.log(LogLevel.ERROR, `TextBox, unable to entered "${inputText}"locator "${this.locatorType}" with value "${this.locatorValue}"`));
    }
}