# JFactoryPromise Standalone Package

Improved Promise where the whole tree can be awaited and canceled, with status, explorable chain map, shared data, debug data and trace.

* [Documentation [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md)
* [Source code [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/src/JFactoryPromise.mjs)

## Standalone

This module exports the class `JFactoryPromise` from the library [`jfactory`](https://www.npmjs.com/package/jfactory) into a small stand-alone package. 

If you are already using the full library in your application, or if you need more Classes from [jFactory](https://github.com/jfactory-es/jfactory), use [`jfactory`](https://www.npmjs.com/package/jfactory) instead. 

```shell script
npm add jfactory-promise
```

#### Import
```javascript
const { JFactoryPromise } = require ("jfactory-promise")
```
The package will automatically switch between `development` and `production` based 
on the value of `process.env.NODE_ENV`. [Webpack automatically configures it](https://webpack.js.org/guides/production/#specify-the-mode). 



#### Force development module 
```javascript
const { JFactoryPromise } = require ("jfactory-promise/dist/JFactory-devel.umd.js")
```

#### Force production module 
```javascript
const { JFactoryPromise } = require ("jfactory-promise/dist/JFactory.umd.js")
```

## Documentation

* [Usages [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md#usages)
* [Documentation [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md)
