import { BaseElement } from "./BaseElement";
import { $, $$ } from "protractor";


export class HtmlTable extends BaseElement {


    private PreviousButtonCSS: string;

    constructor(PreviousButtonCSS: string) {
        super("id", "test");
        this.PreviousButtonCSS = PreviousButtonCSS;
    }

    public clickByText(CellFieldToClick: string) {
        var previousButton = $(this.PreviousButtonCSS);
        previousButton.getAttribute('disabled').then(function (attribute) {
            if (attribute) {
                console.log('At the first page of the table');
                return;
            }
        }, function (err) { console.log('Error when finding the back button', err) }).then(function () {
            //console.log("Start to find matching data " + CellFieldToClick + " in web element " + CellFieldName);
            //recursiveSearchForIndex(CellFieldName, NextButtonCSS, texttovalidate, Validationstatus);
        });
    }

}