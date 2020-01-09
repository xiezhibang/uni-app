<template>
	<view>
		<view class="head_out">
			<view class="title_padding"></view>
			<view class="head_row">
				<view class="back_before" @click="backBeforePage">
					<image :src="getImgSrc('back/back2.png')" mode="widthFix"></image>
				</view>
				支付
				
			</view>
		</view>
		
		
		<view class="top_free">
			
			<view class="main_block">
				<text>支付金额</text>
				<view class="input_cash">
					￥
					<input type="number" v-model="payNum" disabled="true" maxlength="14"/>
				</view>
				
				<view class="choice_account">请选择支付账户</view>
				<view class="pay_list">
					<view class="pay_item" @click="changePayType(0)">
							<image :src="getImgSrc('shangjia/sj22.png')" mode="widthFix"></image>
							<view class="radio_item" :class="{active : currentIndex == 0}">
								<view v-if="currentIndex == 0"></view>
							</view>
					</view>
					
					<!-- #ifndef MP-WEIXIN -->
					
					<view class="pay_item" @click="changePayType(1)">
							<image :src="getImgSrc('shangjia/sj21.png')" mode="widthFix"></image>
							<view class="radio_item" :class="{active : currentIndex == 1}">
								<view v-if="currentIndex == 1"></view>
							</view>
					</view>
					
					<!-- #endif -->
					
				</view>
				
			</view>
			
		</view>
		
		<button class="purple_btn" @click="confirmPay" v-if="!isPayOk">确认支付</button>
		<view class="tips_wait" v-else>即将跳转，请稍等...</view>
	</view>
</template>


<script>
	
	var _self;
	
	export default{
		
		data() {
			return {
				currentIndex:0,
				payMethod:"wxpay",
				pay_type:"wxPay",
				orderInfo:"",
				orderId:"",
				payNum:0,
				loginInfo:{},
				isPayOk:false
			}
		},
		onLoad(opt){
			_self = this;
			console.log(opt);
			var loginRes = this.checkLogin('../index/recommend', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			if(opt.orderid != undefined && opt.paynum != undefined){
				_self.orderId = opt.orderid;
				_self.payNum = opt.paynum * 1;
			}
		},
		components:{
			
		},
		methods:{
			//微信小程序支付
			wxappPay(ress){
				var payObj = ress.data.result.result;
				
				console.log(payObj);
				console.log("签名：",payObj.paySign);
				uni.requestPayment({
					timeStamp:payObj.timeStamp,
					nonceStr:payObj.nonceStr,
					package:payObj.package,
					signType:"MD5",
					paySign:payObj.paySign,
				    success: function (res) {
				        //console.log('success:' + JSON.stringify(res));
						uni.showToast({
							title:"恭喜升级掌柜",
							icon:"success"
						})
						
						_self.isPayOk = true;
						
						setTimeout(function(){
							uni.switchTab({
								url:"../index/recommend"
							})
						},3000);
						
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
				    }
				});
			},
			//确认支付
			confirmPay(){
				var payObjMax = {
					user_id:_self.loginInfo.uid,
					order_sn:_self.orderId,
					pay_code:_self.pay_type,
					type:"1",
					openid:_self.loginInfo.openid
				}
				
				// #ifdef MP-WEIXIN
					payObjMax.type = "2";
				// #endif
				console.log("sdfsdf:",payObjMax);
				uni.request({
				    url: _self.$httpUrl+'index.php/api/recommend/orderPaying', 
					method:"POST",
					data:payObjMax,
				    success: (ress) => {
				     
				      console.log(ress);
					  
					  if(ress.data.status != -1){
						
						if(_self.payMethod == "wxpay"){
							
							// #ifdef MP-WEIXIN
								
								_self.wxappPay(ress);
								
							// #endif
							
							// #ifndef MP-WEIXIN
							var payObj = ress.data.result.result;
							var payData = JSON.stringify({
								"appid":payObj.appid,
								"noncestr":payObj.nonce_str,
								"package":payObj.package,
								"partnerid":payObj.partnerid,
								"prepayid":payObj.prepay_id,
								"sign":payObj.sign,
								"timestamp":payObj.time
							});
							
							console.log(payData);
							console.log("***************");
							uni.requestPayment({
							    provider: _self.payMethod,
								orderInfo: payData, //微信、支付宝订单数据
							    success: function (res) {
							        //console.log('success:' + JSON.stringify(res));
									uni.showToast({
										title:"恭喜升级掌柜",
										icon:"success"
									})
									
									_self.isPayOk = true;
									
									setTimeout(function(){
										uni.switchTab({
											url:"../index/recommend"
										})
									},3000);
									
							    },
							    fail: function (err) {
							        console.log('fail:' + JSON.stringify(err));
							    }
							});
							// #endif
						}else if(_self.payMethod == "alipay"){
							uni.requestPayment({
							    provider: _self.payMethod,
							    orderInfo: ress.data.data, //微信、支付宝订单数据
							    success: function (res) {
							        //console.log('success:' + JSON.stringify(res));
									uni.showToast({
										title:"恭喜升级掌柜",
										icon:"success"
									})
									
									_self.isPayOk = true;
									
									setTimeout(function(){
										uni.switchTab({
											url:"../index/recommend"
										})
									},3000);
									
							    },
							    fail: function (err) {
							        //console.log('fail:' + JSON.stringify(err));
							    }
							});					  
						}
						
						
					  }else{
						  uni.showToast({
						  	title:ress.data.msg,
							icon:""
						  })
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
				
				
				
				
				
			},
			changePayType(i){
				_self.currentIndex = i;
				if(i == 0){
					_self.payMethod = "wxpay";
					_self.pay_type = "wxPay";
				}else{
					_self.payMethod = "alipay";
					_self.pay_type = "aliPay";
				}
			},
			backBeforePage: ()=>{
				
				uni.navigateBack({
					delta:1
				})
			}
			
			
		}
		
		
		
	}
	
	
</script>

<style>
	
	@import url("css/pay_index.css");
	
</style>
