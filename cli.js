#!/usr/bin/env node
'use strict'
const [,, commodity, price, volume, ...args] = process.argv;
const fs = require("fs");

const fileLocation = "./thirdPartyData.json"
const execute = require("./execute")

execute(fileLocation, commodity, price, volume)
