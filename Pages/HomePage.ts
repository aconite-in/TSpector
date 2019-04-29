import { browser } from "protractor"
import { BasePage } from "../Core/BasePage";
import { TextBox } from "../Core/WebElements/TextBox";
import { Button } from "../Core/WebElements/Button";
import { Label } from "../Core/WebElements/Label";

export class HomePage extends BasePage {

    public UserName: TextBox = new TextBox("name", "usr");
    public Password: TextBox = new TextBox("name", "lastname");
    public proceedButton: Button = new Button("id", "submit");
    public ErrorLabel: Label = new Label("id", "LoginError");

    constructor() {
        super("https://www.toolsqa.com/automation-practice-form/", "llo");
    }

    navigateTo(): void {
        browser.get(this.pageURL)
    }
}