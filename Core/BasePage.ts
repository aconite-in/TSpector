import { BaseElement } from "./WebElements/BaseElement";

export abstract class BasePage {

    public pageURL: string;
    public xPathValidator: BaseElement;

    constructor(pageURL: string, xPathValidator: string) {
        this.pageURL = pageURL;
        this.xPathValidator = new BaseElement("xpath", xPathValidator);
    }

    abstract navigateTo(): void;

    async isOpen() {
        return await this.xPathValidator.isDisplayed();
    }
}
