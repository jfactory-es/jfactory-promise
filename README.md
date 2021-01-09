# JFactoryPromise Standalone Package

Improved Promise where the whole tree can be awaited and canceled, with status, explorable chain map, shared data, debug data and trace.

* [Documentation [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md)
* [Source code [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/src/JFactoryPromise.mjs)

## Standalone

This module exports the class `JFactoryPromise` from the library [`jfactory`](https://www.npmjs.com/package/jfactory) into a small stand-alone package. 

If you are already using the full library in your application, or if you need more Classes from [jFactory](https://github.com/jfactory-es/jfactory), use [`jfactory`](https://www.npmjs.com/package/jfactory) instead. 

<!--
## Importation

Because [`jFactory`](https://github.com/jfactory-es/jfactory) is a web application library, `JFactoryPromise` uses jQuery and lodash.
-->
```shell script
npm add jfactory-promise
```

#### Development 
```javascript
const { JFactoryPromise } = require ("jfactory-promise/devel")
```

#### Production 
```javascript
const { JFactoryPromise } = require ("jfactory-promise")
```

## Documentation

* [Usages [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md#usages)
* [Documentation [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md)
