import { by, element, ElementFinder } from "protractor";

export class Button {

    private locatorValue: string

    public get(): ElementFinder {
        return element(by.id(this.locatorValue));
    }

    constructor(locatorValue: string) {
        this.locatorValue = locatorValue;
    }

    public async click() {
        await this.get().click();
    }
}