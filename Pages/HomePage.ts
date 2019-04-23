import { browser } from "protractor"
import { BasePage } from "../Core/BasePage";
import { TextBox } from "../Core/WebElements/TextBox";
import { Button } from "../Core/WebElements/Button";
import { Label } from "../Core/WebElements/Label";

export class HomePage extends BasePage {

    public UserName: TextBox = new TextBox("id", "usr");
    public Password: TextBox = new TextBox("id", "pwd");
    public proceedButton: Button = new Button("css", "#case_login > form > input[type='submit']:nth-child(5)");
    public ErrorLabel: Label = new Label("id", "LoginError");

    constructor() {
        super("http://testing-ground.scraping.pro/login", "llo");
    }

    navigateTo(): void {
        browser.get(this.pageURL)
    }
}