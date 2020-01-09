<template>
	<view class="index_page">
		
		<!-- 点击右上角三个点时的遮罩 -->
		<view v-if="isShowShadow" @click="homeShare" class="more_panel_box" @touchmove.prevent>
			<view class="moreTodo">
				<view class="todo_item" @click.stop="homeShare(0)"><image mode="widthFix" :src="getImgSrc('home/home13.png')"></image>扫码付款</view>
				<view class="todo_item" @click.stop="homeShare(1)"><image mode="widthFix" :src="getImgSrc('home/home14.png')"></image>收藏</view>
				<view class="todo_item" @click.stop="homeShare(2)"><image mode="widthFix" :src="getImgSrc('home/home15.png')"></image>活动券</view>
			</view>
		</view>
		
		<view class="head_out">
			
			<view class="title_padding"></view>
			
			<view class="index_search_box">
				<view class="site_box">
					
					<view class="location_box centerObj" @click="goChangeCity">
						<image :src="getImgSrc('home/home10.png')" mode="widthFix"></image>
						{{city_name}}
					</view>
					
				</view>
				<view class="search_box">
					
					<view class="search_box_inner">
						<image @click="searchShop" :src="getImgSrc('home/home11.png')" mode="widthFix" class="floatObj"></image>
						<input confirm-type="搜索" @confirm="searchShop" v-model="searchWord" type="text" placeholder="请输入关键字" />
					</view>
					
				</view>
				<view class="more_box" @click="homeShare"><image :src="getImgSrc('home/home12.png')" mode="widthFix" class="centerObj"></image></view>
			</view>
		</view>
		
		<view class="top_free">
			<view class="ad_swiper_box">
				<swiper class="swiper_com"  :autoplay="true" :circular="true" :interval="4000" :duration="1000">
					
					<block v-for="item of adList" :key="item.ad_id">
						<swiper-item class="swiper_item_com">
							<view class="swiper-item"><image class="baseObj" :src="item.ad_code" mode="widthFix"></view>
						</swiper-item>
					</block>
					
				</swiper>
			</view>
		</view>
		
		<!-- 菜单面板 -->
		<view class="list_box">
			
				<block v-for="(item,index) of typeList" :key="index">
					<view class="list_item" @click="goTypePage" :data-name="item.name" :data-id="item.id" :data-index="index">
						<image :src="item.logo"></image>
						<view>{{item.name}}</view>
					</view>
				</block>
				
		</view>
		
		<!-- 列表栏目 -->
		<view class="list_tool_box">
			<view @click="changeToolList(index)" class="tool_item" :class="{tool_active : atIndex == index}" v-for="(tool,index) in toolArray" :key="tool.id">
				{{tool.name}}
				<view class="img_wrap" v-if="tool.name.length <= 4">
					<image class="img_tl" :class="{img_ac : atIndex == index}" :src="getImgSrc('home/home5.png')" mode="widthFix"></image>
					<image class="img_tl" :class="{img_ac : atIndex != index}" :src="getImgSrc('home/home4.png')" mode="widthFix"></image>
				</view>
			</view>
			
			<!-- 选择面板 -->
			<block v-for="(itObj,itId) of toolArray" :key="itId">
				<view class="tool_panel" v-if="atIndex != null && atIndex == itId">
					<block v-for="(itOpt,itIndex) of itObj.list" :key="itIndex">
						<radio-group name="radio_wrap">
							<view class="tool_option" @click="changeType(itIndex,itId,itOpt.val,itOpt.name)">
								{{itOpt.name}}
								<radio v-if="itId == 0" :value="itOpt.val" color="#803ACE" :checked="itIndex == currentIndex1"/>
								<radio v-if="itId == 1" :value="itOpt.val" color="#803ACE" :checked="itIndex == currentIndex2"/>
								<radio v-if="itId == 2" :value="itOpt.val" color="#803ACE" :checked="itIndex == currentIndex3"/>
								<radio v-if="itId == 3" :value="itOpt.val" color="#803ACE" :checked="itIndex == currentIndex4"/>
								<radio v-if="itId == 4" :value="itOpt.val" color="#803ACE" :checked="itIndex == currentIndex5"/>
							</view>
						</radio-group>
					</block>
				</view>
			</block>
			
		</view>
		<!-- 商品列表 -->
		<view class="goods_list_box">
			
			<block v-for="item of shopList" :key="item.id">
					
					<view class="goods_item" @click="goDetail(item.id)">
						<view class="goods_img">
							<image :src="item.logo" mode="widthFix"></image>
						</view>
						<view class="goodsDetail">
							<view class="gd_wrap centerObj">
								<view class="gd_name">{{item.storename}}</view>
								<view class="gd_evaluate"><view class="shop_star"><rateShow :num='item.service_rank'></rateShow></view>{{Math.round( item.distance / 100) / 10}}km</view>
								<view class="gd_price"><view class="red_percent">分润比例：{{item.rates}}%</view><view class="shop_tag" v-if="item.name != ''">{{item.name}}</view>￥<text>{{item.avgmoney}}</text></view>
							</view>
						</view>
					</view>
					
			</block>
			
			<noData v-if="listIsFree"></noData>
			
			<view class="tipLoadLine" v-if="showLoadTip">加载中...</view>
			
			<!-- 遮罩 -->
			<view class="goodsShadow" v-if="shadowLayer" @click="hideLayer"></view>
		</view>
		
	</view>
