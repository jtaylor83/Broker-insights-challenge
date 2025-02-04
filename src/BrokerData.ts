import { Broker1Data } from "./types/Broker1Data";
import { Broker2Data } from "./types/Broker2Data";

export default class BrokerData {
  PolicyNumber: string;
  InsuredAmount: Number;
  StartDate: Date;
  EndDate: Date;
  AdminFee: Number
  BusinessDescription: string
  BusinessEvent: "New Business" | "Renewal";
  ClientType: "Corporate" | "Individual";
  Commission: Number;
  IPTAmount: Number;
  Premium: Number;
  PolicyFee: Number
  PolicyType: "Property" | "Auto" | "Health";
  Insurer: string;
  Product: string;
  Broker: "Broker 1" | "Broker 2";
  BrokerID: 1 | 2

  constructor(data: Broker1Data | Broker2Data, broker: string) {
    switch(broker) {
      case "broker1":
        this.normaliseBroker1(data as Broker1Data)
        break;
      case "broker2":
        this.normaliseBroker2(data as Broker2Data)
    }
  }

  private normaliseBroker1(data: Broker1Data) {
    this.PolicyNumber = data.PolicyNumber.substring(3);
    this.InsuredAmount = data.InsuredAmount;
    this.StartDate = this.parseBritishDate(data.StartDate);
    this.EndDate = this.parseBritishDate(data.EndDate);
    this.AdminFee = data.AdminFee;
    this.BusinessDescription = data.BusinessDescription;
    this.BusinessEvent = this.parseBusinessEvent(data.BusinessEvent);
    this.ClientType = data.ClientType;
    this.Commission = data.Commission;
    this.IPTAmount = data.IPTAmount;
    this.Premium = data.Premium;
    this.PolicyFee = data.PolicyFee;
    this.PolicyType = data.PolicyType;
    this.Insurer = data.Insurer;
    this.Product = data.Product;
    this.Broker = "Broker 1";
    this.BrokerID = 1;
  }

  private normaliseBroker2(data: Broker2Data) {
    this.PolicyNumber = data.PolicyRef.substring(3);
    this.InsuredAmount = data.CoverageAmount;
    this.StartDate = this.parseBritishDate(data.InitiationDate);
    this.EndDate = this.parseBritishDate(data.ExpirationDate);
    this.AdminFee = data.AdminCharges;
    this.BusinessDescription = data.CompanyDescription;
    this.BusinessEvent = this.parseBusinessEvent(data.ContractEvent);
    this.ClientType = data.ConsumerCategory;
    this.Commission = data.BrokerFee;
    this.IPTAmount = data.TaxAmount;
    this.Premium = data.CoverageCost;
    this.PolicyFee = data.ContractFee;
    this.PolicyType = data.ContractCategory;
    this.Insurer = data.Underwriter;
    this.Product = data.InsurancePlan;
    this.Broker = "Broker 2";
    this.BrokerID = 2;
  }

  private parseBritishDate(britishDate: string): Date {
    let dateValues = britishDate.split('/')
    let dateValuesStringFormat = dateValues[2] + "-" + dateValues[1] + "-" + dateValues[0];
    return new Date(dateValuesStringFormat);
  }

  private parseBusinessEvent(be: string) {
    if (be === "New Business" || be === "New Contract" || be === "Policy Initiation") {
      return "New Business"
    } else if (be === "Policy Renewal" || be === "Renewal" || be === "Policy Update" || be === "Contract Renewal") {
      return "Renewal"
    }
  }

}