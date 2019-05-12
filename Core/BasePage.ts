import { BaseElement } from "./WebElements/BaseElement";
import { browser } from "protractor";

export abstract class BasePage {

    public pageURL: string;
    public xPathValidator: BaseElement;

    constructor(pageURL: string, xPathValidator: string) {
        this.pageURL = pageURL;
        this.xPathValidator = new BaseElement("xpath", xPathValidator);
    }

    abstract navigateTo(): void;

    async isOpen() {
        await browser.wait(async () => { return await this.xPathValidator.isDisplayed() })
            .then((isDisplayed) => { return isDisplayed; })
            .catch(() => { return false; })
    }
}
