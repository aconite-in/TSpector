import { TableDefinition } from "cucumber";
import { $, browser, by, ElementFinder } from "protractor";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { BaseElement } from "./BaseElement";

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
        const table = await this.get();
        await table.isPresent().then(async (tablePresent) => {
            if (tablePresent) {
                const cell: ElementFinder = await table.element(by.xpath(`//${cellTagClick}[text()="${cellText}"]`));
                await cell.isPresent().then(async (isPresent) => {
                    if (isPresent) {
                        await cell.click();
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
        const expectedRow = tableFromFeature.raw()[1];
        const table = await this.get();
        await table.isPresent().then(async (tablePresent) => {
            if (tablePresent) {
                const condition = expectedRow.filter((f) => !f.startsWith("###")).map((v) => `td='${v}'`).join(" and ");
                const baseXpath = `//tr[${condition}]`;
                // console.log(baseXpath);
                const rows = await table.all(by.xpath(baseXpath)).count();
                if (rows) {
                    Logger.log(LogLevel.INFO, `HtmlTable: Found at least a row with the given data\n\t+${expectedRow}`);
                } else if (this.NextButtonCSS !== undefined) {
                    const nextButton: ElementFinder = await $(this.NextButtonCSS);
                    await nextButton.getAttribute(this.NextButtonDisabledAttribute).then((attribute) => {
                        if (attribute) {    // if the next button is disabled, stop recursion
                            Logger.log(LogLevel.ERROR, "Reached the last page of the table");
                        } else {
                            Logger.log(LogLevel.INFO, "DataTable: Moving to next page to check if matching record exists");
                            nextButton.click();
                        }
                    });
                    const rows = await table.all(by.xpath(baseXpath)).count();
                    if (rows) {
                        Logger.log(LogLevel.INFO, `DataTable: Found at least a row with the given data\n\t+${expectedRow}`);
                    }
                } else {
                    Logger.log(LogLevel.ERROR, `HtmlTable: Unable to find row with the given data\n\t+${expectedRow}`);
                }
            }
        });
    }

    public async validateRowFromDB(columnName: string, tableName: string, where: string) {
        const sql = require("mssql");
        await sql.connect("mssql://www:www@agpjaxsql01/PaySpan_JobSystem");
        const result = await sql.query(`select top 1 ${columnName} from ${tableName} where ${where}`);
        const expectedRow = Object.values(result.recordset[0]).map((v) => String(v));
        const condition = expectedRow.filter((f) => !f.startsWith("###")).map((v) => `td='${v}'`).join(" and ");
        const baseXpath = `//tr[${condition}]`;
        const table = await this.get();
        await table.isPresent().then(async (tablePresent) => {
            if (tablePresent) {
                const rows = await table.all(by.xpath(baseXpath)).count();
                if (rows) {
                    Logger.log(LogLevel.INFO, `HtmlTable: Found at least a row with the given data\n\t+${expectedRow}`);
                } else {
                    Logger.log(LogLevel.ERROR, `HtmlTable: Unable to find row with the given data\n\t+${expectedRow}`);
                }
            }

        });
    }

}
