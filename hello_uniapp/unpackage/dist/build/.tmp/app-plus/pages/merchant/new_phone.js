(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/merchant/new_phone"],{"231e":function(e,t,n){"use strict";(function(e){n("bc76"),n("921b");o(n("66fd"));var t=o(n("e5c0"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},5895:function(e,t,n){},b731:function(e,t,n){"use strict";(function(e,n){var o,i;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{storeId:0,phone1:"",phone2:"",showNext:!1,canGet:!0,canGet2:!0,time1:60,loginInfo:{},code1:"",code2:"",timeBack:3,okTip:!1}},onLoad:function(e){o=this,void 0!=e.phone&&void 0!=e.id&&(o.phone1=e.phone,o.storeId=e.id);var t=this.checkLogin("../index/index","2");if(!t)return!1;this.loginInfo=t},components:{},methods:{getCodeOne:function(t){var n="";if(1==t)n=o.phone1;else{if(n=o.phone2,n==o.phone1)return void o.tipMsg("请绑定新的手机号");if(!o.checkPhone(n))return}e.request({url:o.$httpUrl+"index.php/api/store/sendcodemess",method:"POST",data:{mobile:n,scene:13},success:function(t){e.showToast({title:t.data.msg,icon:"none"}),1==t.data.status&&(o.canGet=!1,o.canGet2=!1,o.timeDown())},fail:function(e){},complete:function(e){}})},updatePhone:function(t){var i="",a="",c=o.$httpUrl+"index.php/api/store/bindmobile";if(1==t)i=o.code1,a=o.phone1;else{if(i=o.code2,a=o.phone2,c=o.$httpUrl+"index.php/api/store/bindnewmobile",a==o.phone1)return void o.tipMsg("请绑定新的手机号");if(!o.checkPhone(a))return}""!=i.trim()?(console.log(n(o.storeId," at pages\\merchant\\new_phone.vue:160")),e.request({url:c,method:"POST",data:{code:i,mobile:a,storeid:o.storeId},success:function(i){if(console.log(n(i," at pages\\merchant\\new_phone.vue:171")),1==i.data.status)if(1==t)o.showNext=!0;else{o.okTip=!0;var a=setInterval(function(){o.timeBack=o.timeBack-1,o.timeBack<1&&(clearInterval(a),e.navigateBack({delta:1}))},1e3)}else e.showToast({title:i.data.msg,icon:"none"})},fail:function(e){},complete:function(e){}})):o.tipMsg("请输入验证码")},timeDown:function(){clearInterval(i),o.time1=60,i=setInterval(function(){o.time1=o.time1-1,o.time1<1&&(clearInterval(i),o.canGet=!0,o.canGet2=!0,o.time1=60)},1e3)}}};t.default=a}).call(this,n("6e42")["default"],n("0de9")["default"])},be14:function(e,t,n){"use strict";var o=n("5895"),i=n.n(o);i.a},e5c0:function(e,t,n){"use strict";n.r(t);var o=n("fd7e"),i=n("f945");for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);n("be14");var c=n("2877"),r=Object(c["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=r.exports},f945:function(e,t,n){"use strict";n.r(t);var o=n("b731"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=i.a},fd7e:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return i})}},[["231e","common/runtime","common/vendor"]]]);