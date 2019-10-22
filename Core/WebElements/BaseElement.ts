import { assert } from "chai";
import { browser, by, element, ElementFinder, protractor } from "protractor";
import { config } from "../../protractor.conf";
import { Logger, LogLevel } from "../DataAccess/Logger";

export class BaseElement {

    protected locatorValue: string;
    protected locatorType: string;

    constructor(locatorType: string, locatorValue: string) {
        this.locatorValue = locatorValue;
        this.locatorType = locatorType;
    }

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
            case "text":
                return element(by.xpath(`//*[text()='${this.locatorValue}']`));
            case "partialbuttontext":
                return element(by.partialButtonText(this.locatorValue));
            default:
                return element(by.id(this.locatorValue));
        }
    }

    public async validateInnerText(validationText: string, inverseResult: boolean = false, Mandatory: boolean = true) {
        const innertext: string = await this.get().getText();
        if (innertext.trim() !== validationText.trim()) {
            if (Mandatory) {
                Logger.log(inverseResult ? LogLevel.INFO : LogLevel.ERROR, `BaseElement: Inner text did not matched.\n\t+ ${innertext}\n\t- ${validationText}`);
            } else {
                Logger.log(inverseResult ? LogLevel.INFO : LogLevel.WARN, `BaseElement: Inner text did not matched.\n\t+ ${innertext}\n\t- ${validationText}`);
            }
        } else {
            // if (Mandatory)
            Logger.log(inverseResult ? LogLevel.ERROR : LogLevel.INFO, `BaseElement: Inner text matched.\n\t+ ${innertext}\n\t- ${validationText}`);
            // else
            //    Logger.log(inverseResult ? LogLevel.INFO : LogLevel.WARN, `BaseElement: Inner text did not matched.\n\t+ ${innertext}\n\t- ${validationText}`)
        }
    }

    public async getDisplayedText() {
        return await this.get().getText().then((displayedTxt) => {
            return displayedTxt;
        }).catch(() => {
            Logger.log(LogLevel.ERROR, "Unable to find");
        });
    }

    public async getDisplayeddata() {
        return await this.get().getAttribute("value").then((displayedval) => {
            return displayedval;
        }).catch(() => {
            Logger.log(LogLevel.ERROR, "Unable to find");
        });
    }

    public async isDisplayed() {
        return await this.get().isDisplayed();
    }

    public async waitfor(failOnError: boolean) {
        await browser.wait(async () => await this.get().isPresent(), config.elementTimeout).then(async () => {
            Logger.log(LogLevel.INFO, `Waited till ${this.locatorValue} is present in screen`);
        }, (err) => { Logger.log(failOnError ? LogLevel.ERROR : LogLevel.WARN, `Action to wait till ${this.locatorValue} is displayed in screen failed`); });
    }
}
