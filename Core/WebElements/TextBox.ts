import { by, element, ElementFinder } from "protractor";

export class TextBox {

    private locatorValue: string

    public get(): ElementFinder {
        return element(by.id(this.locatorValue));
    }

    constructor(locatorValue: string) {
        this.locatorValue = locatorValue;
    }

    public type(inputText: string): void {
        this.get().click();
        this.get().sendKeys(inputText);
    }
}