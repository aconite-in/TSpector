import { BaseElement } from "./BaseElement";

export class TextBox extends BaseElement {

    public async type(inputText: string) {
        await this.get().sendKeys(inputText);
    }
}