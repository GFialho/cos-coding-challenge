import "reflect-metadata";
import { expect } from "chai";
import { Container } from "inversify";
import { ILogger } from "../../Logger/interface/ILogger";
import { CarOnSaleClient } from "./CarOnSaleClient";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";

describe("CarOnSaleClient", () => {
  let container: Container;
  let loggerMock: ILogger;
  let carOnSaleClient: CarOnSaleClient;

  beforeEach(() => {
    // Create a new Inversify container
    container = new Container();

    // Create a mock logger object
    loggerMock = {
      log: () => {},
      warn: () => {},
      error: () => {},
    };

    // Bind the mock logger to the container
    container
      .bind<ILogger>(DependencyIdentifier.LOGGER)
      .toConstantValue(loggerMock);

    // Resolve the CarOnSaleClient from the container
    carOnSaleClient = container.resolve<CarOnSaleClient>(CarOnSaleClient);
  });

  it("should authenticate user", async () => {
    // Mock the response of the authentication API
    const expectedToken = "mockToken";
    const expectedUserId = "mockUserId";
    const axiosMock = {
      sendRequest: async () => ({
        data: { token: expectedToken, userId: expectedUserId },
      }),
    };
    carOnSaleClient["logger"] = loggerMock; // Set the mock logger
    carOnSaleClient["requestService"] = axiosMock as any; // Set the mock axios

    // Call the private _authenticate method
    await carOnSaleClient["_authenticate"]();

    // Assert that the token and userId are updated
    expect(carOnSaleClient["_token"]).to.equal(expectedToken);
    expect(carOnSaleClient["_userId"]).to.equal(expectedUserId);
  });

  it("should make a request to get running auctions", async () => {
    // Mock the response of the API call
    const expectedResponse = {
      /* mock response */
    };
    const axiosMock = {
      sendRequest: async () => ({ data: expectedResponse }),
    };
    carOnSaleClient["logger"] = loggerMock; // Set the mock logger
    carOnSaleClient["requestService"] = axiosMock as any; // Set the mock axios

    // Call the getRunningAuctions method
    const result = await carOnSaleClient.getRunningAuctions({});

    // Assert that the response is as expected
    expect(result).to.deep.equal(expectedResponse);
  });
});
