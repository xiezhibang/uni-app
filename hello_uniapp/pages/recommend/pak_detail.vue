<template>
	<view>
		
		<toprow titleval="礼包详情"></toprow>
		
		<view class="top_free">
			
			
			<image class="product_image" :src="goodsInfo.original_img" mode="widthFix"></image>
			
			<view class="product_name">{{goodsInfo.goods_name}}</view>
			
			<view class="product_price">￥{{goodsInfo.shop_price}}</view>
			
			<view class="detail_title">商品详情</view>
			
			<image class="product_detail" :src="goodsInfo.mobile_content" mode="widthFix"></image>
			
			<view class="purple_btn fix" v-if="isVip" @click="getGo(0)">免费领取</view>
			<view class="purple_btn fix" v-else @click="getGo(1)">升级领取</view>
			
		</view>
	</view>
</template>

<script>
	
	var _self;
	export default {
		data() {
			return {
				isVip:true,
				goodsId:0,
				goodsInfo:{}
			}
		},
		onLoad(opt) {
			_self=this;
			if(opt.id != undefined && opt.isv != undefined){
				_self.goodsId = opt.id;
				_self.isVip = opt.isv == 0 ? false : true;
			}
			
			this.req();
			
		},
		methods: {
			getGo(i){
				
				if(i == 0){
					
					var param = JSON.stringify(_self.goodsInfo);
					uni.navigateTo({
						url:"write_order?product="+param
					})
					
				}else{
					
					uni.navigateBack({
						delta:2
					})
					
				}
				
			},
			req(){
				var vd=_self.isVip ? 1 : 0;
				uni.request({
				    url: _self.$httpUrl+'index.php/api/recommend/goodsinfo', 
					method:"POST",
					data:{
						goods_id:_self.goodsId,
						vipid:vd
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
							_self.goodsInfo = res.data.result;
					  }else{
						  uni.showToast({
						  	title:res.data.msg,
							icon:"none"
						  })
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
			}
		}
	}
	
</script>

<style>
	
	@import url("css/pak_detail.css");
	
</style>
