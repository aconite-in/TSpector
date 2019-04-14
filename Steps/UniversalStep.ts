import { Given, When, Then } from "cucumber";
import { BasePage } from "../Core/BasePage";

async function InvokeMethod(pageName: string, method: string, args: string[]) {
    //Dynamically Import the Page from pages folder
    const PageClass = await import("../Pages/" + pageName);
    //Create a Object of Page 
    const PageObject = Reflect.construct(Reflect.get(PageClass, pageName), []);
    // Invoke the method
    Reflect.apply(Reflect.get(PageObject, method), PageObject, args);
}

Given('User is on {string}', function (pageName: string) {
    InvokeMethod(pageName, "navigateTo", []);
});

Given('I go to {string}', function (test: string) {
    console.log("ss");
    //browser.navigate().to("https://www.google.com/");
});

When('User types {string}', function (test: string) {
    //InvokeMethod();
});

