import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { injectable } from "inversify";

import axios, { AxiosError, AxiosRequestConfig } from "axios";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  private _token: string;
  private _userId: string;

  public constructor() {
    this._token = "";
    this._userId = "";
  }

  private async _authenticate(): Promise<void> {
    const response = await axios({
      url: `https://${process.env.API_BASE_URL}/v1/authentication/${process.env.API_USER_MAIL_ID}`,
      method: "put",
      data: {
        password: process.env.API_PASSWORD,
      },
    });

    const { token, userId } = response.data;

    this._token = token;
    this._userId = userId;

    return;
  }

  private async _call(
    { ...props }: AxiosRequestConfig,
    options?: { blockLoop?: boolean }
  ): Promise<any> {
    if (!this._userId || !this._token) await this._authenticate();

    try {
      const response = await axios({
        ...props,
        headers: { authtoken: this._token, userid: this._userId },
      });
      return response.data;
    } catch (error: AxiosError | any) {
      // Preventing from looping
      // We will authenticate again and try just one more time
      // If the second iteraction fails then the process will be stoped
      if (error?.response?.status === 401 && !options?.blockLoop) {
        console.log("Token expired, authenticating user again...");
        await this._authenticate();
        return this._call({ ...props }, { blockLoop: true });
      }

      throw error;
    }
  }

  public async getRunningAuctions({ filter }: { filter?: any }) {
    const response = await this._call({
      url: `https://${process.env.API_BASE_URL}/v2/auction/buyer/`,
      method: "get",
      params: { ...(filter && { filter }) },
    });

    return response;
  }
}
