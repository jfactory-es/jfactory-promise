const jsdom = require("jsdom");
const expect = require("chai").expect;

global.window = new jsdom.JSDOM().window;
global.document = window.document;

const JFactoryPromise_prod = require("../dist");
const JFactoryPromise_devel = require("../dist/devel");

describe('JFactoryPromise', function() {

    it('should return a JFactoryPromise (prod)', async function() {
        let promise = new JFactoryPromise_prod.JFactoryPromise(
            { name: "test" },
            function (resolve) { resolve(111) }
        );
        expect(await promise).equal(111)
    });

    it('should return a JFactoryPromise (devel)', async function() {
        let promise = new JFactoryPromise_devel.JFactoryPromise(
            { name: "test" },
            function (resolve) { resolve(111) }
        );
        expect(await promise).equal(111)
    });

    // todo
});