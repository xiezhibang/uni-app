(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/u-parse/components/wxParseTemplate3"],{"0fcc":function(e,n,t){"use strict";t.r(n);var r=t("7d6f"),a=t("d434");for(var o in a)"default"!==o&&function(e){t.d(n,e,function(){return a[e]})}(o);var u=t("2877"),s=Object(u["a"])(a["default"],r["a"],r["b"],!1,null,null,null);n["default"]=s.exports},"7d6f":function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return r}),t.d(n,"b",function(){return a})},d434:function(e,n,t){"use strict";t.r(n);var r=t("d871"),a=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,function(){return r[e]})}(o);n["default"]=a.a},d871:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=function(){return t.e("components/u-parse/components/wxParseTemplate4").then(t.bind(null,"acc9"))},a=function(){return t.e("components/u-parse/components/wxParseImg").then(t.bind(null,"1fef"))},o=function(){return t.e("components/u-parse/components/wxParseVideo").then(t.bind(null,"c4c9"))},u=function(){return t.e("components/u-parse/components/wxParseAudio").then(t.bind(null,"42ee"))},s={name:"wxParseTemplate3",props:{node:{}},components:{wxParseTemplate:r,wxParseImg:a,wxParseVideo:o,wxParseAudio:u},methods:{wxParseATap:function(e){var n=e.currentTarget.dataset.href;if(n){var t=this.$parent;while(!t.preview||"function"!==typeof t.preview)t=t.$parent;t.navigate(n,e)}}}};n.default=s}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/u-parse/components/wxParseTemplate3-create-component',
    {
        'components/u-parse/components/wxParseTemplate3-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("0fcc"))
        })
    },
    [['components/u-parse/components/wxParseTemplate3-create-component']]
]);
