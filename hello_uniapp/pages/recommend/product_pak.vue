<template>
	<view class="product_pak_page">
		<toprow titleval="产品礼包"></toprow>
		<view class="top_free">
			<view class="product_list">
				<view class="product_item" v-for="(item,index) of dataList" :key="index">
					<image class="product_image" :src="item.original_img" @click="goDetail(item.goods_id)"></image>
					<view class="product_name">{{item.goods_name}}</view>
					<view class="product_price">
						￥{{item.shop_price}}
						<button hover-class="hover-class" class="product_get" v-if="isVip == 0" @click="backBeforePage">升级领</button>
						<button hover-class="hover-class" class="product_get" v-else @click="getThisProduct(item)">点击领</button>
					</view>
				</view>
				
				<noData v-if="listIsFree"></noData>
				
			</view>
		</view>
		
		<button v-if="isVip == 0" hover-class="none" class="member_btn purple_btn" @click="backBeforePage">立即升级掌柜</button>
	
	</view>
</template>

<script>
	var _self;
	var isLoadInterFace = false;
	export default{
		
		data() {
			return {
				listIsFree:false,
				loginInfo:{},
				isVip:0,
				dataList:[],
				currentPage:1,
				totalPage:1,
				isLast:true
			}
		},
		onLoad(opt) {
			_self = this;
			var loginRes = this.checkLogin('../index/recommend', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			this.getData(1);
		},
		onReachBottom() {
			this.nextPage();
		},
		components:{
			
		},
		methods:{
			//去商品详情
			goDetail(id){
				
				uni.navigateTo({
					url:"pak_detail?id="+id+"&isv="+_self.isVip
				})
				
			},
			//领取该礼包
			getThisProduct(product){
				var param = JSON.stringify(product);
				uni.navigateTo({
					url:"write_order?product="+param
				})
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
						_self.getData(pageNum);
					}
				}
			},
			getData(pageIndex){
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/recommend/vipgoods', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid,
						limit:10,
						page:pageIndex
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.dataList = _self.dataList.concat(res.data.result.goodslist.data);
						//_self.changeTimeType();
						_self.currentPage = res.data.result.goodslist.current_page;
						_self.isLast = res.data.result.goodslist.current_page >= res.data.result.goodslist.last_page ? true : false;
						_self.isVip = res.data.result.userinfo.levelid;
				
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
			},
			backBeforePage:()=>{
				
				uni.navigateBack({
					delta:1
				})
			}
			
			
		}
		
		
		
	}
	
</script>

<style>
	@import url("css/product_pak.css");
</style>
