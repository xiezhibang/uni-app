<template>
	<view name="tabBar">
		<view class="tab_bar_line">
			<navigator url="index" open-type="redirect">
			<view class="tab_bar_item">
				<view class="tab_bar_img">
					<image v-if="tabIndex == 0" :src="getImgSrc('tabbar/icon4.png')" mode="widthFix"></image>
					<image v-else :src="getImgSrc('tabbar/icon7.png')" mode="widthFix"></image>
				</view>
				<view class="tab_bar_word" :class="{active:tabIndex==0}">首页</view>
			</view>
			</navigator>
			
			<navigator url="recommend" open-type="redirect">
			<view class="tab_bar_item">
				<view class="tab_bar_img">
					<image v-if="tabIndex == 1" :src="getImgSrc('tabbar/icon2.png')" mode="widthFix"></image>
					<image v-else :src="getImgSrc('tabbar/icon8.png')" mode="widthFix"></image>
				</view>
				<view class="tab_bar_word" :class="{active:tabIndex==1}">推荐</view>
			</view>
			</navigator>
			
			<navigator url="merchant" open-type="redirect">
			<view class="tab_bar_item">
				<view class="tab_bar_img">
					<image v-if="tabIndex == 2" :src="getImgSrc('tabbar/icon1.png')" mode="widthFix"></image>
					<image v-else :src="getImgSrc('tabbar/icon5.png')" mode="widthFix"></image>
				</view>
				<view class="tab_bar_word" :class="{active:tabIndex==2}">商家</view>
			</view>
			</navigator>
			
			<navigator url="personal" open-type="redirect">
			<view class="tab_bar_item">
				<view class="tab_bar_img">
					<image v-if="tabIndex == 3" :src="getImgSrc('tabbar/icon3.png')" mode="widthFix"></image>
					<image v-else :src="getImgSrc('tabbar/icon6.png')" mode="widthFix"></image>
				</view>
				<view class="tab_bar_word" :class="{active:tabIndex==3}">我的</view>
			</view>
			</navigator>
		</view>
		
	</view>
</template>

<script>
	// 底部入口导航
	export default{
		name:"tabBar",
		props:{
			'tabIndex':{
				type:[Number,String],
				default:0
			}
		},
		methods:{
			
		}
	}
	
	
</script>

<style>
	
	.tab_bar_line{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1000;
		display: flex;
		flex-flow: row nowrap;
		width: 750upx;
		height: 100upx;
		background: #fff;
		box-sizing: border-box;
		border-top: 1upx solid #ccc;
	}
	
	.tab_bar_item{
		width: 187.5upx;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.tab_bar_img{
		width:100%;
		height: auto;
	}
	
	.tab_bar_img > image{
		width: 48upx;
		display: block;
		margin: auto;
		height: 0;
		max-height: 56upx;
	}
	
	.tab_bar_word{
		width: 100%;
		height: auto;
		font-size: 20upx;
		text-align: center;
		margin-top: 6upx;
		color:#666666;
	}
	
	.tab_bar_word.active{
		color:#7e3ec7;
	}
	
</style>
