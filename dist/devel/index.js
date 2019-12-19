"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("lodash"),t=require("jquery");
/*!
 * jFactory, Copyright (c) 2019, Stéphane Plazis
 * https://github.com/jfactory-es/jfactory/blob/master/LICENSE.txt
 */
const r=!0,i="undefined"!=typeof process&&process.versions&&process.versions.node,n={TraitLog:!i||!1,JFactoryError:{keys:["$.about.name","$dev_name","$name","name","id"]},JFactoryTrace:!i&&{keys:["$dev_traceLog","$dev_traceSource"],libOptions:{offline:Boolean(globalThis.chrome),filter:function(e){return e.lineNumber}}},jFactoryDev:{requireCompatibility:{globalThis:{test:()=>globalThis,info:"https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/globalThis"},fetch:{test:()=>fetch,info:"https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch"},Request:{test:()=>Request,info:"https://developer.mozilla.org/docs/Web/API/Request"},"AbortController, AbortSignal":{test:()=>(new AbortController).signal,info:"https://developer.mozilla.org/docs/Web/API/AbortController, https://developer.mozilla.org/docs/Web/API/AbortSignal"},MutationObserver:{test:()=>MutationObserver,info:"https://developer.mozilla.org/docs/Web/API/MutationObserver"}}}},a=t,o=e.isNative,s=e.isString,c=e.isNumber,l=e.isPlainObject,u=e.lowerFirst,h=e.get,p=e.template,f=()=>{},b={seq:[],init(){if(this.seq){let e=this.seq;delete this.seq;for(let t of e)t();delete globalThis.jFactoryOverride}},onInit(e){this.seq.push(e)}};b.onInit((function(){console.warn("jFactory: RUNNING IN DEVELOPER MODE, PERFORMANCES WILL BE AFFECTED");for(let[e,t]of Object.entries(n.jFactoryDev.requireCompatibility)){let r;try{r=Boolean(t.test())}catch(e){}r||console.warn(`jFactory may require the support of "${e}", ${t.info}`)}})),b.onInit((function(){!n.TraitLog&&r&&console.warn("jFactory: LOGS REMOVED")}));class d{constructor({label:e,stackTraceLimit:t,keys:r,libOptions:i}={}){this.label=e||"The stack has been printed in the console",this.stackTraceLimit=t||1/0,this.keys=r||["stackLog","stackSource"],this.libOptions=i||{}}captureTraceSource(e,t){let r;this.stackTraceLimit&&(r=Error.stackTraceLimit,Error.stackTraceLimit=this.stackTraceLimit),e||(e="captureTraceSource",t=!0);let i={source:new Error,omitAboveFunctionName:e,omitSelf:t};return this.stackTraceLimit&&(Error.stackTraceLimit=r),i}attachTrace(e,t){"object"!=typeof t&&(t=this.captureTraceSource(t||"attachTrace",!t));let r=t.source;this.toPrintableTrace(t).then(e=>r=e);let i=()=>console.log(r)||this.label;Object.defineProperty(e,this.keys[0],{enumerable:!1,configurable:!0,get:()=>i()}),Object.defineProperty(e,this.keys[1],{enumerable:!1,configurable:!0,get:()=>t})}toPrintableTrace(e){return Promise.resolve(e.source)}}class m extends d{constructor(e){super(e)}toPrintableTrace(e){return StackTrace.fromError(e.source,this.libOptions).then(t=>{if(e.omitAboveFunctionName){let r=t.findIndex(t=>t.functionName&&t.functionName.endsWith(e.omitAboveFunctionName));r>0&&(e.omitSelf&&r++,t=t.slice(r))}return t=t.filter(this.libOptions.filter),this.formatTraceFrames(t)})}formatTraceFrames(e){let t,r;return this.libOptions.offline&&window.chrome?(t="Error\n",r="\tat "):(t="",r=""),t+e.map(e=>r+e.toString()).join("\n")}}const g={};b.onInit((function(){let e=n.JFactoryTrace;if(e&&!1!==e.use){let t;t="function"==typeof e.use?e.use:"object"==typeof StackTrace?m:(console.warn("jFactory: StackTrace lib not found, using fallback"),d),t===m&&console.warn("jFactory: Stack trace enabled; Performance will be affected"),g.tracer=new t(e)}else g.tracer={captureTraceSource:f,attachTrace:f}}));class v extends Error{constructor(e="unspecified error",t=null){t=Object.assign(Object.create(null),t),super(e=v.toPrintable(e,t)),this.$data=Object.assign(Object.create(null),t)}toString(){return this.message}*[Symbol.iterator](){yield this.message,yield this.$data}static getId(e){return e[(n.JFactoryError.keys||v.DEFAULT_KEYS).find(t=>{let r=h(e,t);return r||0===r})]}static toPrintableData(e){const t={};let r;for(let[i,n]of Object.entries(e)){switch(typeof n){case"function":n=n.name+"()";break;case"object":if(null===n){n="null";break}if(n instanceof Error){n=n.toString();break}if(void 0!==(r=v.getId(n)))n='"'+r+'"';else if(o(n.toString))try{r=JSON.stringify(n),n=r.length>v.JSON_MAX?r.substring(0,v.JSON_MAX)+"[...]":r}catch(e){n="[object "+n.constructor.name+"]"}else n=n.toString();break;case"string":n='"'+n+'"';break;default:n=String(n)}t[i]=n}return t}static toPrintable(e,t){const r=[];for(let i of e.split(";")){let e,n=v.RE_PLACEHOLDER;if(n.lastIndex=0,e=n.exec(i)){do{if(e[1]&&e[1]in t){r.push(i.trim());break}}while(null!==(e=n.exec(i)))}else r.push(i.trim())}return u(p(r.join("; "))(v.toPrintableData(t)))}}v.JSON_MAX=40,v.DEFAULT_KEYS=["name","id"],v.RE_PLACEHOLDER=/\${([^}]+)}/g;let y=new Proxy(v,{set:function(e,t,r){let{template:i}=r;if(e[t])throw new Error("already declared");return e[t]=class extends v{constructor(e,t){super(i,e),g.tracer.attachTrace(this.$data,t)}},e[t].prototype.name="Error jFactoryError."+t,!0}});function $(e,t){if(!new.target)return new $(e,t);this.label=e,this.value=t}y.INVALID_VALUE={template:"invalid value for ${target}; Reason: ${reason}; Given: ${given}"},y.INVALID_CALL={template:"invalid call ${target}; Reason: ${reason}; Owner: ${owner}"},y.PROMISE_EXPIRED={template:"expired promise ${target}; Reason: ${reason}"},y.REQUEST_ERROR={template:"error requesting ${target}; Reason: ${reason}; Owner: ${owner}"},y.KEY_DUPLICATED={template:"duplicated key for ${target}; Given: ${given}"},y.KEY_MISSING={template:"missing key for ${target}; Given: ${given}"};const E=function(e,t,r){throw new y.INVALID_VALUE({target:e,reason:r,given:t})},O={notUndefined:(e,t)=>(void 0===t&&E(e,t,"cannot be undefined"),!0),notEmptyString:(e,t)=>(""===t&&E(e,t,"cannot be empty string"),!0),notFalsy:(e,t)=>(t||E(e,t,'cannot be a falsy value (undefined, null, NaN, 0, "")'),!0),validSpaces:(e,t)=>(t.replace&&t.replace(/\s+/g," ").trim()===t||E(e,t,"invalid space delimiters"),!0),matchReg:(e,t,r)=>(r.test(t)||E(e,t,'string "'+t+'" must match '+r),!0),type(e,t,...r){let i,n=!1;for(let a of r){null===a?i="Null":"name"in a&&(i=a.name);let r=O["type"+i];if(r)try{n=r(e,t)}catch(e){}else n=t instanceof a;if(n)break}return n||E(e,t,"must be an instance of ["+r.map(e=>e.name).join(", ")+"]"),!0},typeNull:(e,t)=>(null!==t&&E(e,t,"must be null"),!0),typeBoolean:(e,t)=>(!0!==t&&!1!==t&&E(e,t,"must be a boolean"),!0),typeString:(e,t)=>(s(t)||E(e,t,"must be a string"),!0),typeNumber:(e,t)=>(c(t)||E(e,t,"must be a number"),!0),typeFunction:(e,t)=>("function"!=typeof t&&E(e,t,"must be a function"),!0),typePlainObject:(e,t)=>(l(t)||E(e,t,"must be a plain object"),!0),equal(e,t,...r){let i=!1;for(let e of r)if(i=t===e)break;return i||E(e,t,"must be one of ["+r+"]"),!0},equalIn:(e,t,r)=>(Array.isArray(r)||(r=Object.values(r)),r.includes(t)||E(e,t,"must be one from ["+r.join(", ")+"]"),!0),properties(e,t,r){for(let i of Object.getOwnPropertyNames(t))$(e+', property name "'+i+'"',i).equalIn(r);return!0},writable:(e,t,r)=>(Object.getOwnPropertyDescriptor(t,r).writable||E(e,t,"must be writable"),!0),notWritable:(e,t,r)=>(Object.getOwnPropertyDescriptor(t,r).writable&&E(e,t,"must not be writable"),!0),enumerable:(e,t,r)=>(Object.prototype.propertyIsEnumerable.call(t,r)||E(e,t,"must be enumerable"),!0),notEnumerable:(e,t,r)=>(Object.prototype.propertyIsEnumerable.call(t,r)&&E(e,t,"must not be enumerable"),!0),configurable:(e,t,r)=>(Object.getOwnPropertyDescriptor(t,r).configurable||E(e,t,"must be configurable"),!0),notConfigurable:(e,t,r)=>(Object.getOwnPropertyDescriptor(t,r).configurable&&E(e,t,"must not be configurable"),!0),reservedProperty:(e,t,r)=>(r in t&&E(e,t,"is a reserved property"),!0)};b.onInit((function(){Object.assign($,O);for(const e of Object.getOwnPropertyNames(O))$.prototype[e]=function(...t){return $[e](this.label,this.value,...t),this}}));const _=()=>++_.uid;_.uid=0;class j extends Promise{constructor({name:e,config:t,traceSource:r},i){1===arguments.length&&([e,t,i]=[null,null,arguments[0]]);const n=_();let a,s;t={...j.DEFAULT_CONFIG,...t},$("name",e=e||"unnamed").type(String,Number).matchReg(/^[^. ]+$/),$("config",t).typePlainObject(),$("executor",i).typeFunction(),super((e,t)=>{a=e,s=t});const c=new w(this,n,e,t);Object.defineProperties(this,{$chain:{enumerable:!0,writable:!0,value:c},$type:{writable:!0,value:"promise"},$value:{writable:!0,value:void 0},$isSettled:{writable:!0,value:!1},$isRejected:{writable:!0,value:null},$isFulfilled:{writable:!0,value:null},$isExpired:{writable:!0,value:!1}}),Object.defineProperties(this,{$dev_name:{configurable:!0,value:e+"["+n+":0]"},$dev_path:{writable:!0,value:new P(this)},$dev_position:{writable:!0,value:0}}),o(i)||Object.defineProperties(this,{$dev_source:{value:i}}),g.tracer.attachTrace(this,r);const l=()=>{if(!this.$chain.isPending)try{this.$chainComplete("config.chainAutoComplete = true")}catch(e){console.error(e)}},u=e=>{if(!this.$isSettled){if(e===this)return void h(new TypeError("Chaining cycle detected for promise "+this.$dev_name));let t;if(null!==e&&("object"==typeof e||"function"==typeof x))try{t=e.then}catch(e){return void h(e)}if("function"==typeof t){let r=!1,i=function(e){r||(r=!0,u(e))},n=function(e){r||(r=!0,h(e))};try{t.call(e,i,n)}catch(e){r||h(e)}}else this.$isRejected=!1,this.$isFulfilled=!0,this.$isExpired&&(e=this.$chain.errorExpired),a(e),p(e)}},h=e=>{this.$isSettled||(this.$isRejected=!0,this.$isFulfilled=!1,s(e),p(e))},p=e=>{this.$value=e,this.$isSettled=!0,this.$chain.chainMap.set(this,!0),this.$chain.chainConfig.chainAutoComplete&&(1!==this.$chain.chainMap.size||this.$isExpired?l():this.then(l))};let f=t.chainAutoComplete;Object.defineProperty(t,"chainAutoComplete",{get:()=>f,set:e=>{f!==e&&(f=e,e&&l())}}),c.chainMap.set(this,!1),Object.defineProperties(this,{__resolve__:{value:u},__reject__:{value:h}});try{i(u,h)}catch(e){h(e)}}then(e,t,r){let i,n,a,s=o(e)&&!e.name.startsWith("bound ");e&&"function"==typeof e&&(i=function(r){return"await"===c&&!0===a.$isExpired&&a.$chain.errorExpired===r?t(r):a.$isSettled?void 0:e(r)}),t&&"function"==typeof t&&(n=function(e){if(!a.$isSettled)return t(e)});let c=r||(s?"await":void 0===e?"catch":"then");a=Object.assign(super.then(i,n),this),_.uid--,a.$type=c;{a.$dev_position=this.$chain.chainMap.size;let r="";e&&e.name&&(r+=e.name),t&&t.name&&(r+=","+t.name),Object.defineProperties(a,{$dev_name:{value:this.$chain.chainName+"["+this.$chain.chainId+":"+this.$dev_position+"]."+a.$type+(r?"("+r+")":"")+"["+a.$chain.chainId+":"+a.$dev_position+"]"},$dev_path:{value:new P(this.$dev_path,a)},$dev_onFulfilled:{value:e},$dev_onRejected:{value:t}})}return a.$chain.chainMap.set(a,!1),this.$isExpired&&j.forceExpire(a,this.$chain.errorExpired),a}$catchExpired(e){return this.then(t=>this.$chain.chainRoot.$isExpired?e(t):t,void 0,"$catchExpired")}static resolve(e,t){return 1===arguments.length&&([e,t]=[{},e]),e||(e={}),t instanceof this&&1===arguments.length?t:new this(e,(function(e){e(t)}))}static reject(e,t){return 1===arguments.length&&([e,t]=[{},e]),e||(e={}),new this(e,(function(e,r){r(t)}))}$toPromise(){return Promise.resolve(this)}$chainAbort(e="$chainAbort()"){return this.$chain.complete(e),this}$chainComplete(e="$chainComplete()"){return this.$chain.complete(e),this}$chainAutoComplete(){return this.$chain.chainConfig.chainAutoComplete=!0,this}static forceExpire(e,t){e.$isExpired=!0,e.$isSettled||"await"!==e.$type&&"$catchExpired"!==e.$type&&e.__resolve__(t)}}j.DEFAULT_CONFIG={chainAutoComplete:!1};class w{constructor(e,t,r,i){Object.defineProperties(this,{chainConfig:{value:i},chainRoot:{value:e},chainId:{value:t},chainName:{value:r},chainMap:{value:new Map},isCompleted:{value:!1,configurable:!0},data:{value:{}},__deferred__:{value:a.Deferred()}})}get isPending(){return Array.from(this.chainMap.values()).includes(!1)}then(e){return this.__deferred__.done(e),this}complete(e="chain.complete()"){let t=this.chainRoot;if(!t.$isExpired){let r=t.$chain.errorExpired=new y.PROMISE_EXPIRED({target:t,reason:e}),i=this.chainMap;for(let e of i.keys())j.forceExpire(e,r);Object.defineProperty(this,"isCompleted",{value:!0}),this.__deferred__.resolve()}return this}}class P extends Array{constructor(){super();for(let e of arguments)Array.isArray(e)?this.push(...e):this.push(e)}get printable(){return this.map((e,t)=>0===t?e.$dev_name:e.$dev_name.split(".")[1]).join(".")}toString(){return this.printable}}exports.JFactoryPromise=j;
//# sourceMappingURL=index.js.map
