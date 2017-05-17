var request = require('request-promise');

var cache = {};

function downloadLicense(licenseUrl) {
  if (cache.hasOwnProperty(licenseUrl)) {
    return Promise.resolve();
  }
  return request(licenseUrl)
    .then(function (licenseText) {
      cache[licenseUrl] = licenseText;
    }).catch(function (err) {
      console.log('error downloading', licenseUrl, err);
      cache[licenseUrl] = 'Download Error';
    });
}

function fetchAllLicenses(issues) {
  var licenseUrls = Array.from(new Set(
    issues.map(function (issue) {
      return issue.licenseUrl || issue.licenseTemplateUrl;
    })));

  return Promise.all(licenseUrls.map(function download(licenseUrl) {
    if (licenseUrl) {
      if (Array.isArray(licenseUrl)) {
        // more than 1 license for this package
        return Promise.all(licenseUrl.map(downloadLicense));
      }
      return downloadLicense(licenseUrl);
    }
    // no license url, do nothing
    return Promise.resolve();
  }));
}

/**
 * issues are an array of issue objects (vulns, licnese issues).
 * This reads the licenseUrl or licenseTemplateUrl and adds the
 * license full text from there to the object, in the licenseText
 * property.
 */
function addFulltextToLicenses(issues) {
  return fetchAllLicenses(issues)     // fill cache
    .then(function enhance() {
      return issues.map(function (issue) {
        var licenseUrl = issue.licenseUrl || issue.licenseTemplateUrl;
        if (Array.isArray(licenseUrl)) {
          issue.licenseText = licenseUrl.map(function (url) {
            return cache[url];
          });
        } else {
          issue.licenseText = cache[licenseUrl];
        }
        return issue;
      });
    });
}

module.exports = addFulltextToLicenses;
