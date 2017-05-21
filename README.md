[![Snyk logo](https://snyk.io/style/asset/logo/snyk-print.svg)](https://snyk.io)

***

# Snyk License Enrich Utility
The Snyk License Enrich Utility takes the json outputted from `snyk test --json` and outputs the same json, with license full text added, either from the module itself, or, if that is missing, from the relevant SPDX license template.

# How do I use it?

1. Install the Snyk License Enrich Utility using npm

   `npm install snyk-enrich-license -g`

   Alternatively, you can skip this step, clone the repo and run the script locally (using `node ./snyk-enrich-license.js`)

2. Generate JSON data by running `snyk test --json` and pipe that to the utility

    `snyk test --json | snyk-enrich-license > results.json`

    OR, generate JSON data by running `snyk test` and save the output to a file, and
    pass the resulting JSON file to Snyk's License Enrich Utility

   `snyk test --json > results.json`



   `snyk-enrich-license -i report.json > results.json` which is equivalent to

   `snyk-enrich-license -i report.json -o results.json`


3. Open your new file (`results.json` above), and rejoice.

### License

[License: Apache License, Version 2.0](LICENSE)
