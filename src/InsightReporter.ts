import BrokerData from "./BrokerData";

export default class InsightReporter {
  private records : Array<BrokerData>;

  constructor(records: Array<BrokerData>) {
    this.records = records;
  }

  public numOfPolicies() : number {
    return this.records.length;
  }

  public numOfCustomers() : number {
    //create an array of businesses
    let customerArray = this.records.map((record)=> {
      return record.BusinessDescription;
    })

    //creating a set will discard the non-unique items
    let customerSet = new Set(customerArray);

    return customerSet.size;
  }

  private getActivePolicies(): Array<BrokerData> {
    return this.records.filter((record) => {
      let now = new Date(Date.now());
      return now < record.EndDate && now > record.StartDate
    })
  }

  public averageDaysForActivePolicies(): number {
    let activePolicies = this.getActivePolicies();

    const msInADay = 24*60*60*1000;
    let count = 0;
    activePolicies.map((policy)=> {
      let time = policy.EndDate.getTime() - policy.StartDate.getTime();
      count += Math.round(time / msInADay)
    })

    return Math.round(count/activePolicies.length);
  }

  public queryBroker(brokerNameOrId: string | number): Array<BrokerData> {
    return this.records.filter((record) => {
      return record.Broker === brokerNameOrId || record.BrokerID == brokerNameOrId
    })
  }

}