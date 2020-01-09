<template>
	<view class="member_upgrade1_page">
		
		<view class="title_padding"></view>
		
		<view class="top_block">
			<view class="back_box" @click="backBeforePage">
				<image mode="widthFix" :src="getImgSrc('back/back1.png')"></image>
			</view>
			
			<text class="mb_title floatObj">会员升级</text>
			
			<view class="super_mb">
				<image :src="getImgSrc('tuijian/tj4.png')" mode="widthFix"></image>
				成为掌柜
			</view>
			
			<view class="buy_two">消费省钱 分享赚钱</view>
			
			<view class="mb_name">
				<text>￥</text>
				399
				<view>永久权益</view>
			</view>
			
		</view>
		
		<!-- 主列表 -->
		<view class="main_list">
			<view class="main_block">
				<view class="ml_inner ml_1">
					掌柜权益
					
					<view class="ml_1_look" @click="lookRuleDetail">
						查看权益
						<image :src="getImgSrc('tuijian/tj11.png')" mode="widthFix"></image>
					</view>
					
				</view>
				
				<!-- 权益模块一览 -->
				<view class="ml_inner ml_2">
					<view class="ml_equity">
						<image :src="getImgSrc('tuijian/tj5.png')"></image>
						<view class="ml_word1">消费分润</view>
						<view class="ml_word2">最高低至两折扣</view>
					</view>
					<view class="ml_equity">
						<image :src="getImgSrc('tuijian/tj8.png')"></image>
						<view class="ml_word1">分享赚钱</view>
						<view class="ml_word2">最高20%推广奖励</view>
					</view>
					<view class="ml_equity">
						<image :src="getImgSrc('tuijian/tj31.png')"></image>
						<view class="ml_word1">创业机会</view>
						<view class="ml_word2">一键商家加盟无需加盟费用</view>
					</view>
					<view class="ml_equity">
						<image :src="getImgSrc('tuijian/tj12.png')"></image>
						<view class="ml_word1">超值好礼</view>
						<view class="ml_word2">送399大礼包</view>
					</view>
					<view class="ml_equity">
						<image :src="getImgSrc('tuijian/tj16.png')"></image>
						<view class="ml_word1">合伙人特权</view>
						<view class="ml_word2">海量商家推广权</view>
					</view>
					<view class="ml_equity">
						<image :src="getImgSrc('tuijian/tj14.png')"></image>
						<view class="ml_word1">掌柜权益</view>
						<view class="ml_word2">永久权益</view>
					</view>
					<view class="ml_equity">
						<image :src="getImgSrc('tuijian/tj9.png')"></image>
						<view class="ml_word1">管家服务</view>
						<view class="ml_word2">轻松服务智慧管理</view>
					</view>
					<view class="ml_equity">
						<image :src="getImgSrc('tuijian/tj17.png')"></image>
						<view class="ml_word1">专属售后</view>
						<view class="ml_word2">提供便捷服务</view>
					</view>
				</view>
				
				<!-- 开通超级会员按钮 -->
				<button class="open_mb_btn" v-if="isVip == 0" @click="goPakPage">升级掌柜即送价值399元超值豪礼&nbsp;&nbsp;&nbsp;〉</button>
				<button class="open_mb_btn" v-else @click="lookRuleDetail">点击查看会员升级规则详情&nbsp;&nbsp;&nbsp;〉</button>
				
			</view>
		</view>
		
		<view class="invite_code" v-if="isVip == 0">
			邀请码
			<br/>
			<input type="text" v-model="inviteCode" placeholder="请输入邀请码" /> 
			<image class="scanCodeImg" @click="scanInviteCode" :src="getImgSrc('tuijian/tj15.png')" mode="widthFix"></image>
		</view>
		
		
		<button class="purple_btn pay_btn" v-if="isVip == 0" @click="goNextStep(0)">立即支付</button>
		<button class="purple_btn pay_btn" v-if="isVip != 0 && isGet == 0" @click="goNextStep(1)">领取礼包</button>
		<button class="purple_btn pay_btn" v-if="isVip != 0 && isGet == 1" @click="goNextStep(2)">已领取礼包</button>
		
	</view>
</template>

<script>
	var _self;
	
	export default{
		
		data() {
			return {
				loginInfo:{},
				inviteCode:"",
				isGet:0,
				isVip:0
			}
		},
		onLoad(opt) {
			_self = this;
			
			var loginRes = this.checkLogin('../index/recommend', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			this.getData();
		},
		components:{
			
		},
		methods:{
			//扫取邀请码
			scanInviteCode(){
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						if(res.result.indexOf("jfcm_tjm") != -1){
							_self.inviteCode = res.result.split("=")[1]
						}else{
							_self.tipMsg("请扫描正确的邀请码");
						}
						
				    }
				});

			},
			goPakPage(){
				uni.navigateTo({
					url:"product_pak"
				})
			},
			//下一步
			goNextStep(i){
				
				if(i == 0){
					
					uni.request({
					    url: _self.$httpUrl+'index.php/api/recommend/dobuy', 
						method:"POST",
						data:{
							user_id:_self.loginInfo.uid,
							invitecode:_self.inviteCode
						},
					    success: (res) => {
					     
					      console.log(res);
						  
						  if(res.data.status == 1){
							
								uni.navigateTo({
									url:"../pay/pay_index?orderid="+res.data.result.order_sn + "&paynum=399"
								})
							
						  }else{
							  uni.showToast({
							  	title:res.data.msg,
								icon:""
							  })
						  }
						  
					    },fail: (e) => {
							
					    },complete: (e) => {
							
					    }
					});
					
					
					
				}else if(i == 1){
					uni.navigateTo({
						url:"product_pak"
					})
				}else if(i == 2){
					uni.navigateTo({
						url:"look_order"
					})
				}
				
				
			},
			getData(){
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/recommend/buyvip', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						
						var entity = res.data.result;
						//1代表领取过了0 代表没有领取
						_self.isGet = entity.ordercount;
						//0普通会员 非普通会员皆可领
						_self.isVip = entity.userinfo.levelid;
						
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
			},
			changePayType(i){
				_self.currentIndex = i;
			},
			lookRuleDetail(){
				var mbr = _self.isVip == 0 ? "会员" : "非会员"
				uni.navigateTo({
					url:"member_upgrade2?mbr="+mbr
				})
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
	@import url("css/member_upgrade1.css");
</style>
