import {loadFile, convertDataInputTypes, roundToPrice, formatOutput, sortOutput, calculateTotalCost} from "../dataOperations"

import test from 'ava';

test('loadFile should return a json object if file is valid', t => {
  t.is(loadFile("../thirdPartyData.json").length, 7)
})

test("roundToPrice should convert number to price", t => {
  t.is(roundToPrice(56.322323223232), 56.32)
  t.is(roundToPrice(4.00009), 4.00)
})

test("calculateTotalCost should return the correct total cost value", t => {
  t.is(calculateTotalCost(1.42, 20, 12, 14), 207.88)
})

test("sortOutput should sort list from low to high by parameter", t => {
  t.true(sortOutput({"a": 5}, {"a": 4}, "a"))
  t.false(sortOutput({"a": 3}, {"a": 4}, "a"))
})

test("convertDataInputTypes should parse strings into floats", t => {
  let commodityMap = convertDataInputTypes({
    "FIXED_OVERHEAD": "12.31",
    "VARIABLE_OVERHEAD": "54.00"
  })
  t.true(typeof commodityMap["FIXED_OVERHEAD"] !== String)
  t.true(typeof commodityMap["VARIABLE_OVERHEAD"] !== String)
})