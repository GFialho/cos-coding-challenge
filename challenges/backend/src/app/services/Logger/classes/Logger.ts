import { ILogger } from "../interface/ILogger";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class Logger implements ILogger {
  public constructor() {}

  public log(message: string, serviceName?: string): void {
    console.log(`[${serviceName || "Unnamed"}] [LOG]: ${message}`);
  }

  public error(message: string, serviceName?: string): void {
    console.error(`[${serviceName || "Unnamed"}] [ERROR]: ${message}`);
  }

  public warn(message: string, serviceName?: string): void {
    console.error(`[${serviceName || "Unnamed"}] [WARN]: ${message}`);
  }
}
