(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/merchant/cashier_code"],{"149b":function(t,e,n){"use strict";var o=n("492f"),c=n.n(o);c.a},"2d49":function(t,e,n){"use strict";(function(t,n){var o;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c={data:function(){return{openSettingBtnHidden:!0,storeId:0,shopInfo:{qrcode:"",storeinfo:{backgroundimg:"",storename:"",id:""}}}},components:{},onLoad:function(t){o=this,void 0!=t.id&&(o.storeId=t.id,o.getEwm())},methods:{handleSetting:function(t){t.detail.authSetting["scope.writePhotosAlbum"]?o.openSettingBtnHidden=!0:o.openSettingBtnHidden=!1},getEwm:function(){t.request({url:o.$httpUrl+"index.php/api/Store/getStoreqrcode",method:"POST",data:{storeid:o.storeId},success:function(e){console.log(n(e," at pages\\merchant\\cashier_code.vue:93")),1==e.data.status?o.shopInfo=e.data.result:t.showToast({icon:"none",title:e.data.msg})},fail:function(t){},complete:function(t){}})},saveEwm:function(e){t.getSetting({success:function(e){e.authSetting["scope.writePhotosAlbum"]?o.saveImgToLocal():t.authorize({scope:"scope.writePhotosAlbum",success:function(){o.saveImgToLocal()},fail:function(){o.openSettingBtnHidden=!1}})}})},saveImgToLocal:function(e){t.showModal({title:"提示",content:"确定保存到相册吗",success:function(e){e.confirm?t.downloadFile({url:o.shopInfo.qrcode,success:function(e){200===e.statusCode&&t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(){t.showToast({title:"保存成功",icon:"none"})},fail:function(){t.showToast({title:"保存失败",icon:"none"})}})}}):e.cancel}})}}};e.default=c}).call(this,n("6e42")["default"],n("0de9")["default"])},4405:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return c})},"492f":function(t,e,n){},8435:function(t,e,n){"use strict";n.r(e);var o=n("2d49"),c=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=c.a},cca1:function(t,e,n){"use strict";n.r(e);var o=n("4405"),c=n("8435");for(var i in c)"default"!==i&&function(t){n.d(e,t,function(){return c[t]})}(i);n("149b");var a=n("2877"),u=Object(a["a"])(c["default"],o["a"],o["b"],!1,null,null,null);e["default"]=u.exports},d9c5:function(t,e,n){"use strict";(function(t){n("bc76"),n("921b");o(n("66fd"));var e=o(n("cca1"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])}},[["d9c5","common/runtime","common/vendor"]]]);