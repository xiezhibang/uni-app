<template>
	<view>
		<toprow titleval="收藏店铺"></toprow>
		<view class="top_free">
			
			<block v-for="(item,index) of shopList" :key="index">
				<view class="shop_item" @click="goDetail(item.id)">
					<image :src="item.logo" mode="widthFix"></image>
					
					<view class="shop_info">
						<view class="shop_name">{{item.storename}}</view>
						<view class="shop_other">
							<view class="shop_star">
								<rateShow :num="item.service_rank" :size="26" :mrt="6"></rateShow>
							</view>
							{{Math.round( item.distance / 100) / 10}}km
						</view>
					</view>
				</view>
			</block>
			
		</view>
		
	</view>
</template>

<script>
	var isLoadInterFace = false;
	var _self;
	export default {
		data() {
			return {
				shopList:[],
				currentIndex:1,
				isLast:true,
				loginInfo:{}
			}
		},
		onLoad() {
			_self=this;
			
		},
		onShow() {
			_self=this;
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			this.shopList=[];
			this.lookLikeList(1);
		},
		onReachBottom() {
			this.nextPage();
		},
		methods: {
			goDetail(id){
				uni.navigateTo({
					url:"/pages/shop/shop_detail?id="+id
				})
			},
			//查看收藏店铺
			lookLikeList(page){
				console.log(_self.loginInfo.uid);
				var pageIndex = page;
				uni.request({
				    url: _self.$httpUrl+'api/index/storeList', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid,
						page:pageIndex,
						limit:10
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						//判断是否最后一页
						_self.isLast = pageIndex == res.data.result.totalPage ? true : false;
						_self.currentPage = pageIndex;
												
						_self.shopList = _self.shopList.concat(res.data.result.list);
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
						_self.lookLikeList(pageNum);
					}
				}
			},
		}
	}
	
</script>

<style>
	
	@import url("css/collect_shop.css");
	
</style>
