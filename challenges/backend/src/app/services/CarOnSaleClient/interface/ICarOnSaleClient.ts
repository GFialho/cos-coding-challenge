/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
  getRunningAuctions({
    filter,
  }: {
    filter?: IAuctionFilter;
  }): Promise<{ items: Auction[]; page: number; total: number }>;
}

export interface Auction {
  id: number;
  label: string;
  endingTime: string;
  state: number;
  minimumRequiredAsk: number;
  currentHighestBidValue: number;
  numBids: number;
  locationAddress: string | null;
  locationCity: string;
  locationZip: string;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
  hotBid: boolean;
  originalMinimumRequiredAsk: number | null;
  allowInstantPurchase: boolean;
  instantPurchasePossibleUntil: string | null;
  advertisementHtmlContent: string | null;
  instantPurchasePrice: number | null;
  locationCountryCode: string;
  startingBidValue: number;
  uuid: string;
  _fk_uuid_vehicle: string;
  _fk_uuid_sellerUser: string;
  _fk_uuid_highestBiddingBuyerUser: string;
  urlToPickupBuyerDocument: string | null;
  paymentProcess: number;
  type: number;
  _fk_uuid_creatingSellerUser: string | null;
  isTest: boolean;
  displayMinAsk: boolean;
  isLive: boolean;
  isTransportationDisabledManually: boolean;
  startingBidValueNet: number;
  minimumRequiredAskNet: number;
  originalMinimumRequiredAskNet: number | null;
  purchasePriceNet: number;
  currentHighestBidValueNet: number;
  highestBidValueAtEndingTimeNet: number | null;
  instantPurchasePriceNet: number | null;
  lastOfferBySellerNet: number | null;
  previousLastOfferBySellerNet: number | null;
  counterOfferByBuyerNet: number | null;
  previousCounterOfferByBuyerNet: number | null;
  renegotiationMidpointValueNet: number | null;
  pickupInstructions: string;
  thirdPartyVATDepositTransferReference: string | null;
  thirdPartyVatTransferReference: string | null;
  thirdPartyVATDepositRefundReference: string | null;
  preventSellerFactoring: boolean;
  listingSurchargeFeeInvoiceReference: string | null;
  additionalTaxType: number;
  additionalTaxValue: number | null;
  isVATReportable: boolean;
  thirdPartyVATDepositReversalReference: string | null;
  uploadMethod: number;
  additionalTaxExportDiscount: number;
  isCosCheckPlusGuaranteeEnabled: boolean;
  isExtendedGuaranteeEnabled: boolean;
  bookedServicesInvoiceReference: string | null;
  directUploadRejectionReasons: string[];
  readyToBeReinsertedSince: string | null;
  externalRenegotiationTicketUuid: string | null;
  urlToCoverLetter: string | null;
  sellerToCosInvoiceUrlFirstUploadedAt: string | null;
  thirdPartyCorrectionInvoiceReference: string | null;
  urlToCorrectionInvoice: string | null;
  reauctionedWaitingForBuyerPaymentAt: string | null;
  _fk_uuid_reauctioningAssignedKAM: string | null;
  _fk_uuid_reauctioningAssignedFSM: string | null;
  isReauction: boolean;
  biddingAgentValue: number;
  didIBidAtLeastOnce: boolean;
  isParked: boolean;
  remainingTimeInSeconds: number;
  remainingTimeForInstantPurchaseInSeconds: number | null;
  associatedVehicle: AssociatedVehicle;
  amIInvolved: boolean;
  amIHighestBidder: boolean;
  sellerContact: null | any;
  rating: null | any;
  isTransportationAllowedForRegion: boolean;
  isExternalPaymentAllowed: boolean;
  remainingDaysUntilReauctioning: null | number;
  remainingDaysUntilLatePickup: null | number;
  latePickupFee: null | any;
  isTransportationBookingPossible: boolean;
  isExpressPickupAvailable: boolean;
  pickupPossibleInDays: null | number;
  sellerAccount: {
    shouldApplyStandingCosts: boolean;
    isCompoundEnabled: boolean;
  };
  amIRegularBuyer: boolean;
  isCrossBorderNetSale: boolean;
  buyerPurchaseFee: number;
  buyerSuccessFee: number;
  vatAmount: number;
  vatRate: number;
  complaintPeriodEndAt: null | any;
  transportBookingPeriodEndAt: null | any;
  isCompoundPickup: boolean;
  hasIncreasedPickupTime: boolean;
  buyerCrossBorderProcessingAmount: number;
  isRecommended: boolean;
  sellerType: number;
  transportationTask: null | any;
  enforceTransportation: boolean;
  isTransportationAvailable: boolean;
  isMinAskReached: boolean;
  isWatching: boolean;
  biddingAgentValueNet: null | any;
  distanceToVehicleInKms: number;
  hasNextAuction: null | any;
  hasPreviousAuction: null | any;
}

