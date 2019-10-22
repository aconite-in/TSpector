import * as fs from "fs";
import * as request from "request-promise-native";
import { Logger, LogLevel } from "./Logger";

export class RestHelper {

    public static async setEndPoint(apiEndPoint: string) {
        this.endPoint = apiEndPoint;
        this.setDefault();
    }

    public static setDefaultHeaders(headers?: string) {
        if (headers === undefined) {
            this.options.headers = {
                "User-Agent": "test",
            };
        } else {
            this.options.headers = JSON.parse(headers);
        }
    }

    public static async validateResponse(expectedResponse: string) {
        if (JSON.stringify(this.response) === JSON.stringify(expectedResponse)) {
            Logger.log(LogLevel.INFO, `RESTHELPER: Response from API matched the expected response\n\t\t+${this.response}`);
        } else {
            Logger.log(LogLevel.ERROR, `RESTHELPER: Response from API did not matched the expected response\n\t\t+${this.response}\n\t\t-${expectedResponse}`);
        }
    }

    public static async validateFromFile(filePath: string) {
        const filecontents = await fs.readFileSync(__dirname + "..\\..\\..\\" + filePath);
        const expectedResponse = await filecontents.toString();
        if (JSON.parse(this.response) === JSON.parse(expectedResponse)) {
            Logger.log(LogLevel.INFO, `RESTHELPER: Response from API matched the expected response\n\t\t+${this.response}`);
        } else {
            Logger.log(LogLevel.ERROR, `RESTHELPER: Response from API did not matched the expected response\n\t\t+${this.response}\n\t\t-${filePath}`);
        }
    }

    public static async getRequest(parameters: string) {
        this.options.qs = parameters;
        this.response = await request.get(this.options);
        Logger.log(LogLevel.INFO, `System made a sucessful get request to ${this.endPoint} with parameters\n\t\t+${parameters}`);
    }

    public static async postRequest(parameters: string) {
        this.options.body = JSON.parse(parameters);
        this.options.json = true;
        this.response = await request.post(this.options);
        Logger.log(LogLevel.INFO, `System made a sucessful post request to ${this.endPoint} with parameters\n\t\t+${parameters}`);
    }

    public static async getComplete(requestParameters: string, responsefileName: string) {
        this.options.uri = this.endPoint + "?" + requestParameters;
        // this.options.json = true;
        this.response = await request.get(this.options);
        Logger.log(LogLevel.INFO, `Successful API reqeuest with parameters ${this.options}`);
        const expectedResponse = await JSON.parse(await this.getFileContent(responsefileName));
        if (this.response === JSON.stringify(expectedResponse)) {
            Logger.log(LogLevel.INFO, "Expected response matches the API");
        } else {
            Logger.log(LogLevel.ERROR, "Expected response does not matches the API it did not match" + expectedResponse);
        }
    }

    public static async postComplete(requestfileName: string, responsefileName: string) {
        this.options.body = JSON.parse(await this.getFileContent(requestfileName));
        this.options.json = true;
        this.response = await request.post(this.options);
        Logger.log(LogLevel.INFO, `Successful API reqeuest with parameters ${this.options}`);
        const expectedResponse = JSON.parse(await this.getFileContent(responsefileName));
        Logger.log(LogLevel.INFO, `Actual Response: ${JSON.stringify(this.response)}`);
        Logger.log(LogLevel.INFO, `Expected Response: ${JSON.stringify(expectedResponse)}`);
        if (JSON.stringify(this.response) === JSON.stringify(expectedResponse)) {
            Logger.log(LogLevel.INFO, "Expected response matches the API");
        } else {
            Logger.log(LogLevel.ERROR, "Expected response does not matches the API");
        }

    }

    public static async getFileContent(filePath: string) {
        const filecontents = await fs.readFileSync(__dirname + "..\\..\\..\\" + filePath);
        return filecontents.toString();
    }

    private static endPoint: string;
    private static options: any;
    private static response: any;

    private static setDefault() {
        this.options = {
            uri: this.endPoint,
        };
    }

}
