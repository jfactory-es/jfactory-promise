const jsdom = require("jsdom");
const expect = require("chai").expect;

global.window = new jsdom.JSDOM().window;
global.document = window.document;

const { JFactoryPromise } = require("../dist");

describe('JFactoryPromise', function() {
    it('should return a JFactoryPromise', async function() {
        let promise = new JFactoryPromise(
            {name: "test1"},
            function (resolve) {resolve(111)}
        );
        expect(await promise).equal(111)
    });
});