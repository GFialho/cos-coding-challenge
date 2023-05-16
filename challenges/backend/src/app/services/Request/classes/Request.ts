import { injectable } from "inversify";
import axios, { AxiosRequestConfig } from "axios";
import { IRequest } from "../interface/IRequest";

@injectable()
export class RequestService implements IRequest {
  public async sendRequest(config: AxiosRequestConfig) {
    const response = await axios(config);
    return response.data;
  }
}
