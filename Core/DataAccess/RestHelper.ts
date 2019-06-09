import * as request from "request-promise-native";
import { Logger, LogLevel } from "./Logger";
import * as fs from "fs";

export class RestHelper {

    private static endPoint: string;
    private static options: any;
    private static response: any;

    public static async setEndPoint(apiEndPoint: string) {
        this.endPoint = apiEndPoint;
        this.setDefault();
    }

    private static setDefault() {
        this.options = {
            uri: this.endPoint
        }
        this.setDefaultHeaders()
    }

    public static setDefaultHeaders(headers?: string) {
        if (headers === undefined)
            this.options.headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
            }
        else {
            this.options.headers = JSON.stringify(headers)
        }
    }

    public static async validateResponse(expectedResponse: string) {
        if (JSON.stringify(this.response) === JSON.stringify(expectedResponse))
            Logger.log(LogLevel.INFO, `RESTHELPER: Response from API matched the expected response\n\t\t+${this.response}`)
        else
            Logger.log(LogLevel.ERROR, `RESTHELPER: Response from API did not matched the expected response\n\t\t+${this.response}\n\t\t-${expectedResponse}`)
    }

    public static async validateFromFile(filePath: string) {
        let filecontents = await fs.readFileSync(__dirname + '..\\..\\..\\' + filePath);
        let expectedResponse = await filecontents.toString();
        if (JSON.parse(this.response) == JSON.parse(expectedResponse))
            Logger.log(LogLevel.INFO, `RESTHELPER: Response from API matched the expected response\n\t\t+${this.response}`)
        else
            Logger.log(LogLevel.ERROR, `RESTHELPER: Response from API did not matched the expected response\n\t\t+${this.response}\n\t\t-${filePath}`)
    }

    public static async getRequest(parameters: string) {
        this.options.qs = parameters
        this.response = await request.get(this.options);
        Logger.log(LogLevel.INFO, `System made a sucessful get request to ${this.endPoint} with parameters\n\t\t+${parameters}`)
    }

    public static async postRequest(parameters: string) {
        this.options.body = parameters;
        this.response = await request.post(this.options);
        Logger.log(LogLevel.INFO, `System made a sucessful post request to ${this.endPoint} with parameters\n\t\t+${parameters}`)
    }

}