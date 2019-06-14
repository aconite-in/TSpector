import { BaseElement } from "./BaseElement";
import { $, element, by, ElementFinder, browser } from "protractor";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { TableDefinition } from "cucumber";


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
        let table = await this.get();
        await table.isPresent().then(async (tablePresent) => {
            if (tablePresent) {
                let cell: ElementFinder = await table.element(by.xpath(`//${cellTagClick}[text()="${cellText}"]`))
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
            } else
                Logger.log(LogLevel.ERROR, `Unable to find table with ${this.locatorType} = ${this.locatorValue}`);
        })
    }

    public async validateRow(tableFromFeature: TableDefinition) {
        let expectedRow = tableFromFeature.raw()[1];
        let table = await this.get();
        await table.isPresent().then(async (tablePresent) => {
            if (tablePresent) {
                // let rows = await table.all(by.tagName('tr'));
                // await rows.forEach(async (row: ElementFinder, i) => {
                //     if (i != 0) {
                //         let cells = await row.all(by.tagName('td'))
                //         await cells.forEach(async (cell: ElementFinder, j) => {
                //             await cell.getText().then((cellTxt) => {
                //                 if (expectedRow[j] === cellTxt)
                //                     true;
                //             })
                //         })
                //     }
                // })
                let condition = expectedRow.filter(f => !f.startsWith('###')).map(v => `td='${v}'`).join(' and ')
                let baseXpath = `//tr[${condition}]`
                //console.log(baseXpath);
                let rows = await table.all(by.xpath(baseXpath)).count();
                if (rows)
                    Logger.log(LogLevel.INFO, `HtmlTable: Found at least a row with the given data\n\t+${expectedRow}`)
                else
                    Logger.log(LogLevel.ERROR, `HtmlTable: Unable to find row with the given data\n\t+${expectedRow}`)
            }
        })
    }

    public async validateRowFromDB(columnName: string, tableName: string, where: string) {
        const sql = require('mssql')
        await sql.connect('mssql://www:www@agpjaxsql01/PaySpan_JobSystem');
        const result = await sql.query(`select top 1 ${columnName} from ${tableName} where ${where}`);
        let expectedRow = Object.values(result.recordset[0]).map(v => String(v));
        let condition = expectedRow.filter(f => !f.startsWith('###')).map(v => `td='${v}'`).join(' and ');
        let baseXpath = `//tr[${condition}]`;
        let table = await this.get();
        await table.isPresent().then(async (tablePresent) => {
            if (tablePresent) {
                let rows = await table.all(by.xpath(baseXpath)).count();
                if (rows)
                    Logger.log(LogLevel.INFO, `HtmlTable: Found at least a row with the given data\n\t+${expectedRow}`)
                else
                    Logger.log(LogLevel.ERROR, `HtmlTable: Unable to find row with the given data\n\t+${expectedRow}`)
            }

        })
    }
}