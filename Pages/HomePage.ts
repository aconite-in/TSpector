import { browser} from "protractor"
import { BasePage } from "../Core/BasePage";
import { TextBox } from "../Core/WebElements/TextBox";
import { Button } from "../Core/WebElements/Button";

export class HomePage extends BasePage {

    public UserName: TextBox = new TextBox("_Input");
    public Password: TextBox = new TextBox("main_PasswordTextBox");
    public proceed: Button = new Button("main_LoginButton");


    constructor() {
        super("https://d1.fisintegratedpayables.com/fis/customerlogin.aspx", "llo");
        
    }

    navigateTo(): void {
        browser.get(this.pageURL)
    }
}