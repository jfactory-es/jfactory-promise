/*!
 * JFactoryPromise v1.7.7-beta.0
 * http://github.com/jfactory-es/jfactory-promise
 * (c) 2019-2021, Stéphane Plazis, http://github.com/jfactory-es/jfactory-promise/blob/master/LICENSE.txt
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jFactoryModule = {}, global._));
}(this, (function (exports, _) { 'use strict';

    // ---------------------------------------------------------------------------------------------------------------------
    // jFactory Env
    // ---------------------------------------------------------------------------------------------------------------------
    // Contextualize jFactory for bundle, raw source or partial export usage
    // ---------------------------------------------------------------------------------------------------------------------

    // The builder replaces these lines
    const JFACTORY_NAME = "JFactoryPromise";
    const JFACTORY_VER  = "1.7.7-beta.0-devel-umd";

    // The builder may replace env("JFACTORY_ENV_*") by hard coded true/false primitives,
    // allowing the bundler to remove unused code using Tree Shaking
    const JFACTORY_CLI   = env("JFACTORY_ENV_CLI") ?? isNode();
    const JFACTORY_REPL  = env("JFACTORY_ENV_REPL") ?? isPlayground();
    const JFACTORY_DEV   = true ; // Developer Mode
    const JFACTORY_LOG   = env("JFACTORY_ENV_LOG") ?? (JFACTORY_DEV );
    const JFACTORY_TRACE = env("JFACTORY_ENV_TRACE") ?? (JFACTORY_DEV );
    const JFACTORY_BOOT  = env("JFACTORY_ENV_BOOT") ?? true; // Allow autoboot at load
    const jFactoryCfg = cfg;
    const JFACTORY_CFG = {};

    function env(key) {
        let env = globalThis[key];
        delete globalThis[key];
        return env
    }

    function cfg(key, val) {
        if (JFACTORY_CFG[key] === undefined) {
            JFACTORY_CFG[key] = Object.assign({}, val, globalThis[key]);
            delete globalThis[key];
        } else if (val !== undefined) {
            JFACTORY_CFG[key] = val === false ? false : Object.assign(JFACTORY_CFG[key], val);
        }
        return JFACTORY_CFG[key]
    }

    function isNode() {
        return (
            typeof process === "object" &&
            typeof process.versions === "object" &&
            process.versions.node
        )
    }

    function isPlayground() {
        const hosts = [
            "cdpn.io",
            "fiddle.jshell.net",
            "null.jsbin.com",
            "jsitor.com",
            "jseditor.io",
            "liveweave.com",
            "run.plnkr.co",
            "playcode.io"
        ];
        try {
            return hosts.indexOf(new URL(document.location.href).hostname) !== -1
        } catch {}
    }

    // ---------------------------------------------------------------------------------------------------------------------

    let deferred = {};

    function jFactoryCompat_run(entries = deferred) {
        for (let entry of Object.values(entries)) {
            let pass;
            try {pass = Boolean(entry.test());} catch (ignore) {}
            if (!pass) {
                let msg = `jFactory may require the support of "${entry.name}", ${entry.info}`;
                if (entry.strict) {
                    throw new Error(msg)
                } else {
                    console.warn(msg);
                }
            }
        }
    }

    const helper_isString = _.isString;
    const helper_isNumber = _.isNumber;
    const helper_isPlainObject = _.isPlainObject;
    const helper_lowerFirst = _.lowerFirst;
    const helper_get = _.get;
    const helper_template = _.template;

    const NOOP = () => {};

    const helper_isNative = function(f) {
        return typeof f === "function" && Function.prototype.toString.call(f).indexOf("[native code]") !== -1
    };

    function helper_useragent(id) {
        return globalThis.navigator &&
        globalThis.navigator.userAgent &&
        globalThis.navigator.userAgent.indexOf(id + "/") > 0
    }

    const helper_deferred = () => new Deferred;
    class Deferred {
        constructor() {
            this._done = [];
            this._fail = [];
        }
        execute(list) {
            for (let h of list){
                h();
            }
            this.fulfilled = true;
        }
        resolve() {
            this.execute(this._done);
        }
        reject() {
            this.execute(this._fail);
        }
        done(callback) {
            if (this.fulfilled) {
                callback();
            } else {
                this._done.push(callback);
            }
        }
        fail(callback) {
            if (this.fulfilled) {
                callback();
            } else {
                this._fail.push(callback);
            }
        }
    }

    function jFactoryBootstrap(auto) {
        if (!_isLoaded) {
            if (auto && !JFACTORY_BOOT) {
                // auto bootstrap is disabled by env
                return
            }
            {
                console.log(`${JFACTORY_NAME} ${JFACTORY_VER} running in development mode; performances will be affected`);
                !JFACTORY_LOG && console.log("jFactory: logs disabled");
                jFactoryCompat_run();
            }
            init();
            _isLoaded = true;
        }
    }

    let seq = [];
    function init() {
        if (seq) {
            for (let handler of seq) {
                handler();
            }
            seq = null;
        }
    }

    let _isLoaded = false;
    function jFactoryBootstrap_expected() {
        if (!_isLoaded) {
            throw new Error("jFactoryBootstrap() must be called before using jFactory")
        }
    }

    function jFactoryBootstrap_onBoot(handler) {
        if (_isLoaded) {
            throw new Error("jFactoryBootstrap() already called")
        }
        seq.push(handler);
    }

    // ---------------------------------------------------------------------------------------------------------------------
    // JFactoryTrace 1.7
    // ---------------------------------------------------------------------------------------------------------------------
    // Status: Beta
    // ---------------------------------------------------------------------------------------------------------------------
    // - #limitation# Error.stack is not standardized
    // - #limitation# Error.stack is not source-mapped
    // - #limitation# bug https://bugzilla.mozilla.org/show_bug.cgi?id=1584244
    // - #limitation# StackTrace.js resolves sourcemaps. Unfortunately, it doesn't work with "webpack:" protocol
    //   see https://github.com/stacktracejs/stacktrace.js/issues/209
    // ---------------------------------------------------------------------------------------------------------------------
    // https://github.com/mozilla/source-map/
    // https://www.stacktracejs.com/
    // https://github.com/novocaine/sourcemapped-stacktrace
    // ---------------------------------------------------------------------------------------------------------------------

    class JFactoryTrace {

        constructor(omitAboveFunctionName = "JFactoryTrace", omitSelf = true, stackTraceLimit = Infinity) {
            let _stackTraceLimit;
            if (stackTraceLimit) {
                _stackTraceLimit = Error.stackTraceLimit;
                Error.stackTraceLimit = stackTraceLimit;
            }

            this.source = new Error();
            this.omitAboveFunctionName = omitAboveFunctionName;
            this.omitSelf = omitSelf;

            if (stackTraceLimit) {
                Error.stackTraceLimit = _stackTraceLimit;
            }

            this.init();
        }

        init() {
            this.printable = this.source;
            this.asyncPrintable = Promise.resolve(this.printable);
        }

        static createErrorFromStack(stack) {
            let e = new Error();
            e.name = "JFactoryTrace";
            e.stack = stack;
            return e
        }
    }

    class JFactoryTrace_LIB_STACKTRACE extends JFactoryTrace {

        init() {
            let h = traceFrames => {
                this.printable = this.constructor.createErrorFromStack(
                    this.createStackFromTraceFrames(
                        this.filterTraceFrames(traceFrames)
                    )
                );
            };

            h(StackTrace.getSync(this.source, config.libOptions));
            if (config.useSourcemap) {
                this.asyncPrintable = StackTrace.fromError(this.source, config.libOptions).then(h);
            } else {
                this.asyncPrintable = Promise.resolve(this.printable);
            }
        }

        filterTraceFrames(traceFrames) {
            if (this.omitAboveFunctionName) {
                let slice = traceFrames.findIndex(
                    value => value.functionName && value.functionName.endsWith(this.omitAboveFunctionName)
                );
                if (slice > 0) {
                    if (this.omitSelf) {
                        slice++;
                    }
                    traceFrames = traceFrames.slice(slice);
                }
            }
            return traceFrames
        }

        createStackFromTraceFrames(traceFrames) {
            for (let formatter of Object.values(jFactoryTrace.formatters)) {
                if (formatter.test()) {
                    return formatter.format(traceFrames)
                }
            }
            return this.source.stack
        }
    }

    // ---------------------------------------------------------------------------------------------------------------------
    // jFactoryTrace
    // ---------------------------------------------------------------------------------------------------------------------
    // Status: Beta
    // ---------------------------------------------------------------------------------------------------------------------

    let tracer;
    if ( JFACTORY_TRACE) {

        tracer = {

            captureTraceSource(omitAboveFunctionName, omitSelf, stackTraceLimit) {
                return new(config.tracer || JFactoryTrace)(omitAboveFunctionName, omitSelf, stackTraceLimit)
            },

            attachTrace(
                targetObject, traceSource /* or omitAboveFunctionName */,
                traceLogKey = config.keys[0], traceSourceKey = config.keys[1],
                label = config.label
            ) {
                if (typeof traceSource !== "object") {
                    traceSource = this.captureTraceSource(traceSource || "attachTrace", !traceSource);
                }

                let log = () => console.log(traceSource.printable) || label || "The stack has been printed in the console";

                Object.defineProperty(targetObject, traceLogKey, {
                    // hide the function body to improve readability in devtool
                    get: () => log()
                });

                Object.defineProperty(targetObject, traceSourceKey, {
                    value: traceSource
                });
            },

            formatters: {

                webkit: {
                    test() {
                        return helper_useragent("Chrome")
                    },
                    format(traceFrames) {
                        // Chrome syntax
                        // String must start with "Error" and parenthesis are important
                        // => The console will convert the uri using sourcemaps
                        return "Error (generated by JFactoryTrace)\n" +
                            traceFrames.map(sf => {
                                let s = "\tat ";
                                let uri = sf.fileName + ":" + sf.lineNumber + ":" + sf.columnNumber;
                                if (sf.functionName) {
                                    s += sf.functionName + " (" + uri + ")";
                                } else {
                                    s += uri; // no parenthesis
                                }
                                return s
                            }).join("\n");
                    }
                },

                firefox: {
                    test() {
                        return helper_useragent("Gecko")
                    },
                    format(traceFrames) {
                        // Firefox syntax
                        return traceFrames.map(sf =>
                            (sf.functionName ?? "<anonymous>")
                                + "@" + sf.fileName + ":" + sf.lineNumber + ":" + sf.columnNumber
                        ).join("\n");
                    }
                }
            }
        };

    } else {

        tracer = {
            captureTraceSource: NOOP,
            attachTrace: NOOP
        };

    }

    const jFactoryTrace = tracer;

    // ---------------------------------------------------------------------------------------------------------------------
    // Config
    // ---------------------------------------------------------------------------------------------------------------------

    const config = jFactoryCfg("JFACTORY_CFG_JFactoryTrace");

    if ( JFACTORY_TRACE) {
        config.keys = ["$dev_traceLog", "$dev_traceSource"];
        if (typeof StackTrace === "object") {
            config.tracer = JFactoryTrace_LIB_STACKTRACE;
            config.useSourcemap = false;
        }
        jFactoryBootstrap_onBoot(function() {
            if (config.tracer === JFactoryTrace_LIB_STACKTRACE) {
                console.log("JFactoryTrace: Stacktrace.js support enabled; performances will be affected");
            }
        });
    }

    // ---------------------------------------------------------------------------------------------------------------------
    // JFactoryError
    // ---------------------------------------------------------------------------------------------------------------------
    // Status: Beta
    // ---------------------------------------------------------------------------------------------------------------------

    class JFactoryError extends Error {
        constructor(message = "unspecified error", data = null) {
            data = Object.assign(Object.create(null), data);
            message = JFactoryError.toPrintable(message, data);
            super(message);
            this.$data = Object.assign(Object.create(null), data);
        }

        toString() {
            return this.message
        }

        * [Symbol.iterator]() {
            yield this.message;
            yield this.$data;
        }

        static getId(object) {
            return object[config$1.keys.find(key => {
                let val = helper_get(object, key);
                return val || val === 0
            })]
        }

        static toPrintableData(data) {
            const templateData = {};
            let nv;
            for (let [key, val] of Object.entries(data)) {
                switch (typeof val) {
                    case "function":
                        val = val.name + "()";
                        break;
                    case "object":
                        if (val === null) {
                            val = "null";
                            break
                        }
                        if (val instanceof Error) {
                            val = val.toString();
                            break
                        }
                        if ((nv = JFactoryError.getId(val)) !== undefined) {
                            val = '"' + nv + '"';
                        } else {
                            if (!helper_isNative(val.toString)) {
                                val = val.toString();
                            } else {
                                try {
                                    nv = JSON.stringify(val);
                                    val = nv.length > config$1.jsonMax
                                        ? nv.substring(0, config$1.jsonMax) + "[...]" : nv;
                                } catch (e) {
                                    val = "[object " + val.constructor.name + "]";
                                }
                            }
                        }
                        break;
                    case "string":
                        val = '"' + val + '"';
                        break;
                    default:
                        val = String(val);
                }
                templateData[key] = val;
            }
            return templateData
        }

        static toPrintable(template, data) {
            const templateMessage = [];
            for (let part of template.split(";")) {
                let placeholder;
                let re = config$1.reg_placeholder;
                re.lastIndex = 0;
                if ((placeholder = re.exec(part))) {
                    do {
                        if (placeholder[1] && placeholder[1] in data) {
                            templateMessage.push(part.trim());
                            break
                        }
                    } while ((placeholder = re.exec(part)) !== null)
                } else {
                    templateMessage.push(part.trim());
                }
            }
            return helper_lowerFirst(helper_template(templateMessage.join("; "))(JFactoryError.toPrintableData(data)));
        }

        static factory(type, template) {
            let ret = {
                [type]: class extends JFactoryError {
                    constructor(data, traceSource) {
                        super(template, data);
                        jFactoryTrace.attachTrace(this.$data, traceSource);
                    }
                }
            }[type];

            // Chrome automatically resolves sourcemap when logging errors
            // but only if the error name starts with "Error"
            ret.prototype.name = "Error JFACTORY_ERR_" + type;
            return ret
        }
    }

    // ---------------------------------------------------------------------------------------------------------------------
    // JFACTORY_ERR_*
    // ---------------------------------------------------------------------------------------------------------------------
    // Status: Beta
    // ---------------------------------------------------------------------------------------------------------------------

    const E = JFactoryError.factory;

    /* eslint-disable max-len */
    const JFACTORY_ERR_INVALID_VALUE = /*#__PURE__*/E("INVALID_VALUE", "invalid value for ${target}; Reason: ${reason}; Given: ${given}");
    const JFACTORY_ERR_INVALID_CALL = /*#__PURE__*/E("INVALID_CALL", "invalid call ${target}; Reason: ${reason}; Owner: ${owner}");
    const JFACTORY_ERR_PROMISE_EXPIRED = /*#__PURE__*/E("PROMISE_EXPIRED", "expired promise ${target}; Reason: ${reason}");

    // ---------------------------------------------------------------------------------------------------------------------
    // Config
    // ---------------------------------------------------------------------------------------------------------------------

    const config$1 = jFactoryCfg("JFACTORY_CFG_JFactoryError", {
        reg_placeholder: /\${([^}]+)}/g,
        jsonMax: 40,
        keys: ["$.about.name", "$dev_name", "$name", "name", "id"]
    });

    // ---------------------------------------------------------------------------------------------------------------------
    // JFactoryExpect
    // ---------------------------------------------------------------------------------------------------------------------
    // A small input/output validation tool
    // ---------------------------------------------------------------------------------------------------------------------
    // Status: Alpha, Draft
    // ---------------------------------------------------------------------------------------------------------------------

    /**
     * @return {*|JFactoryExpect}
     */
    function JFactoryExpect(label, value) {
         jFactoryBootstrap_expected();
        if (new.target) {
            this.label = label;
            this.value = value;
        } else {
            return new JFactoryExpect(label, value)
        }
    }

    const error = function jFactoryThrow(label, value, message) {
        throw new JFACTORY_ERR_INVALID_VALUE({
            target: label,
            reason: message,
            given: value
        })
    };

    const staticMethods = {
        /**
         * @method notUndefined
         * @memberOf JFactoryExpect#
         * @return JFactoryExpect
         */
        /**
         * @method notUndefined
         * @memberOf JFactoryExpect
         */
        notUndefined(label, value) {
            if (value === undefined) {
                error(label, value, "cannot be undefined");
            }
            return true
        },

        /**
         * @method notEmptyString
         * @memberOf JFactoryExpect#
         * @return JFactoryExpect
         */
        /**
         * @method notEmptyString
         * @memberOf JFactoryExpect
         */
        notEmptyString(label, value) {
            if (value === "") {
                error(label, value, "cannot be empty string");
            }
            return true
        },

        /**
         * @method notFalsy
         * @memberOf JFactoryExpect#
         * @return JFactoryExpect
         */
        /**
         * @method notFalsy
         * @memberOf JFactoryExpect
         */
        notFalsy(label, value) {
            if (!value) {
                error(label, value, 'cannot be a falsy value (undefined, null, NaN, 0, "")');
            }
            return true
        },

        /**
         * @method validSpaces
         * @memberOf JFactoryExpect#
         * @return JFactoryExpect
         */
        /**
         * @method validSpaces
         * @memberOf JFactoryExpect
         */
        validSpaces(label, value) {
            if (!value.replace || value.replace(/\s+/g, " ").trim() !== value) {
                error(label, value, "invalid space delimiters");
            }
            return true
        },

        /**
         * @method matchReg
         * @memberOf JFactoryExpect#
         * @param {RegExp} reg
         * @return JFactoryExpect
         */
        /**
         * @method matchReg
         * @memberOf JFactoryExpect
         */
        matchReg(label, value, reg) {
            if (!reg.test(value)) {
                error(label, value, 'string "' + value + '" must match ' + reg);
            }
            return true
        },

        /**
         * @method type
         * @memberOf JFactoryExpect#
         * @param {...*} expected
         * @return JFactoryExpect
         */
        /**
         * @method type
         * @memberOf JFactoryExpect
         */
        type(label, value, ...expected) {
            let name, ok = false;
            for (let constructor of expected) {
                if (constructor === null) {
                    name = "Null";
                } else if ("name" in constructor) {
                    name = constructor.name;
                }
                let test = staticMethods["type" + name];
                if (test) {
                    try {ok = test(label, value/*, e*/);} catch (e) {}
                } else {
                    ok = value instanceof constructor;
                }
                if (ok) break
            }
            if (!ok) {
                error(label, value, "must be an instance of [" + expected.map(e => e.name).join(", ") + "]");
            }
            return true
        },

        /**
         * @method typeNull
         * @memberOf JFactoryExpect#
         * @return JFactoryExpect
         */
        /**
         * @method typeNull
         * @memberOf JFactoryExpect
         */
        typeNull(label, value) {
            if (value !== null) {
                error(label, value, "must be null");
            }
            return true
        },

        /**
         * @method typeBoolean
         * @memberOf JFactoryExpect#
         * @return JFactoryExpect
         */
        /**
         * @method typeBoolean
         * @memberOf JFactoryExpect
         */
        typeBoolean(label, value) {
            if (value !== true && value !== false) {
                error(label, value, "must be a boolean");
            }
            return true
        },

        /**
         * @method typeString
         * @memberOf JFactoryExpect#
         * @return JFactoryExpect
         */
        /**
         * @method typeString
         * @memberOf JFactoryExpect
         */
        typeString(label, value) {
            if (!helper_isString(value)) {
                error(label, value, "must be a string");
            }
            return true
        },

        /**
         * @method typeNumber
         * @memberOf JFactoryExpect#
         * @return JFactoryExpect
         */
        /**
         * @method typeNumber
         * @memberOf JFactoryExpect
         */
        typeNumber(label, value) {
            if (!helper_isNumber(value)) {
                error(label, value, "must be a number");
            }
            return true
        },

        /**
         * @method typeFunction
         * @memberOf JFactoryExpect#
         * @return JFactoryExpect
         */
        /**
         * @method typeFunction
         * @memberOf JFactoryExpect
         */
        typeFunction(label, value) {
            if (!(typeof value === "function")) {
                error(label, value, "must be a function");
            }
            return true
        },

        /**
         * @method typePlainObject
         * @memberOf JFactoryExpect#
         * @return JFactoryExpect
         */
        /**
         * @method typePlainObject
         * @memberOf JFactoryExpect
         */
        typePlainObject(label, value) {
            if (!helper_isPlainObject(value)) {
                error(label, value, "must be a plain object");
            }
            return true
        },

        /**
         * @method equal
         * @memberOf JFactoryExpect#
         * @param {*} expected
         * @return JFactoryExpect
         */
        /**
         * @method equal
         * @memberOf JFactoryExpect
         */
        equal(label, value, ...expected) {
            let ok = false;
            for (let e of expected) {
                if ((ok = value === e)) break
            }
            if (!ok) {
                error(label, value, "must be one of [" + expected + "]");
            }
            return true;
        },

        /**
         * @method equalIn
         * @memberOf JFactoryExpect#
         * @param {Array|Object} expected
         * @return JFactoryExpect
         */
        /**
         * @method equalIn
         * @memberOf JFactoryExpect
         */
        equalIn(label, value, expected) {
            if (!Array.isArray(expected)) {
                expected = Object.values(expected);
            }
            if (!expected.includes(value)) {
                error(label, value, "must be one from [" + expected.join(", ") + "]");
            }
            return true
        },

        /**
         * @method properties
         * @memberOf JFactoryExpect#
         * @param {Array} expected
         * @return JFactoryExpect
         */
        /**
         * @method properties
         * @memberOf JFactoryExpect
         */
        properties(label, value, expected) {
            for (let name of Object.getOwnPropertyNames(value)) {
                JFactoryExpect(label + ', property name "' + name + '"', name).equalIn(expected);
            }
            return true
        },

        /**
         * @method writable
         * @memberOf JFactoryExpect#
         * @param {String} key
         * @return JFactoryExpect
         */
        /**
         * @method writable
         * @memberOf JFactoryExpect
         */
        writable(label, value, key) {
            if (!Object.getOwnPropertyDescriptor(value, key).writable) {
                error(label, value, "must be writable");
            }
            return true
        },

        /**
         * @method notWritable
         * @memberOf JFactoryExpect#
         * @param {String} key
         * @return JFactoryExpect
         */
        /**
         * @method notWritable
         * @memberOf JFactoryExpect
         */
        notWritable(label, value, key) {
            if (Object.getOwnPropertyDescriptor(value, key).writable) {
                error(label, value, "must not be writable");
            }
            return true
        },

        /**
         * @method enumerable
         * @memberOf JFactoryExpect#
         * @param {String} key
         * @return JFactoryExpect
         */
        /**
         * @method enumerable
         * @memberOf JFactoryExpect
         */
        enumerable(label, value, key) {
            if (!Object.prototype.propertyIsEnumerable.call(value, key)) {
                error(label, value, "must be enumerable");
            }
            return true
        },

        /**
         * @method notEnumerable
         * @memberOf JFactoryExpect#
         * @param {String} key
         * @return JFactoryExpect
         */
        /**
         * @method notEnumerable
         * @memberOf JFactoryExpect
         */
        notEnumerable(label, value, key) {
            if (Object.prototype.propertyIsEnumerable.call(value, key)) {
                error(label, value, "must not be enumerable");
            }
            return true
        },

        /**
         * @method configurable
         * @memberOf JFactoryExpect#
         * @param {String} key
         * @return JFactoryExpect
         */
        /**
         * @method configurable
         * @memberOf JFactoryExpect
         */
        configurable(label, value, key) {
            if (!Object.getOwnPropertyDescriptor(value, key).configurable) {
                error(label, value, "must be configurable");
            }
            return true
        },

        /**
         * @method notConfigurable
         * @memberOf JFactoryExpect#
         * @param {String} key
         * @return JFactoryExpect
         */
        /**
         * @method notConfigurable
         * @memberOf JFactoryExpect
         */
        notConfigurable(label, value, key) {
            if (Object.getOwnPropertyDescriptor(value, key).configurable) {
                error(label, value, "must not be configurable");
            }
            return true
        },

        /**
         * @method reservedProperty
         * @memberOf JFactoryExpect#
         * @param {String} key
         * @return JFactoryExpect
         */
        /**
         * @method reservedProperty
         * @memberOf JFactoryExpect
         */
        reservedProperty(label, value, key) {
            if (key in value) {
                error(label, value, "is a reserved property");
            }
            return true
        }
    };

    jFactoryBootstrap_onBoot(function() {
        Object.assign(JFactoryExpect, staticMethods);
        // Generate members from static methods
        for (const name of Object.getOwnPropertyNames(staticMethods)) {
            JFactoryExpect.prototype[name] =
                function callStatic(...args) {
                    JFactoryExpect[name](this.label, this.value, ...args);
                    return this
                };
        }
    });

    // ---------------------------------------------------------------------------------------------------------------------
    // JFactoryPromise 1.7
    // ---------------------------------------------------------------------------------------------------------------------
    // Status: Beta
    // ---------------------------------------------------------------------------------------------------------------------

    // #limitation# async functions always use the native Promise constructor even if native Promise class is overridden
    // #limitation# async functions always returns a native Promise even if returning an extended Promise
    // #limitation# async functions always returns a pending Promise even if returning a resolved Promise

    const moduleGenId = () => ++moduleGenId.uid; moduleGenId.uid = 0;

    // ---------------------------------------------------------------------------------------------------------------------
    // JFactoryPromise
    // ---------------------------------------------------------------------------------------------------------------------

    class JFactoryPromise extends Promise {

        constructor({ name, config, traceSource }, executor) {
             jFactoryBootstrap_expected();

            if (arguments.length === 1) {
                [name, config, executor] = [null, null, arguments[0]];
            }

            const chainId = moduleGenId();
            config = { ...JFactoryPromise.DEFAULT_CONFIG, ...config };
            name = name || "unnamed";

            {
                JFactoryExpect("name", name)
                    .type(String, Number)
                    .matchReg(/^[^. ]+$/);
                JFactoryExpect("config", config).typePlainObject();
                JFactoryExpect("executor", executor).typeFunction();
            }

            let resolve;
            let reject;

            super((_resolve, _reject) => {
                resolve = _resolve;
                reject = _reject;
            });

            const chain = new JFactoryPromiseChain(this, chainId, name, config);

            Object.defineProperties(this, {
                $chain: {
                    enumerable: true,
                    writable: true,
                    value: chain
                },
                $type: {
                    writable: true,
                    value: "promise"
                },
                $value: {
                    writable: true,
                    value: undefined
                },
                $isSettled: {
                    writable: true,
                    value: false
                },
                $isRejected: {
                    writable: true,
                    value: null
                },
                $isFulfilled: {
                    writable: true,
                    value: null
                },
                $isExpired: {
                    writable: true,
                    value: false
                },
                $isAborted: {
                    writable: true,
                    value: false
                }
            });

            {
                Object.defineProperties(this, {
                    $dev_name: {
                        configurable: true,
                        value: name + "[" + chainId + ":0]"
                    },
                    $dev_path: {
                        writable: true,
                        value: new JFactoryPromisePath(this)
                    },
                    $dev_position: {
                        writable: true,
                        value: 0
                    }
                });
                if (!helper_isNative(executor)) {
                    Object.defineProperties(this, {
                        $dev_source: {
                            value: executor
                        }
                    });
                }
                jFactoryTrace.attachTrace(this, traceSource);
            }

            const tryAutoComplete = () => {
                if (!this.$chain.isPending) {
                    try {
                        this.$chainComplete("auto-completed");
                    } catch (e) {
                        // Case of error in "complete" callback
                        // We catch the exception because the promise is already fulfilled
                        // Furthermore this issue must be handled by the chain, not the current promise
                        console.error(e); // print the error otherwise nothing happens
                    }
                }
            };

            const onResolve = value => {
                // console.trace("onResolve", this.$dev_name);
                if (!this.$isSettled) {
                    // 2.3.1. If promise and x refer to the same object, reject promise with a TypeError as the reason.
                    if (value === this) {
                        onReject(new TypeError("Chaining cycle detected for promise " + this.$dev_name));
                        return;
                    }

                    let then;
                    if (value !== null && (typeof value == "object" || typeof value == "function")) {
                        // 2.3.3.2. If retrieving the property x.then results in a thrown exception e,
                        // reject promise with e as the reason.
                        try {
                            then = value.then;
                        } catch (e) {
                            onReject(e);
                            return;
                        }
                    }

                    if (typeof then == "function") {
                        let called = false;
                        let resolvePromise = function(y) {
                            // 2.3.3.3.1. If/when resolvePromise is called with a value y, run [[Resolve]](promise, y).
                            if (!called) {
                                called = true;
                                onResolve(y);
                            }
                        };
                        let rejectPromise = function(r) {
                            // 2.3.3.3.2. If/when rejectPromise is called with a reason r, reject promise with r.
                            if (!called) {
                                called = true;
                                onReject(r);
                            }
                        };

                        try {
                            // 2.3.3.3: If `then` is a function, call it as x.then(resolvePromise, rejectPromise)
                            then.call(value, resolvePromise, rejectPromise);
                        } catch (e) { // 2.3.3.3.4. If calling then throws an exception e,
                            // 2.3.3.3.4.1. If resolvePromise or rejectPromise have been called, ignore it.
                            if (!called) {
                                // 2.3.3.3.4.2. Otherwise, reject promise with e as the reason.
                                onReject(e);
                            }
                        }
                    }
                    else {
                        this.$isRejected = false;
                        this.$isFulfilled = true;
                        if (this.$isExpired) {
                            value = this.$chain.errorExpired;
                        }
                        resolve(value);
                        onSettle(value);
                    }
                }
            };

            const onReject = reason => {
                // console.log("onReject", this.$dev_name);
                if (!this.$isSettled) {
                    this.$isRejected = true;
                    this.$isFulfilled = false;
                    reject(reason);
                    onSettle(reason);
                }
            };

            const onSettle = value => {
                this.$value = value;
                this.$isSettled = true;
                this.$chain.chainMap.set(this, true);

                if (this.$chain.chainConfig.chainAutoComplete) {
                    if (this.$chain.chainMap.size === 1 && !this.$isExpired) {
                        // ensures that tryAutoComplete() will be called asynchronously (then() callback is asynchronous)
                        // case of promise.resolve(primitive), prevents following then() from being immediately locked
                        this.then(tryAutoComplete);
                    } else {
                        tryAutoComplete();
                    }
                }
            };

            let _chainAutoComplete = config.chainAutoComplete;
            Object.defineProperty(config, "chainAutoComplete", {
                get: () => _chainAutoComplete,
                set: value => {
                    if (_chainAutoComplete !== value) {
                        _chainAutoComplete = value;
                        if (value) {
                            tryAutoComplete();
                        }
                    }
                }
            });

            chain.chainMap.set(this, false);

            Object.defineProperties(this, {
                __resolve__: {
                    value: onResolve
                },
                __reject__: {
                    value: onReject
                }
            });

            try {
                executor(onResolve, onReject);
            } catch (e) {
                // console.error("exception in executor", this.$dev_name);
                onReject(e);
            }
        }

        then(onFulfilled, onRejected, forceType) {
            let wrappedFulfilled;
            let wrappedRejected;
            let newPromise;

            // Caution: "await" detection is not reliable.
            // Passing native functions for both onFulfilled and onRejected will
            // result to "await" type and may cause side effects
            let type = forceType || (
                helper_isNative(onFulfilled) && !onFulfilled.name.startsWith("bound ") &&
                helper_isNative(onRejected) && !onRejected.name.startsWith("bound ")
                    ? "await" : onFulfilled === undefined ? "catch" : "then"
            );

            if (onFulfilled && typeof onFulfilled === "function") {
                wrappedFulfilled = function(r) {
                    // "await" must always run the native handler
                    if (type === "await") {
                        // SPEC: "await" throws the errorExpired if $isAborted is true.
                        // Allows async function to try catch the awaited aborted promise
                        // or, if not caught, breaks and ignore the rest of the async function.
                        if (newPromise.$isAborted) {
                            return onRejected(newPromise.$chain.errorExpired)
                        } else {
                            return onFulfilled(r)
                        }
                    }
                    // otherwise don't call the handler if expired
                    if (!newPromise.$isExpired) {
                        if (newPromise.$isSettled) {
                            // eslint-disable-next-line no-debugger
                            debugger
                        }
                        return onFulfilled(r)
                    }
                };
            }
            if (onRejected && typeof onRejected === "function") {
                wrappedRejected = function(r) {
                    if (newPromise.$isSettled) {
                        // eslint-disable-next-line no-debugger
                        debugger
                    }
                    return onRejected(r)
                };
            }

            newPromise = Object.assign(super.then(wrappedFulfilled, wrappedRejected), this);
            moduleGenId.uid--; // reverse because not a new chain
            newPromise.$type = type;

            Object.defineProperties(newPromise, {
                __onFulfilled__: { value: onFulfilled },
                __onRejected__: { value: onRejected }
            });

            {
                newPromise.$dev_position = this.$chain.chainMap.size;
                let fNames = "";
                if (onFulfilled && onFulfilled.name) {
                    fNames += onFulfilled.name;
                }
                if (onRejected && onRejected.name) {
                    fNames += "," + onRejected.name;
                }
                Object.defineProperties(newPromise, {
                    $dev_name: {
                        value:
                            this.$chain.chainName
                            + "["
                            + this.$chain.chainId
                            + ":"
                            + this.$dev_position
                            + "]"
                            + "."
                            + newPromise.$type
                            + (fNames ? "(" + fNames + ")" : "")
                            + "["
                            + newPromise.$chain.chainId
                            + ":"
                            + newPromise.$dev_position
                            + "]"
                    },
                    $dev_path: { value: new JFactoryPromisePath(this.$dev_path, newPromise) }
                });
            }

            newPromise.$chain.chainMap.set(newPromise, false);

            if (this.$isExpired) {
                // case: p0.then(); chainAbort(); p1.then()
                // => the new promise must be expired
                // if parent promise is just expired, abort silently
                // if parent promise is aborted, abort explicitly

                // JFactoryPromise.setExpired(newPromise, true, !this.$isAborted, this.$chain.errorExpired);
                JFactoryPromise.setExpired(newPromise, this.$isAborted, true);
            }

            return newPromise
        }

        static resolve(optionalArgs, value) {
            // resolve()
            // resolve(optionalArgs, value)
            // resolve(value)

            if (arguments.length === 1) {
                [optionalArgs, value] = [{}, optionalArgs];
            }
            if (!optionalArgs) {
                optionalArgs = {};
            }
            if (value instanceof this && arguments.length === 1) {
                // Returns the promise as is (native spec)
                // but only if no optionalArgs
                return value
            } else {
                return new this(optionalArgs, function(resolve) {
                    resolve(value);
                });
            }
        }

        static reject(optionalArgs, reason) {
            // reject()
            // reject(optionalArgs, reason)
            // reject(reason)

            if (arguments.length === 1) {
                [optionalArgs, reason] = [{}, optionalArgs];
            }
            if (!optionalArgs) {
                optionalArgs = {};
            }
            return new this(optionalArgs, function(resolve, reject) {
                reject(reason);
            });
        }

        // $toPromise(rejectIfExpired = true) {
        //     return new Promise((resolve, reject) => {
        //         let promise = this.then(resolve, e => {
        //             debugger
        //             reject(e)
        //         });
        //         if (rejectIfExpired) {
        //             promise.$thenIfExpired(reject)
        //         }
        //     })
        // }

        // $toNewChain(abortIfExpired = true) {
        //     let newChain;
        //     return newChain = new JFactoryPromise((resolve, reject) => {
        //         let promise = this.then(resolve, e => {
        //             debugger
        //             reject(e)
        //         });
        //         if (abortIfExpired) {
        //             promise.$thenIfExpired(function(e){
        //                 newChain.$chainAbort(e)
        //             })
        //         }
        //     });
        // }

        // A "then" where the handler is called only if the chain is expired
        // it's not a catch (a catchExpired concept should cancel the expiration)
        $thenIfExpired(onExpired) {
            return this.then(r => this.$chain.chainRoot.$isExpired ? onExpired(r) : r,
                undefined, "$thenIfExpired"
            )
        }

        // Completes an expires the whole chain before its normal end
        // Sets the $isAborted to true on aborted promises
        $chainAbort(reason = "$chainAbort()") {
            this.$chain.complete(reason, true);
            return this
        }

        // Manually completes and expires the whole chain
        // Only required if awaiting "myPromise.$chain"
        // when the autocomplete watcher is not used
        $chainComplete(reason = "$chainComplete()") {
            if (this.$chain.isPending) {
                throw new JFACTORY_ERR_INVALID_CALL({
                    target: this,
                    reason: "Trying to complete a pending chain. Use $chainAbort() if you want to stop it."
                });
            }
            this.$chain.complete(reason, false);
            return this
        }

        $chainAutoComplete() {
            this.$chain.chainConfig.chainAutoComplete = true;
            return this
        }

        static setExpired(promise, abort, silent /*, reason*/) {
            promise.$isExpired = true;
            if (!promise.$isSettled) {
                if (promise.$type === "$thenIfExpired") {
                    promise.__onFulfilled__(promise.$chain.chainRoot.$chain.errorExpired);
                }
                else if (abort) {
                    promise.$isAborted = true;/*!silent;*/
                } else {
                    if (!silent) {
                        throw new JFACTORY_ERR_INVALID_CALL({
                            target: promise,
                            reason: "promise must be aborted or settled before setting it to expired."
                        })
                    }
                }
                promise.__resolve__(/*reason*/);
            }
        }
    }

    JFactoryPromise.DEFAULT_CONFIG = {
        chainAutoComplete: false
    };

    // ---------------------------------------------------------------------------------------------------------------------
    // JFactoryPromiseChain
    // ---------------------------------------------------------------------------------------------------------------------

    class JFactoryPromiseChain {

        constructor(chainRoot, chainId, chainName, chainConfig) {
            Object.defineProperties(this, {
                chainConfig: { value: chainConfig },
                chainRoot: { value: chainRoot },
                chainId: { value: chainId },
                chainName: { value: chainName },
                chainMap: { value: new Map },
                isCompleted: { value: false, configurable: true },
                data: { value: {} },
                __deferred__: { value: helper_deferred() }
            });
        }

        get isPending() {
            return Array.from(this.chainMap.values()).includes(false)
        }

        then(onResolve) { // => "await chain"
            this.__deferred__.done(onResolve);
            return this
        }

        complete(reason = "chain.complete()", abort) {
            let chainRoot = this.chainRoot;
            if (!chainRoot.$isExpired) {
                /*let errorExpired = */chainRoot.$chain.errorExpired = new JFACTORY_ERR_PROMISE_EXPIRED({
                    target: chainRoot,
                    reason
                });

                let map = this.chainMap;
                for (let item of map.keys()) {
                    JFactoryPromise.setExpired(item, abort/*, false, errorExpired*/);
                }

                Object.defineProperty(this, "isCompleted", { value: true });
                this.__deferred__.resolve();
            }
            return this
        }
    }

    // ---------------------------------------------------------------------------------------------------------------------
    // JFactoryPromisePath
    // ---------------------------------------------------------------------------------------------------------------------

    class JFactoryPromisePath extends Array {

        constructor() {
            super();
            for (let i of arguments) {
                if (Array.isArray(i)) {
                    this.push(...i);
                } else {
                    this.push(i);
                }
            }
        }

        get printable() {
            return this.map((v, i) => i === 0 ? v.$dev_name : v.$dev_name.split(".")[1]).join(".")
        }

        toString() {return this.printable}
    }

    // import { jFactoryBootstrap } from "../../../jFactory_1/workspace/src/indexLibs.mjs";
    // export { JFactoryPromise } from "../../../jFactory_1/workspace/src/indexLibs.mjs";

    jFactoryBootstrap(true);

    exports.JFactoryPromise = JFactoryPromise;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=JFactoryPromise-devel.umd.js.map
