#!/usr/bin/env node

var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var chalk = require('chalk');
var addFulltextToLicenses = require('./add-full-text-to-licenses');
var output;
var source;
var data;

if (argv.o) { //output destination
  output = argv.o; //grab the next item
}

if (argv.i) { //input source
  source = argv.i; //grab the next item
} else {
  source = '/dev/stdin';
}

data = fs.readFileSync(source, 'utf8');
try {
  data = JSON.parse(data);
} catch (_) {
  console.log(chalk.red('invalid input JSON'));
  process.exit(1);
}

if (!data.hasOwnProperty(vulnerabilities)) {
  console.log(chalk.red('invalid input data - no vulnerabilities key in JSON'));
  process.exit(1);
}
var issues = data.vulnerabilities;

addFulltextToLicenses(issues)
  .then(function (enhancedIssues) {
    data.vulnerabilities = enhancedIssues;

    var out = JSON.stringify(data, undefined, 2);

    if (output) {
      fs.writeFile(output, out, function(err) {
        if (err) {
          console.log('error writing report to ' + output, err);
        } else {
          console.log('Vulnerability snapshot saved at ' + output);
        }
      });
    } else {
      console.log(out);
    }
  });
