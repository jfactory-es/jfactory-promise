# JFactoryPromise Standalone Package

Provides an ES6 Promise class extended from native Promise, where the whole chain can be awaited, completed, expired and cancelled (aborted). Also supports properties such as status, explorable chain map, shared data, debug data and trace.

* [Documentation [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md)
* [Source code [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/src/JFactoryPromise.mjs)

## Standalone

This module exports the class `JFactoryPromise` from the library [`jfactory`](https://www.npmjs.com/package/jfactory) into a small stand-alone package. 

If you are already using the full jFactory library in your application, or if you need more Classes from [jFactory](https://github.com/jfactory-es/jfactory), use [`jfactory`](https://www.npmjs.com/package/jfactory) instead. 

## Importation

Because [`jFactory`](https://github.com/jfactory-es/jfactory) is a web application library, JFactoryPromise uses jQuery and lodash.

```shell script
npm add lodash jquery 
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

#### Documentation

* [Usages [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md#usages)
* [Documentation [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/docs/JFactoryPromise.md)

## Contributing

Thank you to everyone who takes the time to share their comments, bug reports and fixes. If you have any questions, feel free to create an [issue](https://github.com/jfactory-es/jfactory-promise/issues).
