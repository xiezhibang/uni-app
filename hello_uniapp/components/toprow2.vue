<template>
	<view name="toprow2">
		
		
		<view class="head_out">
			<view class="title_padding"></view>
			<view class="head_row">
				<view class="back_before" v-if="isShowBack == 'true'" @click="backBeforePage">
					<image :src="getImgSrc('back/back2.png')" mode="widthFix" tag='other'></image>
				</view>
				{{titleval}}
			</view>
		</view>
		
		
	</view>
</template>

<script>
	
	export default{
		name:"toprow2",
		props:{
			'titleval':{
				type:String,
				default:""
			},
			'isShowBack':{
				type:String,
				default:"true"
			}
		},
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
	
	.head_row{
		position: relative;
		height: 128upx;
		background: #fff;
		text-align: center;
		line-height:128upx;
		color:#000;
		font-size: 38upx;
		box-sizing: border-box;
		border-bottom: 1upx solid #f6f6f6;
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
