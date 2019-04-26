import { browser } from "protractor"
import { BasePage } from "../Core/BasePage";
import { TextBox } from "../Core/WebElements/TextBox";
import { Button } from "../Core/WebElements/Button";
import { Label } from "../Core/WebElements/Label";
import { ComboBox } from "../Core/WebElements/ComboBox";

export class HomePage extends BasePage {

    public UserName: TextBox = new TextBox("name", "firstname");
    public Password: TextBox = new TextBox("name", "lastname");
    public Continents: ComboBox = new ComboBox("id", "continents")
    public proceedButton: Button = new Button("id", "main_LoginButton");
    public ErrorLabel: Label = new Label("id", "LoginError");

    constructor() {
        super("https://www.toolsqa.com/automation-practice-form/", "llo");
    }

    navigateTo(): void {
        browser.get(this.pageURL)
    }
}