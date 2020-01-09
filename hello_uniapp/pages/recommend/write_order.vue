<template>
	<view class="write_order_page">
		<toprow titleval="确认订单"></toprow>
		
		<!-- 地址选项 -->
		<view class="top_free">
			<navigator open-type="navigate" url="write_address">
				<view class="address_tip">
					<view v-if="userAddress == ''" class="no_address_tip">请填写收获地址</view>
					<view v-else class="have_address_info">
						<view class="address_detail">{{userAddress.uProvince}}{{userAddress.uCity}}{{userAddress.uTown}}{{userAddress.uaddress}}</view>
						<view class="address_userInfo">{{userAddress.uname}} {{userAddress.uphone}}</view>
					</view>
					<image mode="widthFix" :src="getImgSrc('tuijian/tj11.png')" class="arrowImg"></image>
				</view>
			</navigator>
			
			
			<!-- 要购买的商品信息 -->
			<view class="goods_info">
				<image :src="productInfo.original_img" class="goods_img" mode="widthFix"></image>
				<view class="goods_desc">
					{{productInfo.goods_name}}
					<br>
					<text>￥0.00</text>
				</view>
			</view>
			
			
		</view>
		
		<!-- 支付按钮 -->
		<button hover-class="none" class="pay_btn purple_btn" @click="confirmGet">确认领取</button>
		
		
	</view>
</template>

<script>
	
	var _self;
	export default{
		
		data() {
			return {
				loginInfo:{},
				userAddress:{},
				productInfo:{}
			}
		},
		onLoad(opt) {
			_self = this;
			var loginRes = this.checkLogin('../index/recommend', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			console.log(opt);
			if(opt.product != undefined){
				_self.productInfo = JSON.parse(opt.product)
			}
		},
		onShow() {
			_self = this;
			try{
				var adInfo = uni.getStorageSync("user_address");
				_self.userAddress = adInfo;
				
			}catch(e){
				//TODO handle the exception
			}
		},
		components:{
			
		},
		methods:{
			
			//确认领取
			confirmGet(){
				
				if(_self.userAddress == ""){
					uni.showToast({
						title:"请先填写地址",
						icon:"none"
					})
					return;
				}
				
				var dataObj = {
						address:_self.userAddress.uaddress,
						citys:_self.userAddress.uCity,
						consignee:_self.userAddress.uname,
						districts:_self.userAddress.uTown,
						goods_id:_self.productInfo.goods_id,
						mobile:_self.userAddress.uphone,
						order_amount:0,
						provinces:_self.userAddress.uProvince,
						user_id:_self.loginInfo.uid
					};
				
				console.log(dataObj);
				
				uni.showLoading({
				    title: '领取中',
					mask:true
				});
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/recommend/addorder', 
					method:"POST",
					data:dataObj,
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						
						setTimeout(function(){
							uni.hideLoading();
							uni.redirectTo({
								url:"look_order?first=true"
							})
						},1000);
						
				
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
	@import url("css/write_order");
</style>
