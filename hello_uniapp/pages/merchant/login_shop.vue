<template>
	<view>
		<toprow2 titleval="选择登陆门店"></toprow2>
		
		<view class="list_control">
			<view class="list_item_btn" :class="{active : todoIndex == 0}" @click="changeList(0)">店长</view>
			<view class="list_item_btn" :class="{active : todoIndex == 1}" @click="changeList(1)">收银员</view>
		</view>
		
		<view class="top_free">
			<view class="outBox">
				
				<block v-for="(item,index) of dataList" :key="index">
					<view class="shop_block">
						<view class="cube one">
							<image :src="item.logo" mode="widthFix"></image>
						</view>
						<view class="cube two">
							<view class="lineTit">{{item.storename}}</view>
							<view class="lineWord">用户权限：{{item.auth}}</view>
							<view class="lineWord">商家区域：{{item.citys}} {{item.districts}}</view>
							<view class="lineWord long">商家营业总额：￥{{item.countmoney}}</view>
						</view>
						<view class="cube three">
							<view class="login_btn" @click="loginShop" :data-id="item.id" :data-lev="item.authlevel">GO</view>
						</view>
					</view>
				</block>
				
				<noData v-if="listIsFree"></noData>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	var isLoadInterFace = false;
	var _self;
	export default {
		data() {
			return {
				listIsFree:false,
				loginInfo:{},
				todoIndex:0, //0店长列表  1收银列表
				currentPage:1,
				totalPage:1,
				isLast:true,
				dataList:[]
				
			}
		},
		onReachBottom() {
			this.nextPage();
		},
		onLoad() {
			_self=this;
		},
		onShow() {
			_self=this;
			var loginRes = this.checkLogin('../index/merchant', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			this.dataList = [];
			this.getShopList(1,_self.todoIndex);
		},
		methods: {
			//登录门店
			loginShop(e){
				var id = e.currentTarget.dataset.id;
				var lev = e.currentTarget.dataset.lev;
				if(lev == 0){
					uni.navigateTo({
						url:"shop_content?id="+id
					})
				}else{
					uni.navigateTo({
						url:"shop_content2?id="+id
					})
				}
				
			},
			changeList(i){
				_self.todoIndex = i;
				_self.dataList = [];
				_self.getShopList(1,i);
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
						_self.getShopList(pageNum,_self.todoIndex);
					}
				}
			},
			getShopList(pageIndex,x){
				
				uni.request({
				    url: _self.$httpUrl+'index.php/Api/Store/getUserstore', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid,
						type:x,
						limit:10,
						page:pageIndex
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.dataList = _self.dataList.concat(res.data.result.data);
						_self.currentPage = res.data.result.current_page;
						_self.isLast = res.data.result.current_page >= res.data.result.last_page ? true : false;
					  }else{
						  uni.showToast({
						  	icon:"none",
							title:res.data.msg
						  })
					  }
					  
					  if(_self.dataList.length <= 0){
					  	_self.listIsFree = true;
					  }else{
					  	_self.listIsFree = false;
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						isLoadInterFace = false;
				    }
				});
				
				
				
			}
		}
	}
	
</script>

<style>
	
	@import url("css/login_shop.css");
	
</style>
