import{r as u}from"./index.DhYZZe0J.js";function v(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var _={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=u,i=Symbol.for("react.element"),m=Symbol.for("react.fragment"),y=Object.prototype.hasOwnProperty,c=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function l(r,e,p){var t,o={},s=null,f=null;p!==void 0&&(s=""+p),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(f=e.ref);for(t in e)y.call(e,t)&&!d.hasOwnProperty(t)&&(o[t]=e[t]);if(r&&r.defaultProps)for(t in e=r.defaultProps,e)o[t]===void 0&&(o[t]=e[t]);return{$$typeof:i,type:r,key:s,ref:f,props:o,_owner:c.current}}n.Fragment=m;n.jsx=l;n.jsxs=l;_.exports=n;var E=_.exports;export{v as g,E as j};
