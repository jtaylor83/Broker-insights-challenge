export type Broker2Data = {
  PolicyRef: string;
  CoverageAmount: number;
  ExpirationDate: string;
  AdminCharges: number;
  InitiationDate: string;
  CompanyDescription: string;
  ContractEvent: string;
  ConsumerID: string;
  BrokerFee: number;
  ActivationDate: string;
  ConsumerCategory: "Corporate" | "Individual";
  InsuranceCompanyRef: string;
  TaxAmount: number;
  CoverageCost: number;
  ContractFee: number;
  ContractCategory: "Property" | "Auto" | "Health";
  Underwriter: string;
  NextRenewalDate: string
  PrimaryPolicyRef: string;
  InsurancePlan: string;
}