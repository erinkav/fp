#!/usr/bin/env node

const [,, commodity, price, volume, ...args] = process.argv;
const fs = require("fs");

class DataOperations {
  loadFile(path) {
    return JSON.parse(fs.readFileSync('./thirdPartyData.json', 'utf8')); 
  }

  convertDataInputTypes(commodityMap) {
    // All data conversions go here
    commodityMap["FIXED_OVERHEAD"] = parseFloat(commodityMap["FIXED_OVERHEAD"])
    commodityMap["VARIABLE_OVERHEAD"] = parseFloat(commodityMap["VARIABLE_OVERHEAD"])

    return commodityMap
  }

  roundToPrice(value) {
    return Number(Math.round(value+'e2')+'e-2');
  }

  calculateTotalCost(variableCost, fixedCost, price, volume) {
    const totalCost = ((price + variableCost) * volume) + fixedCost
    return this.roundToPrice(totalCost)
  }
}

class InputOutputFormatters {
  formatOutput(entry, price, volume) {
    const country = entry["COUNTRY"]
    const totalCost = entry["TOTAL_COST"]
    const variableCost = entry["VARIABLE_OVERHEAD"]
    const fixedCost = entry["FIXED_OVERHEAD"]
    return `${country} ${totalCost.toFixed(2)} | (${price + variableCost} * ${volume}) + ${fixedCost}`
  }

  sortOutput(curr, prev, parameter) { return curr[parameter] > prev[parameter]}
}


const execute = (price, volume) => {

  const ops = new DataOperations()
  const format = new InputOutputFormatters()
  const dataInput = ops.loadFile("./thirdPartyData.json")

  const formattedCommodities = dataInput.filter(commodityData => 
    // filter input
    commodityData.COMMODITY == commodity
  ).map(entry => {
    // format data before processing
    return ops.convertDataInputTypes(entry)
  })

  if(formattedCommodities.length == 0) return console.error("No commodities available")
  
  const calculatedCommodities = formattedCommodities.map(entry => {
    // Add any additional field calculations
    entry["TOTAL_COST"] = ops.calculateTotalCost(entry["VARIABLE_OVERHEAD"], entry["FIXED_OVERHEAD"], price, volume)
    return entry
  }).sort((curr, prev) => format.sortOutput(curr, prev))

  
  calculatedCommodities.forEach(entry => console.log(format.formatOutput(entry, price, volume)))

  return calculatedCommodities
}


execute(parseInt(price), parseInt(volume))
