let envars = require('./envars');

let config = {};

// for (let f of fields) {
//   let value = process.env[constantCase(f)] || envars[f];
//   if (value === undefined) {
//     console.error(`Missing config: ${f}`);
//     process.exit(1);
//   }
//   config[f] = value;
// }

module.exports = envars;