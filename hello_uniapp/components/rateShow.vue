<template>
	<view name="rateShow">
		<view class="rate_wrap">
			<image class="st_imgs" :style="{width:size + 'upx',height:size + 'upx',marginRight:mrt + 'upx'}" v-if="num >= 1 && num <=5" v-for="(item,index) of num" :key="index" :src="getImgSrc('home/star.png')"></image>
		</view>
	</view>
</template>

<script>
	// 仅作用于显示评分星数
	export default{
		name:"rateShow",
		props:{
			'num':{
				type:[Number,String],
				default:1
			},
			'size':{
				type:Number,
				default:20
			},
			'mrt':{
				type:Number,
				default:4
			}
		},
		methods:{
			
		}
	}
	
	
</script>

<style>
	
	.rate_wrap{
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
	}
	
	.st_imgs{
		width: 20upx;
		height: 20upx;
		display: block;
		margin-right:4upx;
	}
	
</style>
