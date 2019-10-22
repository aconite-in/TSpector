import { TableDefinition } from "cucumber";
import { $, browser, by, element, ElementFinder, promise } from "protractor";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { BaseElement } from "./BaseElement";

export class DataTable extends BaseElement {

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
        const table = await this.get();
        await table.isPresent().then(async (tablePresent) => {
            if (tablePresent) {
                const cell: ElementFinder = await table.element(by.xpath(`//${cellTagClick}[text()="${cellText}"]`));
                await cell.isPresent().then(async (isPresent) => {
                    if (isPresent) {
                        await browser.executeScript("arguments[0].click();", cell);
                    } else if (this.NextButtonCSS !== undefined) {
                        const nextButton: ElementFinder = await $(this.NextButtonCSS);
                        await nextButton.getAttribute(this.NextButtonDisabledAttribute).then((attribute) => {
                            if (attribute) {    // if the next button is disabled, stop recursion
                                Logger.log(LogLevel.ERROR, "Reached the last page of the table");
                            } else {
                                nextButton.click();
                            }
                        });
                        await this.clickByText(cellTagClick, cellText);
                    } else {
                        Logger.log(LogLevel.ERROR, "Unable to find the element");
                    }
                });
            } else {
                Logger.log(LogLevel.ERROR, `Unable to find table with ${this.locatorType} = ${this.locatorValue}`);
            }
        });
    }

    public async doubleclickByText(cellTagClick: string, cellText: string) {
        const table = await this.get();
        await table.isPresent().then(async (tablePresent) => {
            if (tablePresent) {
                const cell: ElementFinder = await table.element(by.xpath(`//${cellTagClick}[text()="${cellText}"]`));
                await cell.isPresent().then(async (isPresent) => {
                    if (isPresent) {
                        await browser.actions().mouseMove(cell).mouseMove({ x: 50, y: 0 }).doubleClick().perform();
                    } else if (this.NextButtonCSS !== undefined) {
                        const nextButton: ElementFinder = await $(this.NextButtonCSS);
                        await nextButton.getAttribute(this.NextButtonDisabledAttribute).then((attribute) => {
                            if (attribute) {    // if the next button is disabled, stop recursion
                                Logger.log(LogLevel.ERROR, "Reached the last page of the table");
                            } else {
                                nextButton.click();
                                browser.sleep(500);
                                browser.executeScript("window.scrollBy(0,-500)");
                            }
                        });
                        await this.doubleclickByText(cellTagClick, cellText);
                    } else {
                        Logger.log(LogLevel.ERROR, "Unable to find the element");
                    }
                });
            } else {
                Logger.log(LogLevel.ERROR, `Unable to find table with ${this.locatorType} = ${this.locatorValue}`);
            }
        });
    }

    public async validateRow(tableFromFeature: TableDefinition) {
        const expectedRows = tableFromFeature.rows();
        for (const expectedRow of expectedRows) {
            await this.validateRowX(expectedRow);
        }
    }
    public async validateRowX(expectedRow: string[]) {
        const table = await this.get();
        await table.isPresent().then(async (tablePresent) => {
            if (tablePresent) {
                const condition = expectedRow.filter((f) => !f.startsWith("###")).map((v) => `datatable-body-cell='${v}'`).join(" and ");
                const baseXpath = `//div[${condition}]`;
                // console.log(baseXpath);
                const rows = await table.all(by.xpath(baseXpath)).count();
                if (rows) {
                    Logger.log(LogLevel.INFO, `DataTable: Found at least a row with the given data\n\t+${expectedRow}`);
                } else if (this.NextButtonCSS !== undefined) {
                    const nextButton: ElementFinder = await $(this.NextButtonCSS);
                    await nextButton.getAttribute(this.NextButtonDisabledAttribute).then(async (attribute) => {
                        if (attribute) {    // if the next button is disabled, stop recursion
                            Logger.log(LogLevel.ERROR, `Reached the last page of the table, but unable to find\n\t+${expectedRow}`);
                        } else {
                            Logger.log(LogLevel.INFO, "DataTable: Moving to next page to check if matching record exists");
                            nextButton.click();
                            await this.validateRowX(expectedRow);
                        }
                    });
                } else {
                    Logger.log(LogLevel.ERROR, `DataTable: Unable to find row with the given data\n\t+${expectedRow}`);
                }
            }
        });
    }
}
