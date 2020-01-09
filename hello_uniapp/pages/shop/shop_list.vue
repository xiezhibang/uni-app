<template>
	<view>
		<view class="head_out">
			<view class="title_padding"></view>
			<view class="head_row">
				<view class="back_before" @click="backBeforePage">
					<image :src="getImgSrc('back/back1.png')" mode="widthFix" tag='other'></image>
				</view>
				
				<!-- <view class="search_block">
					<image :src="getImgSrc('home/home16.png')" mode="widthFix"></image>
				</view> -->
				
				店铺列表
			</view>
		</view>
		
		<view class="top_free">
			
			<!-- 列表栏目 -->
			<view class="list_tool_box">
				<view @click="changeToolList(index)" class="tool_item" :class="{tool_active : atIndex == index}" v-for="(tool,index) in toolArray" :key="tool.id">
					{{tool.name}}
					<view class="img_wrap">
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
				
				<!-- 遮罩 -->
			</view>
		
		</view>
	</view>
</template>

<script>
	
	import area from '../../common/area.js'
	var areaList = area.cityArr;
	var isLoadInterFace = false;
	var cityStr = "";
	var _self;
	
	export default{
		data(){
			return{
				listIsFree:false,
				//纬度
				longitude:113,
				//经度
				latitude:23,
				//搜索
				searchWord:"",
				//城市定位
				city_name:"",
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
		onLoad(opt) {
			_self = this;
			this.beginOnload();
			
			this.shopList = [];
			if(opt.item != undefined){
				var opts = JSON.parse(opt.item);
				cityStr=opts.city;
				_self.city_name = opt.city;
				_self.latitude = opts.latitude;
				_self.longitude = opts.longitude;
				_self.updateCityArea();
				_self.changeType(opts.index * 1,0,opts.id,opts.name);
			}else{
				_self.loadShopList(1);
			}
			
		},
		onPullDownRefresh() {
			_self = this;
			setTimeout(function () {
				uni.stopPullDownRefresh();
				_self.searchWord = "";
				_self.atIndex=null;
				_self.searchShop();
			}, 1000);
		},
		onReachBottom() {
			this.nextPage();
		},
		methods:{
			goDetail(id){
				uni.navigateTo({
					url:"/pages/shop/shop_detail?id="+id
				})
			},
			backBeforePage: ()=>{
				
				uni.navigateBack({
					delta:1
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
				
				//加载首页店铺列表
				uni.request({
				    url: _self.$httpUrl+'index.php/api/index/getstoremess', 
					method:"POST",
					data:dataObj,
				    success: (res) => {
						
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
						var pageNum = _self.currentPage + 1;
						_self.loadShopList(pageNum,_self.searchWord,_self.type1,_self.type2,_self.type3,_self.type4,_self.type5);
					}
				}
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
				
				switch (id){
					case 0:_self.currentIndex1 = i;_self.type1 = v * 1;_self.toolArray[0].name = name;break;
					case 1:_self.currentIndex2 = i;_self.type2 = v * 1;_self.toolArray[1].name = name;break;
					case 2:_self.currentIndex3 = i;_self.type3 = v;_self.toolArray[2].name = name;break;
					case 3:_self.currentIndex4 = i;_self.type4 = v * 1;_self.toolArray[3].name = name;break;
					case 4:_self.currentIndex5 = i;_self.type5 = v * 1;_self.toolArray[4].name = name;break;
				}
				_self.atIndex=null;
				
				_self.initProp(false);
				_self.loadShopList(1,_self.searchWord,_self.type1,_self.type2,_self.type3,_self.type4,_self.type5);
				
				
			},
			changeToolList:function(i){
				if(i === _self.atIndex){
					_self.atIndex=null;
				}else{
					_self.atIndex = i;
				}
				
			},
			//onload时触发
			beginOnload(){
				
				//加载分类数据
				uni.request({
				    url: _self.$httpUrl+'index.php/Api/index/getcategory', 
					method:"POST",
				    success: (res) => {
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
	@import url("css/shop_list.css");
</style>
