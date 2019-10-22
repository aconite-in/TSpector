import { browser, by, element, protractor } from "protractor";
import { config } from "../../protractor.conf";
import { Logger, LogLevel } from "../DataAccess/Logger";
import { BaseElement } from "./BaseElement";

export class Calendar extends BaseElement {
    public async selectCalendarDate(year: string, month: string, day: string) {
        await browser.wait(async () => await this.get().isDisplayed(), config.elementTimeout).then(async () => {
            const EC = protractor.ExpectedConditions;
            await browser.wait(async () => await EC.elementToBeClickable(this.get()), config.elementTimeout).then(async () => {
                await this.get().click();
                await element(by.xpath('//button[@cdkarialive="polite"]')).click();
                await element(by.xpath(`//div[@class="mat-calendar-body-cell-content"][contains(text(),"${year}")] | //div[@class="mat-calendar-body-cell-content mat-calendar-body-selected mat-calendar-body-today"][contains(text(),"${year}")]`)).click();
                await element(by.xpath(`//div[@class="mat-calendar-body-cell-content"][contains(text(),"${month}")] | //div[@class="mat-calendar-body-cell-content mat-calendar-body-selected mat-calendar-body-today"][contains(text(),"${month}")]`)).click();
                await element(by.xpath(`//div[@class="mat-calendar-body-cell-content"][normalize-space()="${day}"] | //div[@class="mat-calendar-body-cell-content mat-calendar-body-selected mat-calendar-body-today"][normalize-space()="${day}"]`)).click();
                Logger.log(LogLevel.INFO, `Button: Clicked Button with ${this.locatorType} =  ${this.locatorValue}`);
            }, (err) => { Logger.log(LogLevel.ERROR, `Calendar: Failed to click Xpath with ${this.locatorType} =  ${this.locatorValue}`); });
        }, (err) => { Logger.log(LogLevel.ERROR, `Calendar: Failed to click Xpath with ${this.locatorType} =  ${this.locatorValue}`); });
    }
}
