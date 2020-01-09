<template>
	<view name="toprow">
		<view class="head_out">
			<view class="title_padding"></view>
			<view class="head_row">
				<view class="back_before" @click="backBeforePage">
					<image :src="getImgSrc('back/back1.png')" mode="widthFix" tag='other'></image>
				</view>
				{{titleval}}
			</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		name:"toprow",
		props:['titleval'],
		methods:{
			backBeforePage: ()=>{
				
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
	
	
</script>

<style>
	
	
	.title_padding{
		background:#8a3edf;
	}
	
	.head_row{
		position: relative;
		height: 128upx;
		background: #8a3edf;
		text-align: center;
		line-height:128upx;
		color:#fff;
		font-size: 38upx;
	}
	
	.head_row > .back_before{
		position: absolute;
		top:0;
		left: 0;
		width: 100upx;
		height: 128upx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
	}
	
	.head_row > .back_before > image{
		width: 22upx;
		position: relative;
		top:42upx;
		height: 0;
	}
	
</style>
