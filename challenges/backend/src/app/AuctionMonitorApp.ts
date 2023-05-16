import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import {
  Auction,
  ICarOnSaleClient,
} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class AuctionMonitorApp {
  private _serviceName: string;

  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT)
    private carOnSaleClient: ICarOnSaleClient
  ) {
    this._serviceName = "AuctionMonitorApp";
  }
  public async start(): Promise<void> {
    this.logger.log(`Auction Monitor started.`, this._serviceName);

    try {
      // Retrieve auctions
      const { items: auctions } = await this.carOnSaleClient.getRunningAuctions(
        { filter: { limit: 50 } }
      );

      // Display aggregated information
      const numberOfAuctions = auctions.length;

      this.logger.log("Calculating average number of bids", this._serviceName);
      const averageNumberOfBids = this.calculateAverageNumberOfBids(auctions);

      this.logger.log(
        "Calculating average auction progress",
        this._serviceName
      );

      const averageAuctionProgress =
        this.calculateAverageAuctionProgress(auctions);

      this.logger.log(
        `Number of auctions: ${numberOfAuctions}`,
        this._serviceName
      );
      this.logger.log(
        `Average number of bids on an auction: ${averageNumberOfBids.toFixed(
          2
        )}`,
        this._serviceName
      );
      this.logger.log(
        `Average auction progress: ${averageAuctionProgress.toFixed(2)}%`,
        this._serviceName
      );

      process.exit(0); // Exit with exit code 0 on successful execution
    } catch (error: any) {
      console.log(error?.response?.data);
      this.logger.error(`Error: ${error.message}`);
      process.exit(-1); // Exit with exit code -1 if there's an error
    }
  }

  private calculateAverageNumberOfBids(auctions: Auction[]): number {
    // Calculate and return the average number of bids on auctions
    if (auctions.length === 0) return 0;

    const totalBids = auctions.reduce(
      (sum, auction) => sum + auction.numBids,
      0
    );
    return totalBids / auctions.length;
  }

  private calculateAverageAuctionProgress(auctions: Auction[]): number {
    // Calculate and return the average auction progress
    if (auctions.length === 0) return 0;

    const totalProgress = auctions
      // We need to filter because some auctions don't have minimum required ask
      .filter((auction) => auction.minimumRequiredAsk)
      .reduce(
        (sum, auction) =>
          sum + auction.currentHighestBidValue / auction.minimumRequiredAsk,
        0
      );
    return (totalProgress / auctions.length) * 100;
  }
}
