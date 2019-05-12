import { ElementFinder, element, by } from "protractor";
import { assert } from "chai"
import { Logger, LogLevel } from "../DataAccess/Logger";

export class BaseElement {

    protected locatorValue: string
    protected locatorType: string

    public get(): ElementFinder {
        switch (this.locatorType.toLocaleLowerCase()) {
            case "css":
                return element(by.css(this.locatorValue));
            case "classname":
                return element(by.className(this.locatorValue));
            case "linktext":
                return element(by.linkText(this.locatorValue));
            case "tagname":
                return element(by.tagName(this.locatorValue));
            case "xpath":
                return element(by.xpath(this.locatorValue));
            case "name":
                return element(by.name(this.locatorValue));
            case "partiallinktext":
                return element(by.partialLinkText(this.locatorValue));
            case "id":
                return element(by.id(this.locatorValue));
            case "model":
                return element(by.model(this.locatorValue));
            default:
                return element(by.id(this.locatorValue));
        }
    }

    constructor(locatorType: string, locatorValue: string) {
        this.locatorValue = locatorValue;
        this.locatorType = locatorType;
    }

    public async validateInnerText(validationText: string) {
        let innertext: string = await this.get().getText();
        if (innertext != validationText)
            Logger.log(LogLevel.ERROR, innertext + " did not match with  " + validationText)
        else
            Logger.log(LogLevel.INFO, innertext + " did matched with  " + validationText)
    }

    public async getDisplayedText() {
        await this.get().getText().then((displayedTxt) => {
            return displayedTxt;
        }).catch(() => {
            Logger.log(LogLevel.ERROR, "Unable to find")
        });
    }

    public async isDisplayed() {
        return await this.get().isDisplayed();
    }
}