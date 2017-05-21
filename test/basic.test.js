var test = require('tap-only');
var fs = require('fs');
var addFulltextToLicenses = require('../add-full-text-to-licenses');
var expected = require('./fixtures/expected-output.json');

test('basic test', function (t) {
  t.plan(1);
  var data = fs.readFileSync('./test/fixtures/snyk-test-report.json', 'utf8');
  data = JSON.parse(data);
  var issues = data.vulnerabilities;
  addFulltextToLicenses(issues)
    .then(function (enhanced) {
      t.equal(JSON.stringify(enhanced),
              JSON.stringify(expected.vulnerabilities),
              'output as expected');
    });
});
