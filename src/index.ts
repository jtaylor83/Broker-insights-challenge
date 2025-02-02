import BrokerData from "./BrokerData";
import {parse} from "csv-parse/sync";
const fs = require('fs');
let records: Array<BrokerData> = [];

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
  console.log(records);
}

function main() {
  readCsvData("broker1");
  readCsvData("broker2");
}

main();