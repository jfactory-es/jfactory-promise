// -------------------------------
// Bundle configuration (/dist)
// -------------------------------

const { terser } = require("rollup-plugin-terser");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const replace = require("@rollup/plugin-replace");

const DEBUG = false;

let common = {
  external: ["lodash", "jquery"],
  treeshake: {
    annotations: true,
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
    unknownGlobalSideEffects: false
  }
};

let common_output = {
  globals: {
    lodash: "_",
    jquery: "$"
  }
};

const plugins_prod = [
  nodeResolve({}),

  replace({
    COMPILER_DEV: false,
    COMPILER_DEBUG: DEBUG,
    COMPILER_CLI: undefined
  }),

  terser({
    toplevel: true,
    output: {
      beautify: DEBUG
    },
    keep_classnames: DEBUG,
    keep_fnames: DEBUG,
    mangle: !DEBUG,
    compress: {
      ecma: 8,
      drop_console: false,
      drop_debugger: !DEBUG
    }
  })
];

const plugins_dev = [
  nodeResolve({}),

  replace({
    COMPILER_DEV: true,
    COMPILER_DEBUG: DEBUG,
    COMPILER_CLI: undefined
  }),

  terser({
    toplevel: true,
    output: {
      beautify: DEBUG
    },
    keep_classnames: DEBUG,
    keep_fnames: DEBUG,
    mangle: !DEBUG,
    compress: {
      ecma: 8,
      drop_console: false,
      drop_debugger: !DEBUG
    }
  })
];

module.exports = [

  {
    input: "src/index-prod.js",
    output: {
      format: "cjs",
      file: "dist/index.js",
      interop: false,
      sourcemap: false,
      ...common_output
    },
    ...common,
    plugins: plugins_prod
  },

  {
    input: "src/index-devel.js",
    output: {
      format: "cjs",
      file: "dist/devel/index.js",
      interop: false,
      sourcemap: true,
      ...common_output
    },
    ...common,
    plugins: plugins_dev
  }

];