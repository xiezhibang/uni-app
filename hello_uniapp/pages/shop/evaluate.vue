<template>
	<view>
		<toprow2 titleval="完成评价" isShowBack="false"></toprow2>
		
		<view class="top_free">
			
			<view class="pay_ok">
				
				<image :src="getImgSrc('home/home23.png')" mode="widthFix"></image>
				支付完成，请对服务进行评价
				
			</view>
			
			<view class="pj_box">
				
				<view class="pj_title">店铺评价</view>
				
				<view class="rateBox">
					<uni-rate :value="starNum" :isFill="false" :size="46" @change="rateChange"></uni-rate>
				</view>
				
				<view class="pj_btn" @click="completeComment">完成</view>
				
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	
	import uniRate from '../../components/uni-rate/uni-rate.vue'
	
	var _self;
	export default {
		data() {
			return {
				starNum:5,
				storeId:202,
				loginInfo:{}
			}
		},
		components:{
			uniRate
		},
		onLoad(opt) {
			_self=this;
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			if(opt.id != undefined){
				_self.storeId = opt.id;
			}
		},
		methods: {
			rateChange(e){
				_self.starNum = e.value;
			},
			//评价店铺
			completeComment(){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/index/commentStore', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid * 1,
						storeid:_self.storeId * 1,
						service_rank:_self.starNum * 1
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						  
						  _self.tipMsg("感谢评价",2000,"none",true)
						  
						  setTimeout(function(){
							  uni.switchTab({
							  	url:"/pages/index/personal"
							  })
						  },2000)
						  
						  
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
			}
		}
	}
	
</script>

<style>
	
	@import url("css/evaluate.css");
	
</style>
