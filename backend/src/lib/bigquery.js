const { BigQuery } = require("@google-cloud/bigquery");
const fs = require("fs");
const Path = require("path");
const config = require("../config");

const options = {
  projectId: config.projectId
};

if (fs.existsSync(Path.resolve(config.keyPath, config.keyFileName))) {
  options["keyFilename"] = Path.resolve(config.keyPath, config.keyFileName);
}

module.exports = new BigQuery(options);
