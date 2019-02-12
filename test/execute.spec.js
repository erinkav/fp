import test from 'ava';
import execute from '../execute'

test('execute errors if missing required inputs', t => {
  let missingInput = execute("../thirdPartyData.json", "mango", "12")
  t.is(missingInput, undefined)
})

test('execute returns two values if two matching commodity values are found', t => {
   t.is(execute("../thirdPartyData.json", "mango", "12", "14").length, 2) 
})

test('execute calculates total cost given inputs', t => {
  t.is(execute("../thirdPartyData.json", "mango", "12", "14")[0]["TOTAL_COST"], 207.88)
})

test('execute returns values sorted from low to high by cost', t => {
  let output = execute("../thirdPartyData.json", "banana", "15", "14")
  t.true(output[0]["TOTAL_COST"] < output[1]["TOTAL_COST"])
})

