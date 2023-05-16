import { AxiosRequestConfig } from "axios";

export interface IRequest {
  sendRequest(config: AxiosRequestConfig): Promise<any>;
}
