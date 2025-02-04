import BrokerData from '../src/BrokerData'
import InsightReporter from '../src/InsightReporter';
import { Broker1Data } from '../src/types/Broker1Data';
import { Broker2Data } from '../src/types/Broker2Data';

describe("Broker 1 data tests", () => {

  let mockRecord: Broker1Data = {
    PolicyNumber: "POL001",
    InsuredAmount: 1000000,
    StartDate: "15/01/2025",
    EndDate: "15/01/2026",
    AdminFee: 100,
    BusinessDescription: "Business ABC",
    BusinessEvent: "New Business",
    ClientType: "Corporate",
    ClientRef: "CR001",
    Commission: 0.15,
    EffectiveDate: "15/01/2025",
    InsurerPolicyNumber: "IPN001",
    IPTAmount: 150,
    Premium: 8000,
    PolicyFee: 50,
    PolicyType: "Property",
    Insurer: "ABC Insurance",
    Product: "Property Insurance",
    RenewalDate: "15/01/2026",
    RootPolicyRef: "RP001"
  }

  test("Should instantiate Broker Data with values passed in", () => {
    let bd = new BrokerData(mockRecord, "broker1")
    expect(bd.PolicyNumber).toBe("001");
    expect(bd.InsuredAmount).toBe(1000000);
    expect(bd.StartDate).toEqual(new Date("2025-01-15"));
    expect(bd.EndDate).toEqual(new Date("2026-01-15"));
    expect(bd.AdminFee).toBe(100);
    expect(bd.BusinessDescription).toBe("Business ABC");
    expect(bd.BusinessEvent).toBe("New Business");
    expect(bd.ClientType).toBe("Corporate");
    expect(bd.Commission).toBe(0.15);
    expect(bd.IPTAmount).toBe(150);
    expect(bd.Premium).toBe(8000);
    expect(bd.PolicyFee).toBe(50);
    expect(bd.PolicyType).toBe("Property");
    expect(bd.Insurer).toBe("ABC Insurance");
    expect(bd.Product).toBe("Property Insurance");
    expect(bd.Broker).toBe("Broker 1");
    expect(bd.BrokerID).toBe(1);
  });

  describe("Insight Reporter tests", () => {
    let bd = new BrokerData(mockRecord, "broker1");
    let ir = new InsightReporter([bd])

    test("Should get the number of policies", () => {
      expect(ir.numOfPolicies()).toEqual(1);
    })

    test("Should get the number of customers", () => {
      expect(ir.numOfCustomers()).toEqual(1);
    })

    test("Should get the average days of active policies", () => {
      expect(ir.averageDaysForActivePolicies()).toEqual(365);
    })

    test("Should return a list with the single policy in it when querying on broker1", () => {
      expect(ir.queryBroker("Broker 1")).toEqual([bd]);
    })

    test("Should return a list with nothing in it when querying on broker2", () => {
      expect(ir.queryBroker("Broker 2")).toEqual([]);
    })

  })

});


describe("Broker 2 data tests", () => {

  let mockRecord: Broker2Data = {
    PolicyRef: "POL040",
    CoverageAmount: 1000000,
    InitiationDate: "15/01/2025",
    ExpirationDate: "15/01/2026",
    AdminCharges: 100,
    CompanyDescription: "Business ABC",
    ContractEvent: "Policy Renewal",
    ConsumerCategory: "Corporate",
    ConsumerID: "CR001",
    BrokerFee: 0.15,
    ActivationDate: "15/01/2025",
    InsuranceCompanyRef: "IPN001",
    TaxAmount: 150,
    CoverageCost: 8000,
    ContractFee: 50,
    ContractCategory: "Property",
    Underwriter: "ABC Insurance",
    InsurancePlan: "Property Insurance",
    NextRenewalDate: "15/01/2026",
    PrimaryPolicyRef: "RP001"
  }

  test("Should instantiate Broker Data with values passed in", () => {
    let bd = new BrokerData(mockRecord, "broker2")
    expect(bd.PolicyNumber).toBe("040");
    expect(bd.InsuredAmount).toBe(1000000);
    expect(bd.StartDate).toEqual(new Date("2025-01-15"));
    expect(bd.EndDate).toEqual(new Date("2026-01-15"));
    expect(bd.AdminFee).toBe(100);
    expect(bd.BusinessDescription).toBe("Business ABC");
    expect(bd.BusinessEvent).toBe("Renewal");
    expect(bd.ClientType).toBe("Corporate");
    expect(bd.Commission).toBe(0.15);
    expect(bd.IPTAmount).toBe(150);
    expect(bd.Premium).toBe(8000);
    expect(bd.PolicyFee).toBe(50);
    expect(bd.PolicyType).toBe("Property");
    expect(bd.Insurer).toBe("ABC Insurance");
    expect(bd.Product).toBe("Property Insurance");
    expect(bd.Broker).toBe("Broker 2");
    expect(bd.BrokerID).toBe(2);
  });

  describe("Business event parsing tests", () => {
    //business event is parsed to be either 'New Business' or 'Renewal'
    //This test suit tests all wordings map to one or the other
    test("Policy Initiation", () => {
      mockRecord.ContractEvent = "Policy Initiation";
      let bd = new BrokerData(mockRecord, "broker2")
      expect(bd.BusinessEvent).toBe("New Business")
    })

    test("New Contract", () => {
      mockRecord.ContractEvent = "New Contract";
      let bd = new BrokerData(mockRecord, "broker2")
      expect(bd.BusinessEvent).toBe("New Business")
    })

    test("Renewal", () => {
      mockRecord.ContractEvent = "Renewal";
      let bd = new BrokerData(mockRecord, "broker2")
      expect(bd.BusinessEvent).toBe("Renewal")
    })

    test("Policy Update", () => {
      mockRecord.ContractEvent = "Policy Update";
      let bd = new BrokerData(mockRecord, "broker2")
      expect(bd.BusinessEvent).toBe("Renewal")
    })

    test("Contract Renewal", () => {
      mockRecord.ContractEvent = "Contract Renewal";
      let bd = new BrokerData(mockRecord, "broker2")
      expect(bd.BusinessEvent).toBe("Renewal")
    })
  })

  describe("Insight Reporter tests", () => {
    let bd = new BrokerData(mockRecord, "broker2");
    let ir = new InsightReporter([bd])

    test("Should get the number of policies", () => {
      expect(ir.numOfPolicies()).toEqual(1);
    })

    test("Should get the number of customers", () => {
      expect(ir.numOfCustomers()).toEqual(1);
    })

    test("Should get the average days of active policies", () => {
      expect(ir.averageDaysForActivePolicies()).toEqual(365);
    })

    test("Should return a list with the single policy in it when querying on broker1", () => {
      expect(ir.queryBroker("Broker 2")).toEqual([bd]);
    })

    test("Should return a list with nothing in it when querying on broker2", () => {
      expect(ir.queryBroker("Broker 1")).toEqual([]);
    })

  })

});
