import { browser } from "protractor";
import { config } from "../../protractor.conf";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { BaseElement } from "./BaseElement";

export class ComboBox extends BaseElement {

    public async selectByText(text: string) {
        await browser.wait(() => this.get().isDisplayed(), config.elementTimeout).then(async () => {
            await this.get().sendKeys(text).then(
                () => Logger.log(LogLevel.INFO, `ComboBox: selected option ${text} from ${this.locatorType} =  ${this.locatorValue}`));
        }, (err) => { Logger.log(LogLevel.ERROR, `ComboBox: Failed to select option ${text} from element ${this.locatorType} =  ${this.locatorValue}`); });
    }
}
