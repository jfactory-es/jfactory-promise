/*!
 * JFactoryPromise v1.7.7-beta
 * http://github.com/jfactory-es/jfactory-promise
 * (c) 2019-2021, Stéphane Plazis, http://github.com/jfactory-es/jfactory-promise/blob/master/LICENSE.txt
 */
import e from"lodash";r("JFACTORY_ENV_CLI")??("object"==typeof process&&"object"==typeof process.versions&&process.versions.node),r("JFACTORY_ENV_REPL")??function(){const e=["cdpn.io","fiddle.jshell.net","null.jsbin.com","jsitor.com","jseditor.io","liveweave.com","run.plnkr.co","playcode.io"];try{e.indexOf(new URL(document.location.href).hostname)}catch{}}(),r("JFACTORY_ENV_LOG"),r("JFACTORY_ENV_TRACE");const t=r("JFACTORY_ENV_BOOT")??!0,i=function(e,t){void 0===n[e]?(n[e]=Object.assign({},t,globalThis[e]),delete globalThis[e]):void 0!==t&&(n[e]=!1!==t&&Object.assign(n[e],t));return n[e]},n={};function r(e){let t=globalThis[e];return delete globalThis[e],t}const s=e.lowerFirst,o=e.get,a=e.template,l=()=>{},c=function(e){return"function"==typeof e&&-1!==Function.prototype.toString.call(e).indexOf("[native code]")};class h{constructor(){this._done=[],this._fail=[]}execute(e){for(let t of e)t();this.fulfilled=!0}resolve(){this.execute(this._done)}reject(){this.execute(this._fail)}done(e){this.fulfilled?e():this._done.push(e)}fail(e){this.fulfilled?e():this._fail.push(e)}}let u=[];let d,f=!1;d={captureTraceSource:l,attachTrace:l};const p=d;i("JFACTORY_CFG_JFactoryTrace");class $ extends Error{constructor(e="unspecified error",t=null){t=Object.assign(Object.create(null),t),super(e=$.toPrintable(e,t)),this.$data=Object.assign(Object.create(null),t)}toString(){return this.message}*[Symbol.iterator](){yield this.message,yield this.$data}static getId(e){return e[g.keys.find((t=>{let i=o(e,t);return i||0===i}))]}static toPrintableData(e){const t={};let i;for(let[n,r]of Object.entries(e)){switch(typeof r){case"function":r=r.name+"()";break;case"object":if(null===r){r="null";break}if(r instanceof Error){r=r.toString();break}if(void 0!==(i=$.getId(r)))r='"'+i+'"';else if(c(r.toString))try{i=JSON.stringify(r),r=i.length>g.jsonMax?i.substring(0,g.jsonMax)+"[...]":i}catch(e){r="[object "+r.constructor.name+"]"}else r=r.toString();break;case"string":r='"'+r+'"';break;default:r=String(r)}t[n]=r}return t}static toPrintable(e,t){const i=[];for(let n of e.split(";")){let e,r=g.reg_placeholder;if(r.lastIndex=0,e=r.exec(n)){do{if(e[1]&&e[1]in t){i.push(n.trim());break}}while(null!==(e=r.exec(n)))}else i.push(n.trim())}return s(a(i.join("; "))($.toPrintableData(t)))}static factory(e,t){let i={[e]:class extends ${constructor(e,i){super(t,e),p.attachTrace(this.$data,i)}}}[e];return i.prototype.name="Error JFACTORY_ERR_"+e,i}}const _=$.factory,b=_("INVALID_CALL","invalid call ${target}; Reason: ${reason}; Owner: ${owner}"),m=_("PROMISE_EXPIRED","expired promise ${target}; Reason: ${reason}"),g=i("JFACTORY_CFG_JFactoryError",{reg_placeholder:/\${([^}]+)}/g,jsonMax:40,keys:["$.about.name","$dev_name","$name","name","id"]}),v=()=>++v.uid;v.uid=0;class y extends Promise{constructor({name:e,config:t,traceSource:i},n){1===arguments.length&&([e,t,n]=[null,null,arguments[0]]);const r=v();let s,o;t={...y.DEFAULT_CONFIG,...t},e=e||"unnamed",super(((e,t)=>{s=e,o=t}));const a=new E(this,r,e,t);Object.defineProperties(this,{$chain:{enumerable:!0,writable:!0,value:a},$type:{writable:!0,value:"promise"},$value:{writable:!0,value:void 0},$isSettled:{writable:!0,value:!1},$isRejected:{writable:!0,value:null},$isFulfilled:{writable:!0,value:null},$isExpired:{writable:!0,value:!1},$isAborted:{writable:!0,value:!1}});const l=()=>{if(!this.$chain.isPending)try{this.$chainComplete("auto-completed")}catch(e){console.error(e)}},c=e=>{if(!this.$isSettled){if(e===this)return void h(new TypeError("Chaining cycle detected for promise "+this.$dev_name));let t;if(null!==e&&("object"==typeof e||"function"==typeof e))try{t=e.then}catch(e){return void h(e)}if("function"==typeof t){let i=!1,n=function(e){i||(i=!0,c(e))},r=function(e){i||(i=!0,h(e))};try{t.call(e,n,r)}catch(e){i||h(e)}}else this.$isRejected=!1,this.$isFulfilled=!0,this.$isExpired&&(e=this.$chain.errorExpired),s(e),u(e)}},h=e=>{this.$isSettled||(this.$isRejected=!0,this.$isFulfilled=!1,o(e),u(e))},u=e=>{this.$value=e,this.$isSettled=!0,this.$chain.chainMap.set(this,!0),this.$chain.chainConfig.chainAutoComplete&&(1!==this.$chain.chainMap.size||this.$isExpired?l():this.then(l))};let d=t.chainAutoComplete;Object.defineProperty(t,"chainAutoComplete",{get:()=>d,set:e=>{d!==e&&(d=e,e&&l())}}),a.chainMap.set(this,!1),Object.defineProperties(this,{__resolve__:{value:c},__reject__:{value:h}});try{n(c,h)}catch(e){h(e)}}then(e,t,i){let n,r,s,o=i||(c(e)&&!e.name.startsWith("bound ")&&c(t)&&!t.name.startsWith("bound ")?"await":void 0===e?"catch":"then");return e&&"function"==typeof e&&(n=function(i){return"await"===o?s.$isAborted?t(s.$chain.errorExpired):e(i):s.$isExpired?void 0:(s.$isSettled,e(i))}),t&&"function"==typeof t&&(r=function(e){return s.$isSettled,t(e)}),s=Object.assign(super.then(n,r),this),v.uid--,s.$type=o,Object.defineProperties(s,{__onFulfilled__:{value:e},__onRejected__:{value:t}}),s.$chain.chainMap.set(s,!1),this.$isExpired&&y.setExpired(s,this.$isAborted,!0),s}static resolve(e,t){return 1===arguments.length&&([e,t]=[{},e]),e||(e={}),t instanceof this&&1===arguments.length?t:new this(e,(function(e){e(t)}))}static reject(e,t){return 1===arguments.length&&([e,t]=[{},e]),e||(e={}),new this(e,(function(e,i){i(t)}))}$thenIfExpired(e){return this.then((t=>this.$chain.chainRoot.$isExpired?e(t):t),void 0,"$thenIfExpired")}$chainAbort(e="$chainAbort()"){return this.$chain.complete(e,!0),this}$chainComplete(e="$chainComplete()"){if(this.$chain.isPending)throw new b({target:this,reason:"Trying to complete a pending chain. Use $chainAbort() if you want to stop it."});return this.$chain.complete(e,!1),this}$chainAutoComplete(){return this.$chain.chainConfig.chainAutoComplete=!0,this}static setExpired(e,t,i){if(e.$isExpired=!0,!e.$isSettled){if("$thenIfExpired"===e.$type)e.__onFulfilled__(e.$chain.chainRoot.$chain.errorExpired);else if(t)e.$isAborted=!0;/*!silent;*/else if(!i)throw new b({target:e,reason:"promise must be aborted or settled before setting it to expired."});e.__resolve__()}}}y.DEFAULT_CONFIG={chainAutoComplete:!1};class E{constructor(e,t,i,n){Object.defineProperties(this,{chainConfig:{value:n},chainRoot:{value:e},chainId:{value:t},chainName:{value:i},chainMap:{value:new Map},isCompleted:{value:!1,configurable:!0},data:{value:{}},__deferred__:{value:new h}})}get isPending(){return Array.from(this.chainMap.values()).includes(!1)}then(e){return this.__deferred__.done(e),this}complete(e="chain.complete()",t){let i=this.chainRoot;if(!i.$isExpired){i.$chain.errorExpired=new m({target:i,reason:e});let n=this.chainMap;for(let e of n.keys())y.setExpired(e,t);Object.defineProperty(this,"isCompleted",{value:!0}),this.__deferred__.resolve()}return this}}!function(e){if(!f){if(e&&!t)return;!function(){if(u){for(let e of u)e();u=null}}(),f=!0}}(!0);export{y as JFactoryPromise};