type AssociatedVehicle = {
  ac: number;
  ez: string;
  id: number;
  vin: string;
  make: string;
  uuid: string;
  doors: number;
  model: string;
  lastHu: null;
  origin: number;
  numKeys: number;
  sunRoof: number;
  category: number;
  coupling: number;
  euroNorm: string;
  fuelType: number;
  numSeats: number;
  createdAt: string;
  deletedAt: null;
  updatedAt: string;
  dataSource: number;
  externalId: null;
  hasDamages: boolean;
  headlights: number;
  isRollable: boolean;
  navigation: number;
  upholstery: number;
  co2Emission: {
    nedc: number;
    wltp: number;
  };
  hadAccident: boolean;
  mileageInKm: number;
  dataWarnings: number[];
  licensePlate: null;
  numPreOwners: number;
  readyToDrive: number;
  sportPackage: number;
  transmission: number;
  bodyColorCode: number;
  vehicleHeater: number;
  additionalInfo: null;
  huReportExists: boolean;
  sourceLanguage: string;
  commercialUsage: any[];
  datBaseModelRaw: null;
  enginePowerInHp: number;
  engineSizeInCcm: number;
  fuelConsumption: {
    wltp: number;
  };
  hasEndorsements: boolean;
  isIntendedUse01: boolean;
  urlToMotorSound: null;
  vatIdReportable: boolean;
  isVehicleClassN1: boolean;
  urlToAttachment1: null;
  urlToAttachment2: null;
  urlToAttachment3: null;
  huReportAvailable: number;
  isOdometerInMiles: boolean;
  parkingAssistance: number;
  damagesDescription: null;
  dimensionWidthInCm: null;
  hasMaintenanceBook: boolean;
  unloadedWeightInKg: null;
  accidentDescription: null;
  dimensionHeightInCm: null;
  dimensionLengthInCm: null;
  isReimportedVehicle: boolean;
  readyToDriveDetails: string;
  fullServiceHistoryType: number;
  isCocDocumentAvailable: boolean;
  isDataExcerptAvailable: boolean;
  urlsByLanguageToExpose: Record<string, string>;
  fieldsConfirmationStatus: Record<string, any>;
  urlToVehicleSummarySheet: string;
  countryOfLastRegistration: string;
  lastServiceInspectionDate: null;
  serviceHistoryAvailability: number;
  lastServiceInspectionMileage: null;
  damages: any[];
  vehicleImages: {
    url: string;
    perspective: number;
  }[];
  paintState: any[];
  tires: any[];
  technicalState: any[];
  equipmentData: any[];
  equipmentHighlights: any[];
};

export interface IAuctionFilter {
  description?: string;
  ids?: number[];
  uuids?: string[];
  externalIds?: string[];
  states?: {
    undefined: boolean;
  };
  locationQuery?: string;
  locationZipCodeQuery?: string;
  vehicleSearchQuery?: IVehicleFilter;
  owners?: IUuidFilter;
  ownersBlacklist?: IUuidFilter;
  internalCreators?: IUuidFilter;
  watchingBuyers?: IUuidFilter;
  highestBidders?: IUuidFilter;
  sellerAccounts?: ISellerAccountFilter;
  onlyForRegularBuyers?: IUuidFilter;
  includeCountries?: (
    | "??"
    | "CH"
    | "US"
    | "AT"
    | "BE"
    | "BG"
    | "CY"
    | "CZ"
    | "DE"
    | "DK"
    | "EE"
    | "ES"
    | "FI"
    | "FR"
    | "GB"
    | "GR"
    | "HR"
    | "HU"
    | "IE"
    | "IT"
    | "LI"
    | "LT"
    | "LU"
    | "LV"
    | "MT"
    | "NL"
    | "PL"
    | "PT"
    | "RO"
    | "SE"
    | "SI"
    | "SK"
    | "TR"
  )[];
  excludeCountries?: (
    | "??"
    | "CH"
    | "US"
    | "AT"
    | "BE"
    | "BG"
    | "CY"
    | "CZ"
    | "DE"
    | "DK"
    | "EE"
    | "ES"
    | "FI"
    | "FR"
    | "GB"
    | "GR"
    | "HR"
    | "HU"
    | "IE"
    | "IT"
    | "LI"
    | "LT"
    | "LU"
    | "LV"
    | "MT"
    | "NL"
    | "PL"
    | "PT"
    | "RO"
    | "SE"
    | "SI"
    | "SK"
    | "TR"
  )[];
  endingTimeAfter?: string;
  endingTimeBefore?: string;
  startedAfter?: string;
  startedBefore?: string;
  purchaseConfirmedAfter?: string;
  withInstantPurchaseActive?: boolean;
  havingTransportationTaskBooked?: boolean;
  isConfirmedBelowMinAsk?: boolean;
  isMinAskReached?: boolean;
  minAskFrom?: number;
  minAskTo?: number;
  minAskFromNet?: number;
  minAskToNet?: number;
  withoutReferencedInvoices?: boolean;
  referencedInvoices?: any[];
  needsReview?: boolean;
  hasReviewComment?: boolean;
  paymentProcesses?: (0 | 1 | 2)[];
  hasTransfer?: boolean;
  hasPayout?: boolean;
  hasExpressPickup?: boolean;
  isSuspectedToHaveBeenPaidInCash?: boolean;
  hasMistakes?: boolean;
  isLive?: boolean;
  displayCrossBorderNetAuctions?: boolean;
  buyerCountryCode?:
    | "??"
    | "CH"
    | "US"
    | "AT"
    | "BE"
    | "BG"
    | "CY"
    | "CZ"
    | "DE"
    | "DK"
    | "EE"
    | "ES"
    | "FI"
    | "FR"
    | "GB"
    | "GR"
    | "HR"
    | "HU"
    | "IE"
    | "IT"
    | "LI"
    | "LT"
    | "LU"
    | "LV"
    | "MT"
    | "NL"
    | "PL"
    | "PT"
    | "RO"
    | "SE"
    | "SI"
    | "SK"
    | "TR";
  hasGPR?: boolean;
  hasThirdPartyVehiclePurchaseInvoice?: boolean;
  thirdPartyVehiclePurchaseInvoiceReferences?: string[];
  isTest?: boolean;
  reachedMaxReinsertions?: boolean;
  search?: string;
  offset?: number;
  limit?: number;
  includeDeleted?: boolean;
  sortBy?: {
    field: string;
    desc: boolean;
    nullsLast: boolean;
  }[];
  distance?: {
    radius: number;
    lat: number;
    lon: number;
  };
}
type IUuidFilter = {
  uuids: string[];
};

