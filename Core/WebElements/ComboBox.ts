import { BaseElement } from "./BaseElement";
import { Logger, LogLevel } from "../DataAccess/Logger";


export class ComboBox extends BaseElement {

    public async selectByText(text: string) {
        await this.get().sendKeys(text).then(
            () => Logger.log(LogLevel.INFO, `ComboBox, Clicked button with locator ${this.locatorType} with value ${this.locatorValue}`));
    }

}