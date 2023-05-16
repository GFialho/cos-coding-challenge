import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { Container } from "inversify";
import { CarOnSaleClient } from "./CarOnSaleClient";
import { ILogger } from "../../Logger/interface/ILogger";
import { RequestService } from "../../Request/classes/Request";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";

describe("CarOnSaleClient", () => {
  let container: Container;
  let loggerMock: ILogger;
  let requestServiceMock: RequestService;
  let carOnSaleClient: CarOnSaleClient;

  process.env.API_BASE_URL = "http://localhost.com";
  process.env.API_USER_MAIL_ID = "user-mail-id";
  process.env.API_PASSWORD = "api-password";

  beforeEach(() => {
    container = new Container();
    loggerMock = {
      log: () => {},
      warn: () => {},
      error: () => {},
    };
    requestServiceMock = {
      sendRequest: () => Promise.resolve({}),
    };

    container
      .bind<ILogger>(DependencyIdentifier.LOGGER)
      .toConstantValue(loggerMock);
    container
      .bind<RequestService>(DependencyIdentifier.REQUEST_SERVICE)
      .toConstantValue(requestServiceMock);
    carOnSaleClient = container.resolve<CarOnSaleClient>(CarOnSaleClient);
  });

  afterEach(() => {
    container.unbindAll();
  });

  describe("_authenticate", () => {
    it("should authenticate the user and set the token and userId", async () => {
      const response = { token: "test_token", userId: "test_userId" };
      requestServiceMock.sendRequest = () => Promise.resolve(response);

      await carOnSaleClient["_authenticate"]();

      expect(carOnSaleClient["_token"]).to.equal("test_token");
      expect(carOnSaleClient["_userId"]).to.equal("test_userId");
    });
  });

  describe("_call", () => {
    it("should make a request and return the response data", async () => {
      const response = {
        items: [
          {
            numBids: 1,
            currentHighestBidValue: 123,
            minimumRequiredAsk: 100,
          },
          {
            numBids: 2,
            currentHighestBidValue: 0,
            minimumRequiredAsk: 1000,
          },
          {
            numBids: 15,
            currentHighestBidValue: 100,
            minimumRequiredAsk: 700,
          },
        ],
        total: 10,
        page: 1,
      };
      requestServiceMock.sendRequest = () => Promise.resolve(response);

      const result = await carOnSaleClient["_call"]({});

      expect(result).to.deep.equal(response);
    });

    it("should authenticate and retry the request if the token is expired", async () => {
      let callCount = 0;
      const response401 = { response: { status: 401 } };

      const mockData = {
        items: [],
        total: 10,
        page: 1,
      };

      requestServiceMock.sendRequest = ({ url, headers }) => {
        if (url?.includes("/v1/authentication/"))
          return Promise.resolve({ token: "token-123", userId: "userid-123" });

        // Checking if credentials are set correctly
        expect(headers).to.deep.equal({
          authtoken: "token-123",
          userid: "userid-123",
        });

        if (callCount === 0) {
          callCount += 1;
          return Promise.reject(response401);
        } else {
          return Promise.resolve(mockData);
        }
      };

      const result = await carOnSaleClient["_call"]({});

      expect(result).to.equal(mockData);
    });

    it("should throw an error if the request fails with a non-401 status", async () => {
      const errorResponse = { response: { status: 500 } };
      requestServiceMock.sendRequest = () => Promise.reject(errorResponse);

      try {
        await carOnSaleClient["_call"]({});
        expect.fail("Expected an error to be thrown.");
      } catch (error) {
        expect(error).to.deep.equal(errorResponse);
      }
    });
  });

  describe("getRunningAuctions", () => {
    const mockData = {
      items: [
        {
          numBids: 1,
          currentHighestBidValue: 123,
          minimumRequiredAsk: 100,
        },
        {
          numBids: 2,
          currentHighestBidValue: 0,
          minimumRequiredAsk: 1000,
        },
        {
          numBids: 15,
          currentHighestBidValue: 100,
          minimumRequiredAsk: 700,
        },
      ],
      total: 10,
      page: 1,
    };

    it("should make a GET request to retrieve running auctions", async () => {
      const response = mockData;

      requestServiceMock.sendRequest = (config) => {
        if (config?.url?.includes("/v1/authentication/"))
          return Promise.resolve({ token: "token-123", userId: "userid-123" });

        // Checking if credentials are set correctly
        expect(config.headers).to.deep.equal({
          authtoken: "token-123",
          userid: "userid-123",
        });

        expect(config.url).to.equal(
          `https://${process.env.API_BASE_URL}/v2/auction/buyer/`
        );
        expect(config.method).to.equal("get");
        expect(config.params).to.deep.equal({});
        return Promise.resolve(response);
      };

      const result = await carOnSaleClient.getRunningAuctions();

      expect(result).to.deep.equal(response);
    });

    it("should pass the filter parameter as a query parameter", async () => {
      const response = mockData;
      const filter = { make: "Toyota", model: "Camry" };
      requestServiceMock.sendRequest = (config) => {
        if (config?.url?.includes("/v1/authentication/"))
          return Promise.resolve({ token: "token-123", userId: "userid-123" });

        // Checking if credentials are set correctly
        expect(config.headers).to.deep.equal({
          authtoken: "token-123",
          userid: "userid-123",
        });
        expect(config.params).to.deep.equal({ filter });
        return Promise.resolve(response);
      };

      const result = await carOnSaleClient.getRunningAuctions({ filter });

      expect(result).to.deep.equal(response);
    });
  });
});
