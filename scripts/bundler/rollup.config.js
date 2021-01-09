const RollupCfgMaker = require("jfactory/scripts/bundler/RollupCfgMaker")
const pkg = require("../../package.json");

module.exports = new RollupCfgMaker({
  name: "JFactoryPromise",
  version: pkg.version,
  license: "http://github.com/jfactory-es/jfactory-promise/blob/master/LICENSE.txt",
  repo: "http://github.com/jfactory-es/jfactory-promise",
  bundle: true,
  debug: false,
  sourcemap: true
}).get();