import {
  Auction,
  IAuctionFilter,
  ICarOnSaleClient,
} from "../interface/ICarOnSaleClient";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";
import { AxiosError, AxiosRequestConfig } from "axios";
import { RequestService } from "../../Request/classes/Request";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  private _token: string;
  private _userId: string;
  private _serviceName: string;

  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.REQUEST_SERVICE)
    private requestService: RequestService
  ) {
    this._token = "";
    this._userId = "";
    this._serviceName = "CarOnSaleClient";
  }

  private async _authenticate(): Promise<void> {
    this.logger.log("Authenticating user...", this._serviceName);
    const response = await this.requestService.sendRequest({
      url: `https://${process.env.API_BASE_URL}/v1/authentication/${process.env.API_USER_MAIL_ID}`,
      method: "put",
      data: {
        password: process.env.API_PASSWORD,
      },
    });

    const { token, userId } = response;

    this._token = token;
    this._userId = userId;
    this.logger.log("User Authenticated.", this._serviceName);

    return;
  }

  private async _call(
    { ...props }: AxiosRequestConfig,
    options?: { blockLoop?: boolean }
  ): Promise<any> {
    if (!this._userId || !this._token) await this._authenticate();

    try {
      this.logger.log(
        `Calling [${props.method?.toUpperCase()}]:${props.url}`,
        this._serviceName
      );
      const response = await this.requestService.sendRequest({
        ...props,
        headers: { authtoken: this._token, userid: this._userId },
      });
      return response;
    } catch (error: AxiosError | any) {
      // Preventing from looping
      // We will authenticate again and try just one more time
      // If the second iteraction fails then the process will be stoped
      if (error?.response?.status === 401 && !options?.blockLoop) {
        this.logger.warn(
          this._serviceName,
          "Token expired, authenticating user again..."
        );
        await this._authenticate();
        return this._call({ ...props }, { blockLoop: true });
      }

      throw error;
    }
  }

  public async getRunningAuctions({
    filter,
  }: { filter?: IAuctionFilter } = {}): Promise<{
    items: Auction[];
    page: number;
    total: number;
  }> {
    let response = await this._call({
      url: `https://${process.env.API_BASE_URL}/v2/auction/buyer/`,
      method: "get",
      params: { ...(filter && { filter: JSON.stringify(filter) }) },
    });

    // Security measure to stop process from looping if API is broken
    let maximumApiCalls = 0;

    // Get all records using paginated response
    while (response.items.length < response.total && maximumApiCalls < 15) {
      const nextPageResponse = await this._call({
        url: `https://${process.env.API_BASE_URL}/v2/auction/buyer/`,
        method: "get",
        params: {
          ...(filter && {
            filter: JSON.stringify({
              ...filter,
              offset: response.items.length,
            }),
          }),
        },
      });

      response.items = response.items.concat(nextPageResponse.items);
      maximumApiCalls += 1;
    }

    return response;
  }
}
