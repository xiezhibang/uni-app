(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/recommend/write_address"],{"0151":function(e,t,o){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s,a=function(){return Promise.all([o.e("common/vendor"),o.e("components/Winglau14-lotusAddress/Winglau14-lotusAddress")]).then(o.bind(null,"7cf8"))},i={data:function(){return{canSave:!0,positionInfo:"",lotusAddressData:{visible:!1,provinceName:"",cityName:"",townName:""},region:"",phone:"",uname:"",uaddress:""}},onLoad:function(){s=this,e.getLocation({type:"wgs84",geocode:!0,success:function(e){s.getCurrentSite(e.longitude,e.latitude)},fail:function(){}})},onShow:function(){s=this;try{var t=e.getStorageSync("user_address");""!=t&&(s.uname=t.uname,s.phone=t.uphone,s.uaddress=t.uaddress,s.uname=t.uname,s.uname=t.uname,s.lotusAddressData.provinceName=t.uProvince,s.lotusAddressData.cityName=t.uCity,s.lotusAddressData.townName=t.uTown,s.region=t.uProvince+" "+t.uCity+" "+t.uTown)}catch(o){}},components:{"lotus-address":a},methods:{getCurrentSite:function(t,o){e.request({url:"https://restapi.amap.com/v3/geocode/regeo?output=json&location="+t+","+o+"&key=f37d49f85f46c59af0ee84115b6c1f3c&radius=0&extensions=all",method:"POST",success:function(e){console.log(n(e," at pages\\recommend\\write_address.vue:84")),"OK"==e.data.info&&(s.lotusAddressData.provinceName=e.data.regeocode.addressComponent.province,s.lotusAddressData.townName=e.data.regeocode.addressComponent.district,s.lotusAddressData.cityName=e.data.regeocode.addressComponent.city,s.lotusAddressData.cityName instanceof Array&&(s.lotusAddressData.cityName=e.data.regeocode.addressComponent.district,s.lotusAddressData.townName=""))},fail:function(e){},complete:function(e){}})},openPicker:function(){this.lotusAddressData.visible=!0},choseValue:function(e){console.log(n(e," at pages\\recommend\\write_address.vue:114")),s.lotusAddressData.visible=e.visible,e.isChose&&(s.lotusAddressData.provinceName=e.province,s.lotusAddressData.cityName=e.city,s.lotusAddressData.townName=e.town,s.region="".concat(e.province," ").concat(e.city," ").concat(e.town))},saveAddress:function(){if(""!=s.uname.trim())if(s.checkPhone(s.phone))if(""!=s.region.trim())if(""!=s.uaddress.trim()){var t={uname:s.uname,uphone:s.phone,uProvince:s.lotusAddressData.provinceName,uCity:s.lotusAddressData.cityName,uTown:s.lotusAddressData.townName,uaddress:s.uaddress};try{e.setStorageSync("user_address",t)}catch(o){}e.navigateBack({delta:1})}else s.showTips("请填写详细地址");else s.showTips("请选择省市区");else s.showTips("手机号格式不正确");else s.showTips("请填写收货人")},showTips:function(t){e.showToast({title:t,icon:"none"})},chooseLocationFun:function(){e.chooseLocation({success:function(e){console.log(n(e," at pages\\recommend\\write_address.vue:176")),s.positionInfo=e.address}})}}};t.default=i}).call(this,o("6e42")["default"],o("0de9")["default"])},"0757":function(e,t,o){"use strict";var n=o("e564"),s=o.n(n);s.a},"5cf1":function(e,t,o){"use strict";o.r(t);var n=o("81d5"),s=o("643e");for(var a in s)"default"!==a&&function(e){o.d(t,e,function(){return s[e]})}(a);o("0757");var i=o("2877"),r=Object(i["a"])(s["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports},"643e":function(e,t,o){"use strict";o.r(t);var n=o("0151"),s=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,function(){return n[e]})}(a);t["default"]=s.a},"81d5":function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement,o=(e._self._c,e.getImgSrc("tuijian/tj11.png"));e.$mp.data=Object.assign({},{$root:{m0:o}})},s=[];o.d(t,"a",function(){return n}),o.d(t,"b",function(){return s})},a448:function(e,t,o){"use strict";(function(e){o("bc76"),o("921b");n(o("66fd"));var t=n(o("5cf1"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("6e42")["createPage"])},e564:function(e,t,o){}},[["a448","common/runtime","common/vendor"]]]);