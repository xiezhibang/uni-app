<template>
	<view>
		<!-- 顶部 -->
		<view class="title_padding fix"></view>
		<view class="title_padding"></view>
		
		<view class="top_box">
			
			<image class="bg_img" mode="widthFix" :src="shopInfo.storeimg[0]"></image>
		
			<view class="back_box" @click="backBeforePage">
				<image mode="widthFix" :src="getImgSrc('back/back1.png')"></image>
			</view>
			
			<view class="shop_head">
				<image :src="shopInfo.logo"></image>
				<view class="shop_name">{{shopInfo.storename}}</view>
				<view class="shop_id">ID：{{shopInfo.id}}</view>
			</view>
		
			<view class="p_data floatObj">
				<view class="p_money_left floatObj">
					<view>￥{{shopInfo.revenuemoney}}</view>
					可提余额
				</view>
				<view class="p_money_right floatObj">
					<view>￥{{shopInfo.tmoney}}</view>
					累计提现
				</view>
			</view>
		</view>
	
		<view class="control_list">
			
			<view class="model_bar2" @click="goPage(2)">
				<image class="mb_icon" mode="widthFix" :src="getImgSrc('shangjia/sj28.png')"></image>
				扫码收银
				<image class="mb_arrow" mode="widthFix" :src="getImgSrc('shangjia/sj8.png')"></image>
			</view>
			
			<view class="model_bar2" @click="goPage(3)">
				<image class="mb_icon" mode="widthFix" :src="getImgSrc('shangjia/sj11.png')"></image>
				营收报表
				<image class="mb_arrow" mode="widthFix" :src="getImgSrc('shangjia/sj8.png')"></image>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	
	var _self;
	export default {
		data() {
			return {
				storeId:0,
				shopInfo:{},
				loginInfo:{}
			}
		},
		onLoad(opt) {
			_self=this;
			
			var loginRes = this.checkLogin('../index/merchant', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
			if(opt.id != undefined){
				console.log(opt.id);
				_self.storeId = opt.id;
				_self.showShopInfo();
			}
			
		},
		methods: {
			//菜单项
			goPage(i){
				//i(0,1,2,3,4)→（店铺活动，店铺设置，扫码收银，营收报表，服务协议）
				
				var urlStr = "";
				
				if(i == 0){
					urlStr = "shop_activity?id="+_self.storeId;
				}else if(i == 1){
					urlStr = "shop_set?id="+_self.storeId;
				}else if(i == 2){
					urlStr = "cashier_code?id="+_self.storeId;
				}else if(i == 3){
					urlStr = "revenue_report?id="+_self.storeId;
				}else if(i == 4){
					urlStr = "service_agreement";
				}
				
				uni.navigateTo({
					url:urlStr
				})
				
				
			},
			showShopInfo(){
				uni.request({
				    url: _self.$httpUrl+'index.php/Api/Store/getStoreinfo', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid,
						storeid:_self.storeId
					},
				    success: (res) => {
				     
				      //console.table(res.data.result);
					  
					  if(res.data.status == 1){
						 _self.shopInfo = res.data.result;
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
			backBeforePage(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
	
</script>

<style>
	
	@import url("css/shop_content2.css");
	
</style>
