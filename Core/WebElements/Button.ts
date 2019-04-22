import { BaseElement } from "./BaseElement";

export class Button extends BaseElement {

    public async click() {
        await this.get().click();
    }
}