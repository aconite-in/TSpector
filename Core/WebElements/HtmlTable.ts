import { BaseElement } from "./BaseElement";
import { $, element, by, ElementFinder } from "protractor";
import { Logger, LogLevel } from "../DataAccess/Logger";


export class HtmlTable extends BaseElement {

    private PreviousButtonCSS?: string;
    private NextButtonCSS?: string;
    private NextButtonDisabledAttribute: string;

    constructor(locatorType: string, locatorValue: string, NextButtonCSS?: string, PreviousButtonCSS?: string, NextButtonDiabledAttribute?: string) {
        super(locatorType, locatorValue);
        this.PreviousButtonCSS = PreviousButtonCSS;
        this.NextButtonCSS = NextButtonCSS;
        this.NextButtonDisabledAttribute = (NextButtonDiabledAttribute) ? NextButtonDiabledAttribute : "disabled";
    }

    public async clickByText(cellTagClick: string, cellText: string) {
        let cell: ElementFinder = await element(by.xpath(`//${cellTagClick}[text()="${cellText}"]`))
        await cell.isPresent().then(async (isPresent) => {
            if (isPresent) {
                await cell.click();
            }
            else if (this.NextButtonCSS !== undefined) {
                var nextButton: ElementFinder = await $(this.NextButtonCSS);
                await nextButton.getAttribute(this.NextButtonDisabledAttribute).then((attribute) => {
                    if (attribute) {    //if the next button is disabled, stop recursion
                        Logger.log(LogLevel.ERROR, 'Reached the last page of the table');
                    }
                    else {
                        nextButton.click();
                    }
                })
                await this.clickByText(cellTagClick, cellText);
            }
            else
                Logger.log(LogLevel.ERROR, 'Unable to find the element');
        })
    }
}