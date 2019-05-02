import { BasePage } from "../Core/BasePage";
import { HtmlTable } from "../Core/WebElements/HtmlTable";


export class HomePage extends BasePage {

    public RecentJobs: HtmlTable = new HtmlTable("", "", "#main_content_pneGridUsers_lbForward");

    constructor() {
        super("", "//*[@id='main_pageHeader_lblHeader1']");
    }

    navigateTo(): void {
        throw new Error("Method not implemented.");
    }

}