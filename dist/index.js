"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("lodash"),t=require("jquery");
/*!
 * jFactory, Copyright (c) 2019, Stéphane Plazis
 * https://github.com/jfactory-es/jfactory/blob/master/LICENSE.txt
 */
const i="undefined"!=typeof process&&process.versions&&process.versions.node,r={TraitLog:!1,JFactoryError:{keys:["$.about.name","$dev_name","$name","name","id"]},JFactoryTrace:!1,jFactoryDev:!1},n=t,a=e.isNative,s=e.lowerFirst,o=e.get,c=e.template,l=()=>{},h={seq:[],init(){if(this.seq){let e=this.seq;delete this.seq;for(let t of e)t();delete globalThis.jFactoryOverride}},onInit(e){this.seq.push(e)}};h.onInit((function(){i&&console.warn("jFactory: LOGS REMOVED")}));const u={};h.onInit((function(){u.tracer={captureTraceSource:l,attachTrace:l}}));class d extends Error{constructor(e="unspecified error",t=null){t=Object.assign(Object.create(null),t),super(e=d.toPrintable(e,t)),this.$data=Object.assign(Object.create(null),t)}toString(){return this.message}*[Symbol.iterator](){yield this.message,yield this.$data}static getId(e){return e[(r.JFactoryError.keys||d.DEFAULT_KEYS).find(t=>{let i=o(e,t);return i||0===i})]}static toPrintableData(e){const t={};let i;for(let[r,n]of Object.entries(e)){switch(typeof n){case"function":n=n.name+"()";break;case"object":if(null===n){n="null";break}if(n instanceof Error){n=n.toString();break}if(void 0!==(i=d.getId(n)))n='"'+i+'"';else if(a(n.toString))try{i=JSON.stringify(n),n=i.length>d.JSON_MAX?i.substring(0,d.JSON_MAX)+"[...]":i}catch(e){n="[object "+n.constructor.name+"]"}else n=n.toString();break;case"string":n='"'+n+'"';break;default:n=String(n)}t[r]=n}return t}static toPrintable(e,t){const i=[];for(let r of e.split(";")){let e,n=d.RE_PLACEHOLDER;if(n.lastIndex=0,e=n.exec(r)){do{if(e[1]&&e[1]in t){i.push(r.trim());break}}while(null!==(e=n.exec(r)))}else i.push(r.trim())}return s(c(i.join("; "))(d.toPrintableData(t)))}}d.JSON_MAX=40,d.DEFAULT_KEYS=["name","id"],d.RE_PLACEHOLDER=/\${([^}]+)}/g;let p=new Proxy(d,{set:function(e,t,i){let{template:r}=i;return e[t]=class extends d{constructor(e,t){super(r,e),u.tracer.attachTrace(this.$data,t)}},e[t].prototype.name="Error jFactoryError."+t,!0}});p.INVALID_VALUE={template:"invalid value for ${target}; Reason: ${reason}; Given: ${given}"},p.INVALID_CALL={template:"invalid call ${target}; Reason: ${reason}; Owner: ${owner}"},p.PROMISE_EXPIRED={template:"expired promise ${target}; Reason: ${reason}"},p.REQUEST_ERROR={template:"error requesting ${target}; Reason: ${reason}; Owner: ${owner}"},p.KEY_DUPLICATED={template:"duplicated key for ${target}; Given: ${given}"},p.KEY_MISSING={template:"missing key for ${target}; Given: ${given}"};const f=()=>++f.uid;f.uid=0;class $ extends Promise{constructor({name:e,config:t,traceSource:i},r){1===arguments.length&&([e,t,r]=[null,null,arguments[0]]);const n=f();let a,s;t={...$.DEFAULT_CONFIG,...t},e=e||"unnamed",super((e,t)=>{a=e,s=t});const o=new m(this,n,e,t);Object.defineProperties(this,{$chain:{enumerable:!0,writable:!0,value:o},$type:{writable:!0,value:"promise"},$value:{writable:!0,value:void 0},$isSettled:{writable:!0,value:!1},$isRejected:{writable:!0,value:null},$isFulfilled:{writable:!0,value:null},$isExpired:{writable:!0,value:!1}});const c=()=>{if(!this.$chain.isPending)try{this.$chainComplete("config.chainAutoComplete = true")}catch(e){console.error(e)}},l=e=>{if(!this.$isSettled){if(e===this)return void h(new TypeError("Chaining cycle detected for promise "+this.$dev_name));let t;if(null!==e&&("object"==typeof e||"function"==typeof x))try{t=e.then}catch(e){return void h(e)}if("function"==typeof t){let i=!1,r=function(e){i||(i=!0,l(e))},n=function(e){i||(i=!0,h(e))};try{t.call(e,r,n)}catch(e){i||h(e)}}else this.$isRejected=!1,this.$isFulfilled=!0,this.$isExpired&&(e=this.$chain.errorExpired),a(e),u(e)}},h=e=>{this.$isSettled||(this.$isRejected=!0,this.$isFulfilled=!1,s(e),u(e))},u=e=>{this.$value=e,this.$isSettled=!0,this.$chain.chainMap.set(this,!0),this.$chain.chainConfig.chainAutoComplete&&(1!==this.$chain.chainMap.size||this.$isExpired?c():this.then(c))};let d=t.chainAutoComplete;Object.defineProperty(t,"chainAutoComplete",{get:()=>d,set:e=>{d!==e&&(d=e,e&&c())}}),o.chainMap.set(this,!1),Object.defineProperties(this,{__resolve__:{value:l},__reject__:{value:h}});try{r(l,h)}catch(e){h(e)}}then(e,t,i){let r,n,s,o=a(e)&&!e.name.startsWith("bound ");e&&"function"==typeof e&&(r=function(i){return"await"===c&&!0===s.$isExpired&&s.$chain.errorExpired===i?t(i):s.$isSettled?void 0:e(i)}),t&&"function"==typeof t&&(n=function(e){if(!s.$isSettled)return t(e)});let c=i||(o?"await":void 0===e?"catch":"then");return s=Object.assign(super.then(r,n),this),f.uid--,s.$type=c,s.$chain.chainMap.set(s,!1),this.$isExpired&&$.forceExpire(s,this.$chain.errorExpired),s}$catchExpired(e){return this.then(t=>this.$chain.chainRoot.$isExpired?e(t):t,void 0,"$catchExpired")}static resolve(e,t){return 1===arguments.length&&([e,t]=[{},e]),e||(e={}),t instanceof this&&1===arguments.length?t:new this(e,(function(e){e(t)}))}static reject(e,t){return 1===arguments.length&&([e,t]=[{},e]),e||(e={}),new this(e,(function(e,i){i(t)}))}$toPromise(){return Promise.resolve(this)}$chainAbort(e="$chainAbort()"){return this.$chain.complete(e),this}$chainComplete(e="$chainComplete()"){return this.$chain.complete(e),this}$chainAutoComplete(){return this.$chain.chainConfig.chainAutoComplete=!0,this}static forceExpire(e,t){e.$isExpired=!0,e.$isSettled||"await"!==e.$type&&"$catchExpired"!==e.$type&&e.__resolve__(t)}}$.DEFAULT_CONFIG={chainAutoComplete:!1};class m{constructor(e,t,i,r){Object.defineProperties(this,{chainConfig:{value:r},chainRoot:{value:e},chainId:{value:t},chainName:{value:i},chainMap:{value:new Map},isCompleted:{value:!1,configurable:!0},data:{value:{}},__deferred__:{value:n.Deferred()}})}get isPending(){return Array.from(this.chainMap.values()).includes(!1)}then(e){return this.__deferred__.done(e),this}complete(e="chain.complete()"){let t=this.chainRoot;if(!t.$isExpired){let i=t.$chain.errorExpired=new p.PROMISE_EXPIRED({target:t,reason:e}),r=this.chainMap;for(let e of r.keys())$.forceExpire(e,i);Object.defineProperty(this,"isCompleted",{value:!0}),this.__deferred__.resolve()}return this}}exports.JFactoryPromise=$;
