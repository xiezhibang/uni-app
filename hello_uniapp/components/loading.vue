<template>
	<view>
		
		<view class="loading_box_max">
			<image :src="getImgSrc('load.gif')"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"loading"
	}
</script>

<style>
	
	.loading_box_max{
		width: 100%;
		height: 100%;
		position: absolute;
		top:0;
		left: 0;
		background: #fff;
		z-index: 2000;
	}
	
	.loading_box_max > image{
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 80upx;
		height: 80upx;
	}

</style>
