<template>
	<view class="content">
		<view class="text-area">
			<view class="title" @tap="check()">扫码付款</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				num:1
			}
		},
		onLoad() {
			
		},
		onShow() {
			_self = this;
			if(_self.num == 1){
				_self.switch(_self.num);
			}
		},
		methods: {
			check(){
				_self.num = 0;
				uni.scanCode({
				    success: function (res) {
				        //console.log('条码类型：' + res.scanType);
				        //console.log('条码内容：' + res.result);
						
						if(res.result.indexOf("jfcm_sym") != -1){
							_self.num = 1;
							uni.navigateTo({
								url:"/pages/shop/canuse_ticket?id="+res.result.split("=")[1]
							})
						}else{
							_self.tipMsg("请扫描正确的收银码");
							_self.num = 1;
						}
						
				    }
				});
			},
			switch(){
				_self.num = 0;
				console.log('用户点击确定');
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
							_self.num = 1;
						}
						
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		width: 750upx;
		height: 750upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
	}

	.title {
		width: 300upx;
		height: 300upx;
		border-radius: 300upx;
		line-height: 300upx;
		text-align: center;
		margin-top: 300upx;
		color: #FFFFFF;
		font-size: 36rpx;
		background: #803ACE;
	}
</style>
