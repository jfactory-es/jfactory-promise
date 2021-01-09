const jsdom = require("jsdom");
const expect = require("chai").expect;

global.window = new jsdom.JSDOM().window;
global.document = window.document;

process.env.NODE_ENV = "development";

const JFactoryPromise = require("../dist");

describe('JFactoryPromise', function() {

    it('should return a JFactoryPromise', async function() {
        let promise = new JFactoryPromise.JFactoryPromise(
            { name: "test" },
            function (resolve) { resolve(111) }
        );
        expect(await promise).equal(111)
    });

    // todo
});