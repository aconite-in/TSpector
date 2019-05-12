import { BasePage } from "../Core/BasePage";
import { HtmlTable } from "../Core/WebElements/HtmlTable";
import { LoginPage } from "./LoginPage";
import { LinkLabel } from "../Core/WebElements/LinkLabel";


export class HomePage extends BasePage {

    public RecentJobs: HtmlTable = new HtmlTable("id", "main_content_pneGridUsers", "#main_content_pneGridUsers_lbForward", undefined, "class");
    public LogoutLink: LinkLabel = new LinkLabel("css", "#mainContainer > table > tbody > tr > td:nth-child(5) > a")

    constructor() {
        super("", "//*[@id='main_pageHeader_lblHeader1']");
    }

    navigateTo(): void {
        throw new Error("Method not implemented.");
    }

}