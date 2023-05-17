import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import { ILogger } from "./services/Logger/interface/ILogger";
import {
  Auction,
  ICarOnSaleClient,
} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

describe("AuctionMonitorApp", () => {
  let auctionMonitor: AuctionMonitorApp;
  let loggerStub: ILogger;
  let carOnSaleClientStub: ICarOnSaleClient;

  beforeEach(() => {
    // Create stubs for the dependencies
    loggerStub = {
      log: () => {},
      error: () => {},
      warn: () => {},
    };
    carOnSaleClientStub = {
      getRunningAuctions: async () => ({
        items: [
          { numBids: 2, minimumRequiredAsk: 100, currentHighestBidValue: 80 },
          { numBids: 4, minimumRequiredAsk: 200, currentHighestBidValue: 180 },
        ] as unknown as Auction[],
        total: 2,
        page: 1,
      }),
    };

    // Create an instance of AuctionMonitorApp with the stubs
    auctionMonitor = new AuctionMonitorApp(loggerStub, carOnSaleClientStub);
  });

  it("should calculate average number of bids and log the result", async () => {
    let loggedMessage = "";
    loggerStub.log = (message: string) => {
      loggedMessage = message;
    };

    await auctionMonitor.start();

    expect(loggedMessage).to.equal(
      "Average number of bids on an auction: 3.00"
    );
  });

  //   it("should calculate average auction progress and log the result", async () => {
  //     let loggedMessage = "";
  //     loggerStub.log = (message: string) => {
  //       loggedMessage = message;
  //     };

  //     await auctionMonitor.start();

  //     expect(loggedMessage).to.equal("Average auction progress: 85.00%");
  //   });

  //   it("should log the number of auctions", async () => {
  //     let loggedMessage = "";
  //     loggerStub.log = (message: string) => {
  //       loggedMessage = message;
  //     };

  //     await auctionMonitor.start();

  //     expect(loggedMessage).to.equal("Number of auctions: 2");
  //   });

  //   it("should call process.exit(0) on successful execution", async () => {
  //     let exitCode = 0;
  //     const originalExit = process.exit;
  //     (process as any).exit = (code: number) => {
  //       exitCode = code;
  //     };

  //     await auctionMonitor.start();

  //     process.exit = originalExit; // Restore original process.exit function
  //     expect(exitCode).to.equal(0);
  //   });

  //   it("should log the error and call process.exit(-1) when there's an error", async () => {
  //     const error = new Error("Test error");
  //     loggerStub.error = (message: string) => {
  //       expect(message).to.equal("Error: Test error");
  //     };
  //     carOnSaleClientStub.getRunningAuctions = async () => {
  //       throw error;
  //     };

  //     let exitCode = 0;
  //     const originalExit = process.exit;
  //     (process as any).exit = (code: number) => {
  //       exitCode = code;
  //     };

  //     await auctionMonitor.start();

  //     process.exit = originalExit; // Restore original process.exit function
  //     expect(exitCode).to.equal(-1);
  //   });
});
