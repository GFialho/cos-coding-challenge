import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

type Auction = any;

@injectable()
export class AuctionMonitorApp {
  public constructor(
    @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT)
    private carOnSaleClient: ICarOnSaleClient
  ) {}
  public async start(): Promise<void> {
    this.logger.log(`Auction Monitor started.`);

    try {
      // Retrieve auctions
      const auctions = await this.carOnSaleClient.getRunningAuctions({});

      // Display aggregated information
      const numberOfAuctions = auctions.length;
      const averageNumberOfBids = this.calculateAverageNumberOfBids(auctions);
      const averageAuctionProgress =
        this.calculateAverageAuctionProgress(auctions);

      this.logger.log(`Number of auctions: ${numberOfAuctions}`);
      this.logger.log(
        `Average number of bids on an auction: ${averageNumberOfBids}`
      );
      this.logger.log(`Average auction progress: ${averageAuctionProgress}`);

      process.exit(0); // Exit with exit code 0 on successful execution
    } catch (error: any) {
      this.logger.error(`Error: ${error.message}`);
      process.exit(-1); // Exit with exit code -1 if there's an error
    }
  }

  private calculateAverageNumberOfBids(auctions: Auction[]): number {
    // Calculate and return the average number of bids on auctions
    if (auctions.length === 0) {
      return 0;
    }

    const totalBids = auctions.reduce(
      (sum, auction) => sum + auction.numberOfBids,
      0
    );
    return totalBids / auctions.length;
  }

  private calculateAverageAuctionProgress(auctions: Auction[]): number {
    // Calculate and return the average auction progress
    if (auctions.length === 0) {
      return 0;
    }

    const totalProgress = auctions.reduce(
      (sum, auction) => sum + auction.auctionProgress,
      0
    );
    return totalProgress / auctions.length;
  }
}
