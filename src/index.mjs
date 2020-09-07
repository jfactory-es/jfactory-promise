import { jFactoryLoader } from "../../../jFactory_1/workspace/src/jFactory-loader";
export { JFactoryPromise } from "../../../jFactory_1/workspace/src/JFactoryPromise.mjs";

if (typeof jFactoryOverride === "undefined" || !jFactoryOverride) {
    jFactoryLoader.init();
}