type IVehicleFilter = {
  uuids?: string[];
  vin?: string;
  make?: string;
  makes?: string[];
  model?: string;
  ezFrom?: string;
  ezTo?: string;
  ezMonth?: string;
  ezYear?: string;
  hpFrom?: number;
  hpTo?: number;
  mileageFrom?: number;
  mileageTo?: number;
  fuelTypes?: string[];
  transmission?: string[];
  headlights?: string[];
  upholstery?: string[];
  navigation?: string[];
  sunRoof?: string[];
  sportPackage?: string[];
  vehicleHeater?: string[];
  parkingAssistance?: string[];
  categories?: string[];
  datBaseModelRaw?: string[];
  vatIdReportable?: boolean;
  fullServiceHistory?: boolean;
  readyToDrive?: string[];
  hasDamages?: boolean;
  hadAccident?: boolean;
  isReimportedVehicle?: boolean;
  doors?: string[];
  search?: string;
  offset?: number;
  limit?: number;
  includeDeleted?: boolean;
  sortBy?: {
    field: string;
    desc: boolean;
    nullsLast: boolean;
  }[];
};

type ISellerAccountFilter = {
  name?: string;
  urlToHomePage?: string;
  vatId?: string;
  taxId?: string;
  city?: string;
  zipCode?: string;
  countryCodes?: (
    | "??"
    | "CH"
    | "US"
    | "AT"
    | "BE"
    | "BG"
    | "CY"
    | "CZ"
    | "DE"
    | "DK"
    | "EE"
    | "ES"
    | "FI"
    | "FR"
    | "GB"
    | "GR"
    | "HR"
    | "HU"
    | "IE"
    | "IT"
    | "LI"
    | "LT"
    | "LU"
    | "LV"
    | "MT"
    | "NL"
    | "PL"
    | "PT"
    | "RO"
    | "SE"
    | "SI"
    | "SK"
    | "TR"
  )[];
  uuids?: string[];
  withParents?: {
    description?: string;
    uuids: string[];
  };
  withChildren?: {
    description?: string;
    uuids: string[];
  };
  havingParent?: boolean;
  havingChildren?: boolean;
  isKycChecked?: boolean;
  isKycCheckPending?: boolean;
  isKycCheckIncomplete?: boolean;
  kycCheckExpiresSoon?: boolean;
  invoicingMailAddresses?: any[];
  hasConnectedPaymentAccount?: boolean;
  isLegalEntity?: boolean;
  havingFieldSalesManagerAssigned?: boolean;
  havingInsideSalesManagerAssigned?: boolean;
  assignedToFieldSalesManagers?: {
    description?: string;
    uuids: string[];
  };
  assignedToInsideSalesManagers?: {
    description?: string;
    uuids: string[];
  };
  hasTaxCertificate?: boolean;
  hasKycCheckDueSoon?: boolean;
  kycCheckedFrom?: string;
  kycCheckedTo?: string;
  taxCertificateUploadedFrom?: string;
  taxCertificateUploadedTo?: string;
  isStrategicPartner?: boolean;
  sellerTypes?: number[];
  search?: string;
  offset?: number;
  limit?: number;
  includeDeleted?: boolean;
  sortBy?: {
    field: string;
    desc: boolean;
    nullsLast: boolean;
  }[];
};
