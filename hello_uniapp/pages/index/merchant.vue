<template>
	<view class="merchant_page">
		
		<view class="centerObj mt_list">
			<view class="mt_tittle floatObj">加盟商家</view>
			
			<navigator url="../merchant/login_shop" open-type="navigate">
			<view class="mt_item" style="background: #9f60e5;">
				<image class="mt_icon floatObj" :src="getImgSrc('shangjia/icon1.png')" mode="widthFix"></image>
				我是商家
				<image class="mt_arrow floatObj" :src="getImgSrc('shangjia/sj13.png')" mode="widthFix"></image>
			</view>
			</navigator>
			
			<navigator url="../merchant/apply_join" open-type="navigate">
			<view class="mt_item" style="background: #e9698a;">
				<image class="mt_icon floatObj" :src="getImgSrc('shangjia/icon2.png')" mode="widthFix"></image>
				我要加盟
				<image class="mt_arrow floatObj" :src="getImgSrc('shangjia/sj13.png')" mode="widthFix"></image>
			</view>
			</navigator>
			
			<navigator :url="'../merchant/shop_invite?uid='+loginInfo.uid">
			<view class="mt_item" style="background: #f3ba55;">
				<image class="mt_icon floatObj" :src="getImgSrc('shangjia/icon3.png')" mode="widthFix"></image>
				邀请加盟
				<image class="mt_arrow floatObj" :src="getImgSrc('shangjia/sj13.png')" mode="widthFix"></image>
			</view>
			</navigator>
		</view>
		<!-- <tab-bar tabIndex="2"></tab-bar> -->
	</view>
</template>

<script>
	
	var _self;
	export default {
		data() {
			return {
				loginInfo:{}
			}
		},
		onLoad() {
			_self=this;
		},
		onShareAppMessage() {
			return {
				title: "来和我一起Get新技能吧！",
				path: '/pages/index/index',
				imageUrl:'http://www.jfcma.com/public/images/jfcm/logo.png'
			}
		},
		onShow() {
			var loginRes = this.checkLogin('../index/merchant', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
		},
		methods: {
			
		}
	}
	
</script>

<style>
	
	@import url("css/merchant.css");
	
</style>
