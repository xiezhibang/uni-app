<template>
	<view>
		
		<view class="noDataTip" :style="{color:colorv}">{{tip}}</view>
		
	</view>
</template>

<script>
	export default {
		name:"noData",
		props:{
			'tip':{
				type:String,
				default:"空空如也~"
			},
			'colorv':{
				type:String,
				default:"#ccc"
			}
		}
	}
</script>

<style>
	
	.noDataTip{
		width: 100%;
		margin: 100upx auto 0 auto;
		height: 60upx;
		font-size: 36upx;
		letter-spacing: 4upx;
		text-align: center;
	}

</style>
