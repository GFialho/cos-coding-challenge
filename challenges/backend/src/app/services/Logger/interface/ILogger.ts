export interface ILogger {
  log(message: string, serviceName?: string): void;
  error(message: string, serviceName?: string): void;
  warn(message: string, serviceName?: string): void;
}
