(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{5789:function(t,n,e){},"6e2f":function(t,n,e){"use strict";e.r(n);var o=e("d52b"),u=e.n(o);for(var c in o)"default"!==c&&function(t){e.d(n,t,function(){return o[t]})}(c);n["default"]=u.a},b45b:function(t,n,e){"use strict";e.r(n);var o=e("6e2f");for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);e("d161");var c,r,a=e("2877"),i=Object(a["a"])(o["default"],c,r,!1,null,null,null);n["default"]=i.exports},ba04:function(t,n,e){"use strict";(function(t,n){e("bc76"),e("921b");var o=c(e("66fd")),u=c(e("b45b"));function c(t){return t&&t.__esModule?t:{default:t}}function r(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},o=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.forEach(function(n){a(t,n,e[n])})}return t}function a(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var i=function(){return e.e("components/toprow").then(e.bind(null,"8cae"))},l=function(){return e.e("components/toprow2").then(e.bind(null,"b3ec"))},f=function(){return e.e("components/rateShow").then(e.bind(null,"9fc9"))},p=function(){return e.e("components/noData").then(e.bind(null,"d7aa"))},d=function(){return e.e("components/loading").then(e.bind(null,"ad8d"))};o.default.component("toprow",i),o.default.component("toprow2",l),o.default.component("rateShow",f),o.default.component("noData",p),o.default.component("loading",d),o.default.config.productionTip=!1,o.default.prototype.$httpUrl="https://www.jfcma.com/",o.default.prototype.getImgSrc=function(t){return"https://www.jfcma.com/public/images/jfcm/"+t},o.default.prototype.checkLogin=function(n,e){try{var o=t.getStorageSync("u_id"),u=t.getStorageSync("u_token"),c=t.getStorageSync("u_name"),r=t.getStorageSync("u_head"),a=t.getStorageSync("u_openid");return""==o||""==u||""==r?(t.redirectTo({url:"../login/login?backpage="+n+"&backtype="+e}),!1):{uid:o,token:u,name:c,head:r,openid:a}}catch(i){return!1}},o.default.prototype.tipMsg=function(n,e,o,u){n=void 0==n?"系统繁忙":n,e=void 0==e?1500:e,o=void 0==o?"none":o,u=void 0!=u&&u,t.showToast({title:n,icon:o,mask:u,duration:e})},o.default.prototype.checkPhone=function(n){return!!/^1[23456789]\d{9}$/.test(n)||(t.showToast({title:"手机号格式不正确",icon:"none"}),!1)},u.default.mpType="app";var s=new o.default(r({},u.default));n(s).$mount()}).call(this,e("6e42")["default"],e("6e42")["createApp"])},d161:function(t,n,e){"use strict";var o=e("5789"),u=e.n(o);u.a},d52b:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={onLaunch:function(){console.log(t("App Launch"," at App.vue:4"))},onShow:function(){console.log(t("App Show"," at App.vue:34"))},onHide:function(){console.log(t("App Hide"," at App.vue:37"))}};n.default=e}).call(this,e("0de9")["default"])}},[["ba04","common/runtime","common/vendor"]]]);