<div align="center" markdown="1">
<img width="140" src="https://jfactory-es.github.io/jfactory/img/jFactory.png">

Promise where the <b>whole tree can be awaited, canceled and expired</b>.\
Provides synchronous status, explorable chain map, shared data, debug data and trace.

[![GitHub version](https://img.shields.io/github/package-json/v/jfactory-es/jfactory-promise.svg?label=git)](https://github.com/jfactory-es/jfactory-promise)
[![npm version](https://img.shields.io/npm/v/jfactory-promise.svg)](https://www.npmjs.com/package/jfactory-promise)

</div>

# JFactoryPromise-standalone

> Standalone: This module exports the class `JFactoryPromise` from [`jfactory`](https://www.npmjs.com/package/jfactory) into a smaller standalone package.
> ___Don't use it if you are already using the full module.___

* [Documentation [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md)
* [Source code [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/src/JFactoryPromise.mjs)

### Overview

```html
<script src="https://cdn.jsdelivr.net/npm/lodash/lodash.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jfactory-promise@1.7.7-beta.2/dist/JFactoryPromise-devel.umd.js"></script>
<script>
    const { JFactoryPromise } = jFactoryModule;
    let myPromise, a, b;

    // --- Await the whole tree ---

    (async function() {
        myPromise = JFactoryPromise.resolve('ok');
        a = myPromise.then(h).then(h);
        b = myPromise.then(h).then(h);
        // will expire the chain as soon as no more promises are pending:          
        myPromise.$chainAutoComplete();
        // wait for all promises         
        await myPromise.$chain;
        console.log("done");
        // chain expired, new handlers not called (passthrough):
        myPromise.then(h);
        a.then(h);
        b.then(h).then(h);
    })();

    // --- Abort the whole tree ---

    myPromise = JFactoryPromise.resolve('hello');
    a = myPromise.then(h);
    b = myPromise.then(h).then(h);
    // abort the whole tree, handlers not called:
    myPromise.$chainAbort("canceled !");
    // chain expired, new handlers not called (passthrough):
    myPromise.then(h);
    a.then(h);
    b.then(h).then(h);

    // handler
    function h(value) {/*console.log(value);*/return value}

</script>
```

### Install

```shell script
npm add lodash
npm add jfactory-promise
```

The package uses `lodash` as a peer dependency to maximize optimizations with your project (so you need to install it manually).
> See also [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash) to reduce the size of lodash.


### Automatic import

```javascript
const { JFactoryPromise } = require ("jfactory-promise");
import { JFactoryPromise } from "jfactory-promise";
```
The package will automatically switch between `development` and `production` based 
on the value of `process.env.NODE_ENV`. [Webpack automatically configures it](https://webpack.js.org/guides/production/#specify-the-mode). 

### Manual import:

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
