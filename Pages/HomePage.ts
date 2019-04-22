import { browser } from "protractor"
import { BasePage } from "../Core/BasePage";
import { TextBox } from "../Core/WebElements/TextBox";
import { Button } from "../Core/WebElements/Button";
import { Label } from "../Core/WebElements/Label";

export class HomePage extends BasePage {

    public UserName: TextBox = new TextBox("id", "_Input");
    public Password: TextBox = new TextBox("id", "main_PasswordTextBox");
    public proceedButton: Button = new Button("id", "main_LoginButton");
    public ErrorLabel: Label = new Label("id", "LoginError");

    constructor() {
        super("https://d1.fisintegratedpayables.com/fis/customerlogin.aspx", "llo");
    }

    navigateTo(): void {
        browser.get(this.pageURL)
    }
}