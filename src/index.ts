import BrokerData from "./BrokerData";
import {parse} from "csv-parse/sync";
import InsightReporter from "./InsightReporter";

const readline = require('node:readline')
const fs = require('fs');
let records: Array<BrokerData> = [];
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function readCsvData(broker: string) {
  const data = fs.readFileSync(`data/${broker}.csv`)

  const dataParsed = parse(data, {
    columns: true,
    skip_empty_lines: true
  });

  for (let i = 0; i < dataParsed.length; i++) {
    let row = dataParsed[i]
    records.push(new BrokerData(row, broker))
  }
}

function main() {
  readCsvData("broker1");
  readCsvData("broker2");
  let insightReporter = new InsightReporter(records);
  console.log("number of policies: " + insightReporter.numOfPolicies())
  console.log("number of customers: " + insightReporter.numOfCustomers())
  console.log("average duration of active policies (days) : " + insightReporter.averageDaysForActivePolicies())
  reader.question("Please enter a broker name or ID: ", nameOrId => {
    console.log("Policies with that broker: ");
    const policies = insightReporter.queryBroker(nameOrId);
    if (policies.length === 0) {
      console.warn("No policies found :(")
    } else {
      //displays subset of data so it all fits on the screen
      console.table(policies, ["PolicyNumber", "InsuredAmount", "StartDate", "EndDate", "BusinessDescription", "BusinessEvent", "PolicyType"])
    }
    reader.close();
  })
}

main();