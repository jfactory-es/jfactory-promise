<div align="center" markdown="1">
<img width="140" src="https://jfactory-es.github.io/jfactory/img/jFactory.png">

Promise where the <b>whole tree can be awaited, canceled and expired</b>.\
Provides synchronous status, explorable chain map, shared data, debug data and trace.

[![GitHub version](https://img.shields.io/github/package-json/v/jfactory-es/jfactory-promise.svg?label=git)](https://github.com/jfactory-es/jfactory-promise)
[![npm version](https://img.shields.io/npm/v/jfactory-promise.svg)](https://www.npmjs.com/package/jfactory-promise)

</div>

# JFactoryPromise-standalone

> Standalone: This module exports the class `JFactoryPromise` from [`jfactory`](https://www.npmjs.com/package/jfactory) into a stand-alone package.
> ___Don't use it if you are already using the full module.___

* [Documentation [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md)
* [Source code [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/src/JFactoryPromise.mjs)

### Install

```shell script
npm add lodash
npm add jfactory-promise
```


### Automatic import

```javascript
const { JFactoryPromise } = require ("jfactory-promise");
import { JFactoryPromise } from "jfactory-promise";
```
The package will automatically switch between `development` and `production` based 
on the value of `process.env.NODE_ENV`. [Webpack automatically configures it](https://webpack.js.org/guides/production/#specify-the-mode). 

###Manual import:

#### Force development module 
```javascript
const { JFactoryPromise } = require ("jfactory-promise/dist/JFactoryPromise-devel.umd.js")
import { JFactoryPromise } from "jfactory-promise/dist/JFactory-devel.umd.js";
```

#### Force production module 
```javascript
const { JFactoryPromise } = require ("jfactory-promise/dist/JFactoryPromise.umd.js")
import { JFactoryPromise } from "jfactory-promise/dist/JFactoryPromise.umd.js";
```

## Documentation

* [Usages [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md#usages)
* [Documentation [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md)
