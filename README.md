# JFactoryPromise Standalone Package

Provides an ES6 Promise Class extended from native Promise, where the whole chain can be Awaited, Completed, Expired and Cancelled (Aborted). Also supports properties such as status, explorable chain map, shared data, debug data and trace.

```javascript
npm add jfactory-promise
```

* [Documentation [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/doc/JFactoryPromise.md)
* [Source code [redirects to jFactory]](https://github.com/jfactory-es/jfactory/blob/master/src/JFactoryPromise.mjs)

## Standalone

This module exports the class `JFactoryPromise` from the package `jfactory-es` into smaller bundles compiled for development and production. 

This package is for stand-alone use. If you are already importing `jfactory-es` in your application, or if you need more Classes from jFactory, use the full package instead. 

Because jFactory is a web application library, JFactoryPromise uses jQuery and lodash. See how to configure the [external dependencies](https://github.com/jfactory-es/jfactory/blob/master/doc/ref-import.md#external-dependencies).

## Importation

#### Development 
```javascript
const { JFactoryPromise } = require ("jfactory-promise/devel")
import { JFactoryPromise } from "jfactory-promise/devel"
```

#### Production 
```javascript
const { JFactoryPromise } = require ("jfactory-promise")
import { JFactoryPromise } from "jfactory-promise"
```

## Contributing

Thank you to everyone who takes the time to share their comments, bug reports and fixes. If you have any questions, feel free to create an [issue](https://github.com/jfactory-es/jfactory-promise/issues).
