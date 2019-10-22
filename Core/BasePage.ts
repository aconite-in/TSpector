import { browser } from "protractor";
import { BaseElement } from "./WebElements/BaseElement";

export abstract class BasePage {

    public pageURL: string;
    public xPathValidator: BaseElement;
    public timeout?: number;

    constructor(pageURL: string, xPathValidator: string, timeout?: number, locatortype?: string) {
        this.pageURL = pageURL;
        locatortype = locatortype ? locatortype : "xpath";
        this.xPathValidator = new BaseElement(locatortype, xPathValidator);
        this.timeout = timeout ? timeout : 200000;
    }

    public abstract navigateTo(): void;

    // async isOpen() {
    //     return await browser.wait(async () => { return await this.xPathValidator.get().isPresent() }, this.timeout)
    //         .then((isDisplayed) => { return isDisplayed; })
    //         .catch(() => { return false; })
    // }

    public async isOpen(useDefaultTimeout: boolean = false) {
        return await browser.wait(async () => await this.xPathValidator.get().isPresent(), useDefaultTimeout ? this.timeout : 10)
            .then((isDisplayed) => isDisplayed)
            .catch(() => false);

    }

}
