<template>
	<view>
		<toprow2 titleval="支付"></toprow2>
		<view class="top_free">
			<view class="img_box">
				<view class="goods_info">
					<image :src="storeInfo.logo" mode="widthFix"></image>
					<view class="goods_name">{{storeInfo.storename}}</view>
				</view>
			</view>
			
			<view class="pay_title">支付金额</view>
			<view class="pay_input">
				￥
				<input type="number" maxlength="10" v-model="payMoney" />
			</view>
			
			<view class="pay_wallet">
				<view class="left">我的余额：￥{{dataInfo.user_money}}</view>
				<view class="right">分润余额：￥{{dataInfo.rate_money}}</view>
			</view>
			
			<view class="current_gold">本次分润返利{{dataInfo.rate}}%</view>
			
			<view class="purple_btn pay_btn" @click="payAlert">支付</view>
			
			<view class="sys_tip">
				温馨提示：<br/>
				<text>1.系统已为您自动匹配最优惠活动</text>
				<br/>
				<text>2.支付前请与收银员确认消费金额</text>
			</view>
			
		</view>
		
		<!-- 使用活动券支付 -->
		<view class="use_ticket_panel" v-show="showPayBlock">
			
			<view class="ticket_box centerObj">
				<view class="ticket_option">
					<view class="tk_line">
						<view class="tk_word">支付金额</view>
						<view class="tk_num">￥{{orderInfo.total_amount}}</view>
					</view>
					
					<view class="tk_line">
						<view class="tk_word">余额抵扣</view>
						<view class="tk_num rft">￥{{orderInfo.user_amount}}</view>
					</view>
					
					<view class="tk_line">
						<view class="tk_word">分润抵扣</view>
						<view class="tk_num rft">￥{{orderInfo.rate_amount}}</view>
					</view>
					
					<view class="tk_line">
						<view class="tk_word">分润金额</view>
						<view class="tk_num rft">￥{{orderInfo.ratemoney}}</view>
					</view>
					
					<view class="tk_line">
						<view class="tk_word bold">本次支付</view>
						<view class="tk_num">￥{{orderInfo.order_money}}</view>
					</view>
					
				</view>
				
				<view class="pay_type">
					<radio-group name="pay_fun">
						
						<view class="pay_line" @click="changePayId(0)">
							<image :src="getImgSrc('home/home24.png')" mode="widthFix"></image>
							微信
							<radio color="#7A37C5" value="wx" :checked="payId == 0" />
						</view>
						<!-- #ifndef MP-WEIXIN -->
						<view class="pay_line" @click="changePayId(1)">
							<image :src="getImgSrc('home/home17.png')" mode="widthFix"></image>
							支付宝
							<radio color="#7A37C5" value="zfb" :checked="payId == 1" />
						</view>
						<!-- #endif -->
					
					</radio-group>
					
				</view>
				
				<view class="btn_group">
					<view class="pay_confirm cancel" @click="cancelPay">取消支付</view>
					
					<view class="pay_confirm" @click="confirmPay">确认支付</view>
				</view>
				
				
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	
	var _self;
	export default {
		data() {
			return {
				dataInfo:{},
				loginInfo:{},
				orderInfo:{},
				payMoney:"",
				showPayBlock:false,
				payId:0,
				storeInfo:{},
				couponId:0,
				storeId:0,
				payMethod:"wxpay",
				pay_type:"wxPay"
			}
		},
		onLoad(opt) {
			_self=this;
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
			if(opt.id != undefined && opt.storeInfo != undefined && opt.sid != undefined){
				_self.couponId = opt.id;
				_self.storeInfo = JSON.parse(opt.storeInfo);
				_self.storeId = opt.sid;
				console.log(_self.couponId);
				console.log(_self.storeInfo);
				console.log(_self.storeId);
				this.useCoupon();
			}
			
		},
		methods: {
			//微信小程序支付
			wxappPay(ress){
				var payObj = ress.data.result.result;
				
				console.log(payObj);
				console.log("***************");
				uni.requestPayment({
					timeStamp:payObj.timeStamp,
					nonceStr:payObj.nonceStr,
					package:payObj.package,
					signType:"MD5",
					paySign:payObj.paySign,
				    success: function (res) {
						uni.redirectTo({
							url:"/pages/shop/evaluate?id="+_self.storeId
						})
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
				    }
				});
			},
			//为零时支付
			zeroPay(){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/index/orderpay', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid,
						order_sn:_self.orderInfo.order_sn,
					},
				    success: (res) => {
				     
				      console.log("为零支付是：",res);
					  
					  if(res.data.status == 1){
						  
						 uni.redirectTo({
						 	url:"/pages/shop/evaluate?id="+_self.storeId
						 })
						  
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
			},
			//确认支付
			confirmPay(e){
				//订单为零直接支付
				if(_self.orderInfo.order_money == 0){
					_self.zeroPay();
					return;
				}
				
				
				var payObjMax = {
					user_id:_self.loginInfo.uid,
					order_sn:_self.orderInfo.order_sn,
					pay_code:_self.pay_type,
					type:"1",
					openid:_self.loginInfo.openid
				}
				
				// #ifdef MP-WEIXIN
					payObjMax.type = "2";
				// #endif
				
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
									uni.redirectTo({
										url:"/pages/shop/evaluate?id="+_self.storeId
									})
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
							       uni.redirectTo({
										url:"/pages/shop/evaluate?id="+_self.storeId
							       })
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
			//取消支付
			cancelPay(e){
				_self.showPayBlock = false;
			},
			//生成支付
			payAlert(){
				if(_self.payMoney.trim() == ""){
					_self.tipMsg("请输入正确的支付金额")
					return;
				}
				
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/index/beforeorder', 
					method:"POST",
					data:{
						coupon_id:_self.couponId,
						user_id:_self.loginInfo.uid,
						storeid:_self.storeId,
						total_amount:_self.payMoney * 1
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						  _self.orderInfo = res.data.result.result;
						  
						  _self.showPayBlock = true;
						  
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
				
				
			},
			//获取用户余额和本次返利等信息
			useCoupon(){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/index/usecoupon', 
					method:"POST",
					data:{
						coupon_id:_self.couponId,
						user_id:_self.loginInfo.uid,
						storeid:_self.storeId
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
							_self.dataInfo = res.data.result;
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
			},
			changePayId(i){
				_self.payId = i;
				if(i == 0){
					_self.payMethod="wxpay";
					_self.pay_type="wxPay";
				}else if(i == 1){
					_self.payMethod="alipay";
					_self.pay_type="aliPay";
				}
			}
			
		}
	}
	
</script>

<style>
	
	@import url("css/pay.css");
	
</style>
