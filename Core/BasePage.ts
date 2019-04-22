export abstract class BasePage {

    public pageURL: string;
    public xPathValidator: string;

    constructor(pageURL: string, xPathValidator: string) {
        this.pageURL = pageURL;
        this.xPathValidator = xPathValidator;
    }

    abstract navigateTo(): void;

    async isOpen() {
    }
}
