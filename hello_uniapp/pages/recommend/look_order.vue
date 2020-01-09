<template>
	<view class="write_order_page">
		<toprow titleval="订单详情"></toprow>
		
		<!-- 地址选项 -->
		<view class="top_free">
				<view class="address_tip">
					<view class="have_address_info">
						<view class="address_detail">{{orderInfo.orderinfo.provinces}}{{orderInfo.orderinfo.citys}}{{orderInfo.orderinfo.districts}}{{orderInfo.orderinfo.address}}</view>
						<view class="address_userInfo">{{orderInfo.orderinfo.consignee}} {{orderInfo.orderinfo.mobile}}</view>
					</view>
				</view>
			
			
			<!-- 要购买的商品信息 -->
			<view class="goods_info">
				<image :src="orderInfo.goods.original_img" class="goods_img" mode="widthFix"></image>
				<view class="goods_desc">
					{{orderInfo.goods.goods_name}}
					<br>
					<text>￥{{orderInfo.goods.shop_price}}</text>
				</view>
			</view>
			
			<view class="order_box">
				<view class="order_line double"><view class="left_word">共一件商品，实付款</view><view class="right_word">0.00</view></view>
				<view class="order_line purple">支付成功</view>
			</view>
			
			<view class="order_line">订单编号：<text>{{orderInfo.orderinfo.order_sn}}</text></view>
			
			<view class="order_line" v-if="orderInfo.delivery != ''">物流编号：<text>{{orderInfo.delivery}}</text></view>
			<view class="order_line" v-else>物流状态：<text>待发货</text></view>
		</view>
		
		<view class="backView" v-if="isFirst" @click.stop="backTuijian"></view>
		
		<view class="backRecommendPage" v-if="isFirst" @click="backTuijian">返回推荐页</view>
		
	</view>
</template>

<script>
	
	var _self;
	export default{
		
		data() {
			return {
				loginInfo:{},
				isFirst:false,
				orderInfo:{}
			}
		},
		onLoad(opt) {
			_self = this;
			var loginRes = this.checkLogin('../index/recommend', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
			if(opt.first != undefined){
				_self.isFirst = true;
			}
			
			this.getOrderInfo();
	
		},
		onShow() {
			
		},
		components:{
			
		},
		methods:{
			//返回推荐页
			backTuijian(){
				uni.switchTab({
					url:"../index/recommend"
				})
			},
			//订单信息
			getOrderInfo(){
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/recommend/getUserorder', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.orderInfo = res.data.result;
				
					  }else{
						  uni.showToast({
						  	icon:"none",
						  	title:res.data.msg
						  })
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
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
	@import url("css/look_order");
</style>
