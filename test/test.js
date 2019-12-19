global.window = new (require("jsdom")).JSDOM().window;
const { JFactoryPromise } = require("../dist");
const expect = require("chai").expect;

describe('JFactoryPromise', function() {
    it('should return a JFactoryPromise', async function() {
        let promise = new JFactoryPromise(
            {name: "test1"},
            function (resolve) {resolve(111)}
        );
        expect(await promise).equal(111)
    });
});