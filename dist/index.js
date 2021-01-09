/*!
 * JFactoryPromise v1.7.7-beta
 * http://github.com/jfactory-es/jfactory-promise
 * (c) 2019-2021, Stéphane Plazis, http://github.com/jfactory-es/jfactory-promise/blob/master/LICENSE.txt
 */
'use strict';

if (process.env.NODE_ENV === "development") {
  module.exports = require("./JFactoryPromise-devel.umd.js");
} else {
  module.exports = require("./JFactoryPromise.umd.js");
}
