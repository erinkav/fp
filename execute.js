const {loadFile, convertDataInputTypes, roundToPrice, formatOutput, sortOutput, calculateTotalCost} = require("./dataOperations")

const execute = (fileLocation, commodity, price, volume) => {
  if(price === undefined || volume === undefined) {
      return console.error("No price or volume passed in")
  }
  // Prepare inputs 
  const dataInput = loadFile(fileLocation)
  price = parseInt(price)
  volume = parseInt(volume)


  if(dataInput == undefined) return console.error("File not at specified location")

  const formattedCommodities = dataInput.filter(commodityData => 
    // filter input
    commodityData.COMMODITY == commodity
  ).map(entry => {
    // format data before processing
    return convertDataInputTypes(entry)
  })

  if(formattedCommodities.length == 0) return console.error("No commodities available")
  
  // Do all calculations and sorting
  const calculatedCommodities = formattedCommodities.map(entry => {
    // Add any additional field calculations
    entry["TOTAL_COST"] = calculateTotalCost(entry["VARIABLE_OVERHEAD"], entry["FIXED_OVERHEAD"], price, volume)
    console.log(entry)
    return entry
  }).sort((curr, prev) => sortOutput(curr, prev))

  
  calculatedCommodities.forEach(entry => console.log(formatOutput(entry, price, volume)))

  return calculatedCommodities
}

module.exports = execute