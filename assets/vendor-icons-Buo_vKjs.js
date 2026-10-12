function ot(c){return c&&c.__esModule&&Object.prototype.hasOwnProperty.call(c,"default")?c.default:c}var H={exports:{}},o={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var W;function ut(){if(W)return o;W=1;var c=Symbol.for("react.transitional.element"),f=Symbol.for("react.portal"),y=Symbol.for("react.fragment"),_=Symbol.for("react.strict_mode"),C=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),w=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),A=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),X=Symbol.for("react.activity"),Q=Symbol.for("react.view_transition"),O=Symbol.iterator;function V(t){return t===null||typeof t!="object"?null:(t=O&&t[O]||t["@@iterator"],typeof t=="function"?t:null)}var P={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},I=Object.assign,L={};function v(t,e,n){this.props=t,this.context=e,this.refs=L,this.updater=n||P}v.prototype.isReactComponent={},v.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")},v.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Y(){}Y.prototype=v.prototype;function M(t,e,n){this.props=t,this.context=e,this.refs=L,this.updater=n||P}var $=M.prototype=new Y;$.constructor=M,I($,v.prototype),$.isPureReactComponent=!0;var b=Array.isArray;function x(){}var i={H:null,A:null,T:null,S:null},q=Object.prototype.hasOwnProperty;function S(t,e,n){var r=n.ref;return{$$typeof:c,type:t,key:e,ref:r!==void 0?r:null,props:n}}function J(t,e){return S(t.type,e,t.props)}function N(t){return typeof t=="object"&&t!==null&&t.$$typeof===c}function F(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var U=/\/+/g;function j(t,e){return typeof t=="object"&&t!==null&&t.key!=null?F(""+t.key):e.toString(36)}function tt(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(x,x):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function E(t,e,n,r,u){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"bigint":case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case c:case f:a=!0;break;case T:return a=t._init,E(a(t._payload),e,n,r,u)}}if(a)return u=u(t),a=r===""?"."+j(t,0):r,b(u)?(n="",a!=null&&(n=a.replace(U,"$&/")+"/"),E(u,e,n,"",function(rt){return rt})):u!=null&&(N(u)&&(u=J(u,n+(u.key==null||t&&t.key===u.key?"":(""+u.key).replace(U,"$&/")+"/")+a)),e.push(u)),1;a=0;var d=r===""?".":r+":";if(b(t))for(var p=0;p<t.length;p++)r=t[p],s=d+j(r,p),a+=E(r,e,n,s,u);else if(p=V(t),typeof p=="function")for(t=p.call(t),p=0;!(r=t.next()).done;)r=r.value,s=d+j(r,p++),a+=E(r,e,n,s,u);else if(s==="object"){if(typeof t.then=="function")return E(tt(t),e,n,r,u);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return a}function k(t,e,n){if(t==null)return t;var r=[],u=0;return E(t,r,"","",function(s){return e.call(n,s,u++)}),r}function et(t){if(t._status===-1){var e=t._result,n=e();n.then(function(r){(t._status===0||t._status===-1)&&(t._status=1,t._result=r,n.status===void 0&&(n.status="fulfilled",n.value=r))},function(r){(t._status===0||t._status===-1)&&(t._status=2,t._result=r,n.status===void 0&&(n.status="rejected",n.reason=r))}),t._status===-1&&(t._status=0,t._result=n)}if(t._status===1)return t._result.default;throw t._result}var z=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function D(t){var e=i.T,n={};n.types=e!==null?e.types:null,i.T=n;try{var r=t(),u=i.S;u!==null&&u(n,r),typeof r=="object"&&r!==null&&typeof r.then=="function"&&r.then(x,z)}catch(s){z(s)}finally{e!==null&&n.types!==null&&(e.types=n.types),i.T=e}}function G(t){var e=i.T;if(e!==null){var n=e.types;n===null?e.types=[t]:n.indexOf(t)===-1&&n.push(t)}else D(G.bind(null,t))}var nt={map:k,forEach:function(t,e,n){k(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return k(t,function(){e++}),e},toArray:function(t){return k(t,function(e){return e})||[]},only:function(t){if(!N(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};return o.Activity=X,o.Children=nt,o.Component=v,o.Fragment=y,o.Profiler=C,o.PureComponent=M,o.StrictMode=_,o.Suspense=A,o.ViewTransition=Q,o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,o.__COMPILER_RUNTIME={__proto__:null,c:function(t){return i.H.useMemoCache(t)}},o.addTransitionType=G,o.cache=function(t){return function(){return t.apply(null,arguments)}},o.cacheSignal=function(){return null},o.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var r=I({},t.props),u=t.key;if(e!=null)for(s in e.key!==void 0&&(u=""+e.key),e)!q.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(r[s]=e[s]);var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){for(var a=Array(s),d=0;d<s;d++)a[d]=arguments[d+2];r.children=a}return S(t.type,u,r)},o.createContext=function(t){return t={$$typeof:w,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:h,_context:t},t},o.createElement=function(t,e,n){var r,u={},s=null;if(e!=null)for(r in e.key!==void 0&&(s=""+e.key),e)q.call(e,r)&&r!=="key"&&r!=="__self"&&r!=="__source"&&(u[r]=e[r]);var a=arguments.length-2;if(a===1)u.children=n;else if(1<a){for(var d=Array(a),p=0;p<a;p++)d[p]=arguments[p+2];u.children=d}if(t&&t.defaultProps)for(r in a=t.defaultProps,a)u[r]===void 0&&(u[r]=a[r]);return S(t,s,u)},o.createRef=function(){return{current:null}},o.forwardRef=function(t){return{$$typeof:R,render:t}},o.isValidElement=N,o.lazy=function(t){return{$$typeof:T,_payload:{_status:-1,_result:t},_init:et}},o.memo=function(t,e){return{$$typeof:g,type:t,compare:e===void 0?null:e}},o.startTransition=D,o.unstable_useCacheRefresh=function(){return i.H.useCacheRefresh()},o.use=function(t){return i.H.use(t)},o.useActionState=function(t,e,n){return i.H.useActionState(t,e,n)},o.useCallback=function(t,e){return i.H.useCallback(t,e)},o.useContext=function(t){return i.H.useContext(t)},o.useDebugValue=function(){},o.useDeferredValue=function(t,e){return i.H.useDeferredValue(t,e)},o.useEffect=function(t,e){return i.H.useEffect(t,e)},o.useEffectEvent=function(t){return i.H.useEffectEvent(t)},o.useId=function(){return i.H.useId()},o.useImperativeHandle=function(t,e,n){return i.H.useImperativeHandle(t,e,n)},o.useInsertionEffect=function(t,e){return i.H.useInsertionEffect(t,e)},o.useLayoutEffect=function(t,e){return i.H.useLayoutEffect(t,e)},o.useMemo=function(t,e){return i.H.useMemo(t,e)},o.useOptimistic=function(t,e){return i.H.useOptimistic(t,e)},o.useReducer=function(t,e,n){return i.H.useReducer(t,e,n)},o.useRef=function(t){return i.H.useRef(t)},o.useState=function(t){return i.H.useState(t)},o.useSyncExternalStore=function(t,e,n){return i.H.useSyncExternalStore(t,e,n)},o.useTransition=function(){return i.H.useTransition()},o.version="19.3.0",o}var Z;function st(){return Z||(Z=1,H.exports=ut()),H.exports}var m=st();const wt=ot(m);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=c=>c.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ct=c=>c.replace(/^([A-Z])|[\s-_]+(\w)/g,(f,y,_)=>_?_.toUpperCase():y.toLowerCase()),B=c=>{const f=ct(c);return f.charAt(0).toUpperCase()+f.slice(1)},K=(...c)=>c.filter((f,y,_)=>!!f&&f.trim()!==""&&_.indexOf(f)===y).join(" ").trim(),at=c=>{for(const f in c)if(f.startsWith("aria-")||f==="role"||f==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ft={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=m.forwardRef(({color:c="currentColor",size:f=24,strokeWidth:y=2,absoluteStrokeWidth:_,className:C="",children:h,iconNode:w,...R},A)=>m.createElement("svg",{ref:A,...ft,width:f,height:f,stroke:c,strokeWidth:_?Number(y)*24/Number(f):y,className:K("lucide",C),...!h&&!at(R)&&{"aria-hidden":"true"},...R},[...w.map(([g,T])=>m.createElement(g,T)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=(c,f)=>{const y=m.forwardRef(({className:_,...C},h)=>m.createElement(pt,{ref:h,iconNode:f,className:K(`lucide-${it(B(c))}`,`lucide-${c}`,_),...C}));return y.displayName=B(c),y};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],At=l("activity",lt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],gt=l("arrow-up-right",yt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Mt=l("check",_t);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],$t=l("copy",dt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],xt=l("cpu",ht);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],St=l("external-link",vt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]],Nt=l("github",Et);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],jt=l("house",mt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],Ht=l("mail",Ct);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],Ot=l("terminal",Rt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Pt=l("x",Tt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],It=l("zap",kt);export{gt as A,Mt as C,St as E,Nt as G,jt as H,Ht as M,wt as R,Ot as T,Pt as X,It as Z,m as a,$t as b,xt as c,At as d,st as r};
