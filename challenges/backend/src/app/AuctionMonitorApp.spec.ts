import "reflect-metadata";
import { ILogger } from "./services/Logger/interface/ILogger";
import {
  Auction,
  ICarOnSaleClient,
} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import sinon from "sinon";
import { expect } from "chai";

describe("AuctionMonitorApp", () => {
  let loggerMock: ILogger | any;
  let carOnSaleClientMock: ICarOnSaleClient | any;
  let auctionMonitorApp: AuctionMonitorApp | any;
  sinon.stub(process, "exit");

  beforeEach(() => {
    loggerMock = {
      log: sinon.spy(),
      error: sinon.stub(),
      warn: sinon.stub(),
    };

    carOnSaleClientMock = {
      getRunningAuctions: sinon.stub(),
    };

    auctionMonitorApp = new AuctionMonitorApp(loggerMock, carOnSaleClientMock);
  });

  describe("start", () => {
    it("should log the start message", async () => {
      await auctionMonitorApp.start();

      sinon.assert.calledOnceWithExactly(
        loggerMock.log,
        "Auction Monitor started.",
        "AuctionMonitorApp"
      );
    });
  });

  it("should log an error and exit with code -1 when there's an error", async () => {
    const errorMessage = "Error occurred.";
    const error = new Error(errorMessage);
    carOnSaleClientMock.getRunningAuctions.rejects(error);

    await auctionMonitorApp.start();

    sinon.assert.calledWith(loggerMock.error, `Error: ${errorMessage}`);

    sinon.assert.calledWith(process.exit as any, -1);
  });

  describe("calculateAverageNumberOfBids", () => {
    it("should return 0 when there are no auctions", () => {
      const auctions: Auction[] = [];

      const averageNumberOfBids =
        auctionMonitorApp.calculateAverageNumberOfBids(auctions);

      expect(averageNumberOfBids).to.equal(0);
    });

    it("should calculate the average number of bids on auctions", () => {
      const auctions: Auction[] = [
        { numBids: 5 },
        { numBids: 3 },
        { numBids: 2 },
      ] as unknown as Auction[];

      const averageNumberOfBids =
        auctionMonitorApp.calculateAverageNumberOfBids(auctions);

      expect(averageNumberOfBids).to.equal(3.3333333333333335);
    });
  });

  describe("calculateAverageAuctionProgress", () => {
    it("should return 0 when there are no auctions", () => {
      const auctions: Auction[] = [];

      const averageAuctionProgress =
        auctionMonitorApp.calculateAverageAuctionProgress(auctions);

      expect(averageAuctionProgress).to.equal(0);
    });

    it("should calculate the average auction progress", () => {
      const auctions: Auction[] = [
        { minimumRequiredAsk: 100, currentHighestBidValue: 150 },
        { minimumRequiredAsk: 200, currentHighestBidValue: 180 },
        { minimumRequiredAsk: 150, currentHighestBidValue: 120 },
      ] as unknown as Auction[];

      const averageAuctionProgress =
        auctionMonitorApp.calculateAverageAuctionProgress(auctions);

      expect(averageAuctionProgress).to.equal(106.66666666666667);
    }) as unknown as Auction[];

    it("should exclude auctions without minimum required ask", () => {
      const auctions: Auction[] = [
        { minimumRequiredAsk: 100, currentHighestBidValue: 150 },
        { currentHighestBidValue: 180 },
        { minimumRequiredAsk: 150, currentHighestBidValue: 120 },
      ] as unknown as Auction[];

      const averageAuctionProgress =
        auctionMonitorApp.calculateAverageAuctionProgress(auctions);

      expect(averageAuctionProgress).to.equal(114.99999999999999);
    });
  });
});
