
module.exports = {
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
    return roundToPrice(totalCost)
  },

  formatOutput(country, totalCost, price, variableCost, volume, fixedCost) {
    return `${country} ${totalCost.toFixed(2)} | (${price + variableCost} * ${volume}) + ${fixedCost}`
  },

  sortOutput(curr, prev, parameter) { return curr[parameter] > prev[parameter] }
}