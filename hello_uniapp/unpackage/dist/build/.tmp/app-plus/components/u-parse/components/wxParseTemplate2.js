(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/u-parse/components/wxParseTemplate2"],{6538:function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement;e._self._c},o=[];t.d(n,"a",function(){return r}),t.d(n,"b",function(){return o})},9138:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=function(){return t.e("components/u-parse/components/wxParseTemplate3").then(t.bind(null,"0fcc"))},o=function(){return t.e("components/u-parse/components/wxParseImg").then(t.bind(null,"1fef"))},a=function(){return t.e("components/u-parse/components/wxParseVideo").then(t.bind(null,"c4c9"))},u=function(){return t.e("components/u-parse/components/wxParseAudio").then(t.bind(null,"42ee"))},c={name:"wxParseTemplate2",props:{node:{}},components:{wxParseTemplate:r,wxParseImg:o,wxParseVideo:a,wxParseAudio:u},methods:{wxParseATap:function(e){var n=e.currentTarget.dataset.href;if(n){var t=this.$parent;while(!t.preview||"function"!==typeof t.preview)t=t.$parent;t.navigate(n,e)}}}};n.default=c},"9c17":function(e,n,t){"use strict";t.r(n);var r=t("9138"),o=t.n(r);for(var a in r)"default"!==a&&function(e){t.d(n,e,function(){return r[e]})}(a);n["default"]=o.a},e4fc:function(e,n,t){"use strict";t.r(n);var r=t("6538"),o=t("9c17");for(var a in o)"default"!==a&&function(e){t.d(n,e,function(){return o[e]})}(a);var u=t("2877"),c=Object(u["a"])(o["default"],r["a"],r["b"],!1,null,null,null);n["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/u-parse/components/wxParseTemplate2-create-component',
    {
        'components/u-parse/components/wxParseTemplate2-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("e4fc"))
        })
    },
    [['components/u-parse/components/wxParseTemplate2-create-component']]
]);
