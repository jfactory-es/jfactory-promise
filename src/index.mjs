import { jFactoryBootstrap } from "../../../jFactory_1/workspace/src/jFactory-bootstrap";
export { JFactoryPromise } from "../../../jFactory_1/workspace/src/JFactoryPromise";

if (typeof jFactoryOverride === "undefined" || !jFactoryOverride) {
    jFactoryBootstrap();
}