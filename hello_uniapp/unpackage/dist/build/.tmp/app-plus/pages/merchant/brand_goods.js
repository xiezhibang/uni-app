(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/merchant/brand_goods"],{1460:function(o,t,e){"use strict";(function(o){e("bc76"),e("921b");n(e("66fd"));var t=n(e("8a72"));function n(o){return o&&o.__esModule?o:{default:o}}o(t.default)}).call(this,e("6e42")["createPage"])},"1c45":function(o,t,e){"use strict";var n=function(){var o=this,t=o.$createElement,e=(o._self._c,o.getImgSrc("back/back2.png")),n=o.getImgSrc("shangjia/sj1.png"),a=o.getImgSrc("shangjia/sj15.png");o.$mp.data=Object.assign({},{$root:{m0:e,m1:n,m2:a}})},a=[];e.d(t,"a",function(){return n}),e.d(t,"b",function(){return a})},"5f88":function(o,t,e){"use strict";(function(o,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,s=function(){return Promise.all([e.e("common/vendor"),e.e("components/yq-avatar/yq-avatar")]).then(e.bind(null,"aae0"))},i={data:function(){return{listIsFree:!1,storeId:0,goods:[],showAddWindow:!1,goodsName:"",goodsPrice:"",imgSrc:""}},components:{avatar:s},onLoad:function(t){a=this,void 0!=t.id&&(console.log(o(t.id," at pages\\merchant\\brand_goods.vue:91")),a.storeId=t.id,a.getShopInfo())},methods:{removeGoods:function(t){var e=t.currentTarget.dataset.id;console.log(o(t," at pages\\merchant\\brand_goods.vue:100")),""!=e&&n.showModal({title:"提示",content:"确认删除该商品吗？",success:function(t){t.confirm?n.request({url:a.$httpUrl+"index.php/api/store/delgoods",method:"POST",data:{goods_id:1*e},success:function(t){console.log(o(e," at pages\\merchant\\brand_goods.vue:115")),console.log(o(t," at pages\\merchant\\brand_goods.vue:116")),1==t.data.status?a.getShopInfo():n.showToast({icon:"none",title:t.data.msg})},fail:function(o){},complete:function(o){}}):t.cancel}})},myUpload:function(t){console.log(o(t," at pages\\merchant\\brand_goods.vue:143")),a.imgSrc=t.path,a.upImg(t.path)},upImg:function(o){n.uploadFile({url:a.$httpUrl+"index.php/Api/Store/uploadImgFile",filePath:o,name:"image",formData:{names:"image",dirs:"shopSet"},success:function(o){var t=JSON.parse(o.data);"1"==t.status?a.imgSrc=t.result.result[0]:n.showToast({icon:"none",title:t.msg})},fail:function(o){},complete:function(o){}})},addGoods:function(t){if(a.showAddWindow=!1,1==t){if(""==a.imgSrc.trim())return void a.tipMsg("请上传商品图片");if(""==a.goodsName.trim())return void a.tipMsg("请填写商品名字");if(""==a.goodsPrice.trim())return void a.tipMsg("请填写商品价格");n.request({url:a.$httpUrl+"index.php/api/store/addStoregood",method:"POST",data:{goods_name:a.goodsName,original_img:a.imgSrc,shop_price:1*a.goodsPrice,storeid:a.storeId},success:function(t){console.log(o(a.storeId," at pages\\merchant\\brand_goods.vue:211")),console.log(o(t," at pages\\merchant\\brand_goods.vue:212")),1==t.data.status?(n.showToast({icon:"none",title:"添加成功"}),a.getShopInfo()):n.showToast({icon:"none",title:t.data.msg})},fail:function(o){},complete:function(o){}})}},showAddBox:function(){a.showAddWindow=!a.showAddWindow},getShopInfo:function(){n.request({url:a.$httpUrl+"index.php/api/store/getStoregoods",method:"POST",data:{storeid:a.storeId},success:function(t){console.log(o(t," at pages\\merchant\\brand_goods.vue:254")),1==t.data.status?a.goods=t.data.result:n.showToast({icon:"none",title:t.data.msg}),a.goods.length<=0?a.listIsFree=!0:a.listIsFree=!1},fail:function(o){},complete:function(o){}})},backBeforePage:function(){n.navigateBack({delta:1})}}};t.default=i}).call(this,e("0de9")["default"],e("6e42")["default"])},"8a72":function(o,t,e){"use strict";e.r(t);var n=e("1c45"),a=e("c32f");for(var s in a)"default"!==s&&function(o){e.d(t,o,function(){return a[o]})}(s);e("f82e");var i=e("2877"),r=Object(i["a"])(a["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports},c32f:function(o,t,e){"use strict";e.r(t);var n=e("5f88"),a=e.n(n);for(var s in n)"default"!==s&&function(o){e.d(t,o,function(){return n[o]})}(s);t["default"]=a.a},f6cc:function(o,t,e){},f82e:function(o,t,e){"use strict";var n=e("f6cc"),a=e.n(n);a.a}},[["1460","common/runtime","common/vendor"]]]);