</template>

<script>
	
	import area from '../../common/area.js'
	var areaList = area.cityArr;
	var isLoadInterFace = false;
	var cityStr = "广州市";
	var _self;
	
	export default {
		data() {
			return {
				listIsFree:false,
				showLoadTip:false,
				//纬度
				longitude:113.316444,
				//经度
				latitude:23.126825,
				//搜索
				searchWord:"",
				//城市定位
				city_name:"广州市",
				//是否遮罩商品
				shadowLayer:false,
				//轮播图
				adList:[],
				//分类列表
				typeList:[],
				//首页店铺列表
				shopList:[],
				currentPage:1,
				totalPage:1,
				isLast:true,
				toolArray:[
					{
						name:"分类",
						id:"0",
						list:[]
					},
					{
						name:"附近",
						id:"1",
						list:[
							{
								name:"不限",
								val:"-1"
							},{
								name:"500m",
								val:"1"
							},{
								name:"1000m",
								val:"2"
							},{
								name:"2000m",
								val:"3"
							},{
								name:"5000m",
								val:"4"
							}
						]
					},
					{
						name:"区域",
						id:"2",
						list:[]
					},
					{
						name:"排序",
						id:"3",
						list:[
							{
								name:"默认",
								val:"-1"
							},{
								name:"分润高优先",
								val:"1"
							},{
								name:"距离近优先",
								val:"2"
							},{
								name:"好评高优先",
								val:"3"
							},{
								name:"人均低优先",
								val:"4"
							},{
								name:"人均高优先",
								val:"5"
							}
						]
					},
					{
						name:"筛选",
						id:"4",
						list:[
							{
								name:"红包",
								val:"1"
							},{
								name:"满减",
								val:"2"
							},{
								name:"闲置",
								val:"3"
							},{
								name:"价格区间20-50",
								val:"4"
							},{
								name:"价格区间50-100",
								val:"5"
							},{
								name:"价格区间100以上",
								val:"6"
							}
						]
					},
				],
				atIndex:null,
				isShowShadow:false,
				currentIndex1:-1,
				currentIndex2:-1,
				currentIndex3:-1,
				currentIndex4:-1,
				currentIndex5:-1,
				type1:null,
				type2:null,
				type3:null,
				type4:null,
				type5:null
			}
		},
		onPullDownRefresh() {
			_self = this;
			//console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();
				_self.searchWord = "";
				_self.atIndex=null,
				_self.isShowShadow=false,
				_self.shadowLayer = false;
				_self.searchShop();
				_self.beginOnload();
			}, 1000);
		},
		onShow() {
			_self = this;
			
			uni.getStorage({
				key: 'city',
				success: function (res) {
					if(res.data.cityName != cityStr){
						cityStr = res.data.cityName;
						_self.city_name = cityStr;
						setTimeout(function(){
							_self.updateCityArea();
						},500);
					}
				},fail(){
					
				}
			})
			
		},
		onReachBottom() {
			this.nextPage();
		},
		onShareAppMessage() {
			return {
				title: "来和我一起Get新技能吧！",
				path: '/pages/index/index',
				imageUrl:'http://www.jfcma.com/public/images/jfcm/logo.png'
			}
		},
		onLoad(opt) {
			_self=this;
			
			uni.getNetworkType({
			    success: function (res) {
					if(res.networkType == "none"){
						uni.showModal({
						    title: '提示',
							showCancel:false,
							confirmText:"知道了",
						    content: '请连接网络后再试！',
						    success: function (res) {
						        
						    }
						});
					}
			    }
			});
			
			uni.removeStorage({
				key: 'city',
				success: function (res) {
					//console.log('success');
				}
			});
			
			uni.getLocation({
				type: 'wgs84',
				geocode:true,
				success: function (res) {
					_self.latitude = res.latitude;
					_self.longitude = res.longitude;
					_self.getCurrentSite(res.longitude,res.latitude);
				},fail() {
					_self.tipMsg("地址信息获取失败请手动选择");
					_self.updateCityArea();
					
				},complete(){
					_self.shopList = [];
					_self.loadShopList(1);
				}
			});
			
			this.beginOnload();
			
		},
		onPageScroll : function(e) { //nvue暂不支持滚动监听，可用bindingx代替
		   
		},
		methods: {
			//根据经纬度拿到当前省市区
			getCurrentSite(lng,lat){
				uni.request({
				    url:"https://restapi.amap.com/v3/geocode/regeo?output=json&location="+lng+","+lat+"&key=f37d49f85f46c59af0ee84115b6c1f3c&radius=0&extensions=all", 
					method:"POST",
				    success: (res) => {
						//console.log(res);
						if(res.data.info == "OK"){
							cityStr = res.data.regeocode.addressComponent.city;
							if(cityStr instanceof Array){
								cityStr = res.data.regeocode.addressComponent.province;
							}
							_self.city_name = cityStr;
							_self.updateCityArea();
							
						}
					 
				      
				    },fail: (e) => {
						_self.tipMsg("地址信息获取失败请手动选择");
						_self.updateCityArea();
				    },complete: (e) => {
						
				    }
				});
			},
			//去店铺详情页
			goDetail(id){
				uni.navigateTo({
					url:"/pages/shop/shop_detail?id="+id
				})
			},
			//去店铺列表页
			goTypePage(e){
				
				var tag = e.currentTarget.dataset;
				var obj={
					id:tag.id,
					index:tag.index,
					name:tag.name,
					city:_self.city_name,
					longitude:_self.longitude,
					latitude:_self.latitude
				};
				
				uni.navigateTo({
					url:'/pages/shop/shop_list?item='+JSON.stringify(obj)
				})
				
			},
			//初始化
			initProp(flag){
				isLoadInterFace = false;
				_self.currentPage = 1;
				_self.isLast = true;
				_self.shopList = [];
				if(flag){
					_self.currentIndex1 = -1;
					_self.currentIndex2 = -1;
					_self.currentIndex3 = -1;
					_self.currentIndex4 = -1;
					_self.currentIndex5 = -1;
					_self.type1 = null;
					_self.type2 = null;
					_self.type3 = null;
					_self.type4 = null;
					_self.type5 = null;
					_self.toolArray[0].name = "分类";
					_self.toolArray[1].name = "附近";
					_self.toolArray[2].name = "区域";
					_self.toolArray[3].name = "排序";
					_self.toolArray[4].name = "筛选";
				}
			},
			//搜索
			searchShop(){
				_self.initProp(true);
				_self.loadShopList(1,_self.searchWord);
			},
			//加载店铺
			loadShopList(page,search,prop1,prop2,prop3,prop4,prop5){
				let pageIndex = page;
				var dataObj={
					limit:10,
					page:pageIndex,
					lat:_self.latitude,
					lng:_self.longitude
				};
				if(search != undefined && search.trim() != ""){
					dataObj.keyword = search;
				}
				if(prop1 != undefined && prop1 != null && prop1 != -1){
					dataObj.cat_id = prop1;
				}
				if(prop2 != undefined && prop2 != null && prop2 != -1){
					dataObj.distance = prop2;
				}
				if(prop3 != undefined && prop3 != null && prop3 != "-1"){
					dataObj.districts = prop3;
				}
				if(prop4 != undefined && prop4 != null && prop4 != -1){
					dataObj.sort = prop4;
				}
				if(prop5 != undefined && prop5 != null && prop5 != -1){
					dataObj.type = prop5;
				}
				
				//console.log(dataObj);
				//加载首页店铺列表
				uni.request({
				    url: _self.$httpUrl+'index.php/api/index/getstoremess', 
					method:"POST",
					data:dataObj,
				    success: (res) => {
				        //console.log(res);
						
						var dataRes = res.data.result;
						
						if(res.data.status == "1" && res.data.result.data.length != 0){
							
							//判断是否最后一页
							_self.isLast = pageIndex >= dataRes.last_page ? true : false;
							_self.currentPage = pageIndex;
						
							_self.shopList = _self.shopList.concat(res.data.result.data);
							
						}
				        
						if(_self.shopList.length <= 0){
							_self.listIsFree = true;
						}else{
							_self.listIsFree = false;
						}
						
				    },fail: (e) => {
						
				    },complete: (e) => {
						isLoadInterFace = false;
						_self.showLoadTip = false;
				    }
				});
				
			},
			//加载下一页
			nextPage(){
				if(_self.isLast){
					uni.showToast({
						title: '没有更多了',
						icon:"none"
					});
				}else{
					if(!isLoadInterFace){
						isLoadInterFace = true;
						_self.showLoadTip = true;
						var pageNum = _self.currentPage + 1;
						_self.loadShopList(pageNum,_self.searchWord,_self.type1,_self.type2,_self.type3,_self.type4,_self.type5);
					}
				}
			},
			//去选择城市
			goChangeCity(){
				uni.navigateTo({
					url:"/pages/city_list/city_list?city="+_self.city_name
				})
				
				_self.atIndex=null;
				_self.shadowLayer=false;
			},
			//更新城市区域
			updateCityArea(){
				if(areaList != null){
					var cityWord=cityStr.replace("市","");
					var cityAreaArr=[];
					for(var i=0;i<areaList.length;i++){
						if(cityAreaArr.length > 0){
							break;
						}
						for(var j=0;j<areaList[i].city.length;j++){
							if(areaList[i].city[j].name.indexOf(cityWord) != -1){
								cityAreaArr = areaList[i].city[j].area;
								break;
							}
						}
					}
					setTimeout(function(){
						_self.updateArea(cityAreaArr);
					},200)
				}
			},
			//同步区域
			updateArea(list){
				var arr=[{name:"不限",val:"-1"}];
				for(var i=0;i<list.length;i++){
					let obj={name:list[i],val:list[i]};
					arr.push(obj);
				}
				_self.currentIndex3 = -1;
				_self.type3 = null;
				_self.toolArray[2].list=arr;
			},
			//i:列表选项索引，id:列表块索引，v:列表块所选参数
			changeType(i,id,v,name){
				//console.log(i,id,v,name);
				switch (id){
					case 0:_self.currentIndex1 = i;_self.type1 = v * 1;_self.toolArray[0].name = name;break;
					case 1:_self.currentIndex2 = i;_self.type2 = v * 1;_self.toolArray[1].name = name;break;
					case 2:_self.currentIndex3 = i;_self.type3 = v;_self.toolArray[2].name = name;break;
					case 3:_self.currentIndex4 = i;_self.type4 = v * 1;_self.toolArray[3].name = name;break;
					case 4:_self.currentIndex5 = i;_self.type5 = v * 1;_self.toolArray[4].name = name;break;
				}
				_self.atIndex=null;
				_self.shadowLayer = false;
				
				_self.initProp(false);
				_self.loadShopList(1,_self.searchWord,_self.type1,_self.type2,_self.type3,_self.type4,_self.type5);
				
				
			},
			changeToolList:function(i){
				if(i === _self.atIndex){
					_self.atIndex=null;
					_self.shadowLayer = false;
				}else{
					_self.atIndex = i;
					_self.shadowLayer = true;
				}
				
			},
			hideLayer(){
				_self.atIndex=null;
				_self.shadowLayer = false;
			},
			homeShare: (e)=>{
				//检查是否登录
				
				_self.isShowShadow=!_self.isShowShadow;
				
				if(e == 0){
					//console.log("扫码");
					
					uni.scanCode({
					    success: function (res) {
					        //console.log('条码类型：' + res.scanType);
					        //console.log('条码内容：' + res.result);
							
							if(res.result.indexOf("jfcm_sym") != -1){
								uni.navigateTo({
									url:"/pages/shop/canuse_ticket?id="+res.result.split("=")[1]
								})
							}else{
								_self.tipMsg("请扫描正确的收银码");
							}
							
					    }
					});
					
				}else if(e == 1){
					//console.log("收藏");
					uni.navigateTo({
						url:'/pages/shop/collect_shop'
					})
					
				}else if(e == 2){
					//console.log("活动券");
					uni.navigateTo({
						url:'../shop/ticket_list'
					})
				}
				
			},
			//onload时触发
			beginOnload(){
				// 加载首页轮播图
				uni.request({
				    url: _self.$httpUrl+'index.php/Api/index/getad', 
					method:"POST",
				    data: {
				        pid: 51317
				    },
				    success: (res) => {
				        if(res.data.status == "1" && res.data.result.length != 0){
							_self.adList = res.data.result;
							//console.log(_self.adList)
						}
				        
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
				
				//加载分类数据
				uni.request({
				    url: _self.$httpUrl+'index.php/Api/index/getcategory', 
					method:"POST",
				    success: (res) => {
				        //console.log(res);
						if(res.data.status == "1" && res.data.result.length != 0){
							var tyList = res.data.result;
							_self.typeList = tyList;
							var arr = [];
							for(var i=0;i < tyList.length;i++){
								let obj = {
									name:tyList[i].name,
									val:tyList[i].id + ""
								}
								arr.push(obj);
							}
							_self.toolArray[0].list = arr;
						}
				        
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
			}
			
		}
	}
</script>

<style>

	@import url("css/index.css");

</style>
