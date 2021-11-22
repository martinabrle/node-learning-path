//first version of every index.js: console.log('Welcome to this application');
import fetch from "node-fetch"; //this one does not work anymore const fetch = require('node-fetch')
import _ from "lodash"; //const _ = require('lodash');
import path from "path"; //const path = require('path');
import fs from "fs"; //const fs = require('fs');

async function run() {
  const response = await fetch("https://dev.to/api/articles?state=rising");
  const json = await response.json();
  const sorted = _.sortBy(json, ["public_reactions_count"], ['desc']);
  const top5 = _.take(sorted, 3);

  const filePrefix = new Date().toISOString().split('T')[0];
  fs.writeFileSync(path.resolve(`${filePrefix}-feed.json`), JSON.stringify(top5, null, 2)); //const __dirname = path.resolve();
 }

 run();