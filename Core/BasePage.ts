import { BaseElement } from "./WebElements/BaseElement";
import { browser } from "protractor";
import { config } from "../protractor.conf";

export abstract class BasePage {

    public pageURL: string;
    public xPathValidator: BaseElement;
    public timeout?: number;

    constructor(pageURL: string, xPathValidator: string, timeout?: number, locatorType?: string) {
        this.pageURL = pageURL;
        locatorType = locatorType ? locatorType : "xpath";
        this.xPathValidator = new BaseElement(locatorType, xPathValidator);
        this.timeout = timeout ? timeout : config.getPageTimeout;
    }

    abstract navigateTo(): void;

    async isOpen() {
        return await browser.wait(async () => { return await this.xPathValidator.get().isPresent() }, this.timeout)
            .then((isDisplayed) => { return isDisplayed; })
            .catch(() => { return false; })
    }
}
