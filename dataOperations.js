'use strict'

const fs = require("fs");

const dataOps = {
  convertDataInputTypes: (commodityMap) => {
    // All data conversions go here
    commodityMap["FIXED_OVERHEAD"] = parseFloat(commodityMap["FIXED_OVERHEAD"])
    commodityMap["VARIABLE_OVERHEAD"] = parseFloat(commodityMap["VARIABLE_OVERHEAD"])

    return commodityMap
  },

  roundToPrice: (value) =>{
    return Number(Math.round(value+'e2')+'e-2');
  },

  calculateTotalCost: (variableCost, fixedCost, price, volume) => {
    const totalCost = ((price + variableCost) * volume) + fixedCost
    return dataOps.roundToPrice(totalCost)
  },

  formatOutput(entry, price, volume) {
    let country = entry["COUNTRY"]
    let totalCost = entry["TOTAL_COST"]
    let fixedCost = entry["FIXED_OVERHEAD"]
    let variableCost = entry["VARIABLE_OVERHEAD"]
    return `${country} ${totalCost.toFixed(2)} | (${price + variableCost} * ${volume}) + ${fixedCost}`
  },

  sortOutput(curr, prev, parameter) { return curr[parameter] > prev[parameter] },

  loadFile(path) {
    return JSON.parse(fs.readFileSync('./thirdPartyData.json', 'utf8')); 
  }
}

module.exports = dataOps