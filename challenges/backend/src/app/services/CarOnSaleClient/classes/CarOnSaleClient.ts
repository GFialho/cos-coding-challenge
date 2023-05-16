import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { injectable } from "inversify";
import axios from "axios";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  public constructor() {}

  public async getRunningAuctions(): Promise<any> {
    const response = await axios({
      url: `https://${process.env.API_BASE_URL}/v2/auction/buyer`,
      method: "get",
      params: {},
    });
    console.log(response.data);
    return response.data;
  }
}
