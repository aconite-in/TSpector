import { BaseElement } from "./BaseElement";
import { Logger, LogLevel } from "../DataAccess/Logger";

export class Button extends BaseElement {

    public async click() {
        await this.get().click().then(
            () => Logger.log(LogLevel.INFO, `Button, Clicked button with locator ${this.locatorType} with value ${this.locatorValue}`)
        );
    }
}