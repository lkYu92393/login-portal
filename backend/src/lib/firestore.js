const Firestore = require("@google-cloud/firestore");
const fs = require("fs");
const Path = require("path");
const config = require("../config");

const options = {
  projectId: config.projectId
};

if (fs.existsSync(Path.resolve("../../key/", config.keyFileName))) {
  options["keyFilename"] = Path.resolve("../../key/", config.keyFileName);
}

module.exports = new Firestore(options);