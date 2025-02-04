import BrokerData from "./BrokerData";

/**
 * Class for generating insights from an array of BrokerData
 */
export default class InsightReporter {
  private records : Array<BrokerData>;

  constructor(records: Array<BrokerData>) {
    this.records = records;
  }

  /**
   * @returns number of policies in the list of broker data
   */
  public numOfPolicies() : number {
    return this.records.length;
  }

  /**
   * @returns number of unique customers in the list of broker data
   */
  public numOfCustomers() : number {
    //create an array of businesses
    let customerArray = this.records.map((record)=> {
      return record.BusinessDescription;
    })

    //creating a set will discard the non-unique items
    let customerSet = new Set(customerArray);

    return customerSet.size;
  }

  /**
   * @returns list of policies that are determined to be 'active'
   */
  private getActivePolicies(): Array<BrokerData> {
    return this.records.filter((record) => {
      let now = new Date(Date.now());
      //if the record begins in the past and ends in the future, we keep it in the list
      return now < record.EndDate && now > record.StartDate
    })
  }

  /**
   * @returns the average number of days on policies that are currently active
   */
  public averageDaysForActivePolicies(): number {
    let activePolicies = this.getActivePolicies();

    const msInADay = 24*60*60*1000; //number of milliseconds in one day
    let count = 0;
    activePolicies.map((policy)=> {
      //gets policy time in milliseconds
      let time = policy.EndDate.getTime() - policy.StartDate.getTime();
      //converts to days and add to counter
      count += Math.round(time / msInADay)
    })

    //return total number of days divided by number of active policies
    return Math.round(count/activePolicies.length);
  }

  /**
   * function that searches for policies from a certain broker
   * @param brokerNameOrId name or ID of a broker
   * @returns list of policies relating to that broker
   */
  public queryBroker(brokerNameOrId: string | number): Array<BrokerData> {
    return this.records.filter((record) => {
      return record.Broker === brokerNameOrId || record.BrokerID == brokerNameOrId
    })
  }

}