<template>
	<view class="recommend_page" v-if="totalData.agentusernum != undefined">
		
		<view class="title_padding fix"></view>
		<view class="title_padding"></view>
		
		<view class="top_box">
			
			<image @click="lookRule" class="member_icon" :src="getImgSrc('tuijian/tj2.png')"></image>
			
			<!-- 个人头像信息 -->
			<view class="tj_personInfo">
				<image class="person_head" :src="loginInfo.head"></image>
				<view class="name">{{loginInfo.name}}</view>
				<view class="member_name" @click="goUpMember">{{memberGrade}} ✚</view>
			</view>
		</view>
		
		<view class="tuijian_column">
			<navigator open-type="navigate" :url="'../recommend/ewm_share?uid='+loginInfo.uid">
				<view class="tj_item">
					<image :src="getImgSrc('tuijian/tj21.png')" mode="widthFix"></image>
					<view class="tj_word">去推荐</view>
				</view>
			</navigator>
			
			<navigator open-type="navigate" url="../recommend/profit_list">
				<view class="tj_item">
					<image :src="getImgSrc('tuijian/tj23.png')" mode="widthFix"></image>
					<view class="tj_word">推荐收益</view>
				</view>
			</navigator>
			
			<navigator open-type="navigate" url="../recommend/recommend_detail">
				<view class="tj_item">
					<image :src="getImgSrc('tuijian/tj22.png')" mode="widthFix"></image>
					<view class="tj_word">推荐详情</view>
				</view>
			</navigator>
			
		</view>
		
		<!-- 推荐详情 -->
		<view class="tuijian_detail_box">
			
			<view class="tuijan_row_item">
				<view class="tj_top_row">
					<image :src="getImgSrc('tuijian/tj24.png')" mode="widthFix"></image>
					<view>推荐朋友（{{totalData.agentusernum}}人）</view>
				</view>
				<view class="tj_bottom_row">
					<view class="tj_cotent">
						<view class="money_line">￥{{totalData.agentusermoney.totalmoney}}</view>
						<view class="money_letter">累计奖励</view>
					</view>
					<view class="tj_cotent">
						<view class="money_line">￥{{totalData.agentusermoney.todaymoney}}</view>
						<view class="money_letter">今日分成</view>
					</view>
					<view class="tj_cotent">
						<view class="money_line">￥{{totalData.agentusermoney.monthmoney}}</view>
						<view class="money_letter">本月分成</view>
					</view>
				</view>
			</view>
			
			<view class="tuijan_row_item">
				<view class="tj_top_row">
					<image :src="getImgSrc('tuijian/tj26.png')" mode="widthFix"></image>
					<view>推荐商家（{{totalData.agentstorenum}}人）</view>
				</view>
				<view class="tj_bottom_row">
					<view class="tj_cotent">
						<view class="money_line">￥{{totalData.agentstoremoney.totalmoney}}</view>
						<view class="money_letter">累计奖励</view>
					</view>
					<view class="tj_cotent">
						<view class="money_line">￥{{totalData.agentstoremoney.todaymoney}}</view>
						<view class="money_letter">今日分成</view>
					</view>
					<view class="tj_cotent">
						<view class="money_line">￥{{totalData.agentstoremoney.monthmoney}}</view>
						<view class="money_letter">本月分成</view>
					</view>
				</view>
			</view>
			
			<view class="tuijan_row_item">
				<view class="tj_top_row">
					<image :src="getImgSrc('tuijian/tj25.png')" mode="widthFix"></image>
					<view>推荐合伙人（{{totalData.partnernum}}人）</view>
				</view>
				<view class="tj_bottom_row">
					<view class="tj_cotent">
						<view class="money_line">￥{{totalData.partnermoney.totalmoney}}</view>
						<view class="money_letter">累计奖励</view>
					</view>
					<view class="tj_cotent">
						<view class="money_line">￥{{totalData.partnermoney.todaymoney}}</view>
						<view class="money_letter">今日分成</view>
					</view>
					<view class="tj_cotent">
						<view class="money_line">￥{{totalData.partnermoney.monthmoney}}</view>
						<view class="money_letter">本月分成</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<!-- 广告 -->
		<view class="ad_brick">
			<image :src="getImgSrc('tuijian/tj1.png')" mode="widthFix"></image>
		</view>
		
		<loading v-if="loadData"></loading>
		
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				loadData:true,
				loginInfo:{},
				totalData:{},
				memberGrade:'会员'
			}
		},
		onLoad() {
			_self=this;
		},
		onShareAppMessage() {
			return {
				title: "来和我一起Get新技能吧！",
				path: '/pages/index/index',
				imageUrl:'http://www.jfcma.com/public/images/jfcm/logo.png'
			}
		},
		onShow() {
			_self=this;
			var loginRes = this.checkLogin('../index/recommend', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			this.showData();
		},
		methods: {
			lookRule(){
				uni.navigateTo({
					url:"../recommend/member_upgrade2?mbr="+_self.memberGrade
				})
			},
			//去升级会员
			goUpMember(){
				
				uni.navigateTo({
					url:"../recommend/member_upgrade1"
				})
					
			},
			//基本推荐数据
			showData(){
				//console.log(_self.loginInfo.uid);
				uni.request({
				    url: _self.$httpUrl+'index.php/api/Recommend/myRecommend', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid
					},
				    success: (res) => {
				     
				      //console.log(res);
					  
					  if(res.data.status == 1){
						_self.totalData = res.data.result;
						var grade = res.data.result.userinfo.levelid;
						var str = '会员';
						switch(grade){
							case 0:str = "会员";break;
							case 7:str = "掌柜";break;
							case 8:str = "运营商";break;
							case 9:str = "城市运营商";break;
						}
						_self.memberGrade = str;
						
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						_self.loadData = false;
				    }
				});
				
			}
		}
	}
	
</script>

<style>
	@import url("css/recommend.css");
	@import url("css/animate.css");
</style>
