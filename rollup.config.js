// -------------------------------
// Bundle configuration (/dist)
// -------------------------------

const { terser } = require("rollup-plugin-terser");
const replace = require("@rollup/plugin-replace");
const pkg = require("./package.json");

const DEBUG = false;
const DEBUG_PRETTY = false;
const VERSION = pkg.version;

module.exports = [];

const config = {
  input: "src/index.mjs",
  external: ["lodash", "jquery"],
  treeshake: {
    // see https://rollupjs.org/guide/en/#treeshake
    annotations: true, // allows  @__PURE__ or #__PURE__
    moduleSideEffects: false, // unused module never has side-effects. Can be a list or function
    propertyReadSideEffects: false, // reading a property of an object never has side-effect
    tryCatchDeoptimization: false, // allows optimization inside try catch
    unknownGlobalSideEffects: false // reading an unknown global never has side-effect
  }
};

const config_output = {
  globals: {
    lodash: "_",
    jquery: "$"
  },
  interop: false,
  banner: require("fs")
    .readFileSync("src/header.mjs", "utf8")
    .replace("COMPILER_VER", VERSION)
};

const config_replace = {
  COMPILER_VER: VERSION,
  COMPILER_DEBUG: DEBUG,
  COMPILER_CLI: undefined
};

const config_terser = {
  output: {
    beautify: DEBUG || DEBUG_PRETTY,
    comments: DEBUG ? true : "some"
  },
  toplevel: true,
  keep_classnames: DEBUG,
  keep_fnames: DEBUG,
  mangle: !DEBUG,
  compress: {
    ecma: 8,
    drop_console: false,
    drop_debugger: !DEBUG
  }
};

module.exports.push(

  { // prod cjs
    ...config,
    output: {
      ...config_output,
      format: "cjs",
      file: "dist/index.js",
      sourcemap: DEBUG ? "inline" : false
    },
    plugins: [
      replace({
        ...config_replace,
        COMPILER_DEV: false
      }),
      terser(config_terser)
    ]
  },

  { // dev cjs
    ...config,
    output: {
      ...config_output,
      format: "cjs",
      file: "dist/devel/index.js",
      sourcemap: "inline"
    },
    plugins: [
      replace({
        ...config_replace,
        COMPILER_DEV: true
      }),
      terser(config_terser)
    ]
  }
);