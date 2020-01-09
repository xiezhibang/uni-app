<template>
	<view class="personal_page">
		
		<!-- 客服留言 -->
		<view class="msg_board" v-if="showBoard">
			
			<view class="say_block">
				
				<view class="say_line title">留言</view>
				<view class="say_line desc">客服已经离线了，有问题可以先给我们留言，我们会在工作日内尽快给予您回复</view>
				
				<textarea class="say_line text_area" v-model="lyContent" maxlength="50" placeholder="请留言" />
				
				<view class="say_line must_tip">留下以下信息，方便与您及时联系</view>
				
				<view class="say_line ipt_view">姓名：<input type="text" v-model="lyName" maxlength="12" placeholder="必填" /></view>
				<view class="say_line ipt_view">电话：<input type="number" v-model="lyPhone" maxlength="11" placeholder="必填" /></view>
				
				<view class="say_btn" @click="commitMsg">提交留言</view>
				
				<view class="say_btn grey" @click="closeMsg">取消留言</view>
				
			</view>
			
		</view>
		
		
		<!-- 顶部 -->
		<view class="title_padding fix"></view>
		<view class="title_padding"></view>
		
		<view class="top_box">
			<navigator open-type="navigate" url="/pages/personal/message">
				<view class="bell_dot" v-if="hasNews"></view>
				<image class="bell_img" :class="{active:hasNews}" :src="getImgSrc('person/my11.png')" mode="widthFix"></image>
			</navigator>
			<view class="pageTitle">个人中心</view>
			<image class="person_headurl" :src="userImg"></image>
			
			<view class="top_box_colorbar_box floatObj">
				<view class="top_box_colorbar floatObj"></view>
			</view>
			
			<view class="p_data floatObj">
				<view class="p_name">{{userName}}<text class="p_id">ID:{{userId}}</text></view>
				<view class="p_money_left floatObj">
					<view class="data_money">￥{{userMoney}}</view>
					<view class="data_letter">
						<view>
						可提余额
						</view>
						
						<view class="link_view" @click="goTiXian">提现</view>
						
					</view>
					
				</view>
				<view class="p_money_right floatObj">
					<view class="data_money">￥{{userRedMoney}}</view>
					<view class="data_letter">
						<view>
						分润余额
						</view>
						
						<view class="link_view" @click="goTiXian">提现</view>
						
					</view>
					
				</view>
			</view>
		</view>
		
		<!-- 余额提现 -->
		<view class="model_bar_box">
			<navigator open-type="navigate" url="/pages/shop/ticket_list">
				<view class="model_bar">
					<image class="mb_icon" mode="widthFix" :src="getImgSrc('person/my3.png')"></image>
					已领活动券
					<image class="mb_arrow" mode="widthFix" :src="getImgSrc('person/my4.png')"></image>
				</view>
			</navigator>
			
			<navigator open-type="navigate" :url="'../personal/update_phone?phone='+userPhone">
				<view class="model_bar">
					<image class="mb_icon" mode="widthFix" :src="getImgSrc('person/my12.png')"></image>
					修改手机号
					<text class="yourPhone">{{userPhone}}</text>
					<image class="mb_arrow" mode="widthFix" :src="getImgSrc('person/my4.png')"></image>
				</view>
			</navigator>
			
		</view>
		
		<!-- 其他操作 -->
		<view class="control_list">
			
			<navigator open-type="navigate" url="../personal/help_centre">
				<view class="model_bar2">
					<image class="mb_icon" mode="widthFix" :src="getImgSrc('person/my2.png')"></image>
					帮助中心
					<image class="mb_arrow" mode="widthFix" :src="getImgSrc('person/my4.png')"></image>
				</view>
			</navigator>
			
			<navigator open-type="navigate" url="../personal/user_guide">
				<view class="model_bar2">
					<image class="mb_icon" mode="widthFix" :src="getImgSrc('person/my14.png')"></image>
					用户协议
					<image class="mb_arrow" mode="widthFix" :src="getImgSrc('person/my4.png')"></image>
				</view>
			</navigator>
			
				<view class="model_bar2" @click="openMsg">
					<image class="mb_icon" mode="widthFix" :src="getImgSrc('person/my6.png')"></image>
					客服留言
					<image class="mb_arrow" mode="widthFix" :src="getImgSrc('person/my4.png')"></image>
				</view>
			
			<navigator open-type="navigate" url="../personal/about_us">
				<view class="model_bar2">
					<image class="mb_icon" mode="widthFix" :src="getImgSrc('person/my1.png')"></image>
					关于我们
					<image class="mb_arrow" mode="widthFix" :src="getImgSrc('person/my4.png')"></image>
				</view>
			</navigator>
			
			<navigator open-type="navigate" url="../personal/privacy_policy">
				<view class="model_bar2">
					<image class="mb_icon" mode="widthFix" :src="getImgSrc('person/my13.png')"></image>
					隐私政策
					<image class="mb_arrow" mode="widthFix" :src="getImgSrc('person/my4.png')"></image>
				</view>
			</navigator>
			
			<view class="model_bar2">
				<image class="mb_icon" mode="widthFix" :src="getImgSrc('person/my111.png')"></image>
				当前版本
				<view class="version_info floatObj">1.1.0</view>
			</view>
		</view>
		
		<!-- 退出按钮 -->
		<view class="quite-btn" @click="quitAccount">安全退出</view>
		
		<!-- 版权信息 -->
		<view class="copyright_info">
			版权归广西无限客网络科技公司所有
			<br/>
			桂ICP备19010398号
		</view>
		
		<loading v-if="loadData"></loading>
		
	</view>
</template>

<script>
	
	var _self;
	export default {
		data() {
			return {
				hasNews:false,
				loadData:true,
				loginInfo:{},
				showBoard:false,
				userName:"默认用户",
				userImg:'http://www.jfcma.com/public/images/jfcm/person/my7.png',
				userId:"",
				userMoney:0,
				userRedMoney:0,
				userPhone:'',
				//留言相关
				lyContent:"",
				lyName:"",
				lyPhone:""
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
			var loginRes = this.checkLogin('../index/personal', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			this.getUserInfo();
			this.isHaveNews();
		},
		methods: {
			//判断是否有新消息
			isHaveNews(){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/Centerup/getstatus', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid
					},
				    success: (res) => {
					  //console.log(res);
					  if(res.data.status == 1){
						  _self.hasNews = true;
					  }else{
						  _self.hasNews = false;
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						_self.loadData = false;
				    }
				});
			},
			//取消留言
			closeMsg(){
				_self.showBoard = false;
			},
			//提交留言
			commitMsg(){
				
				if(_self.lyContent.trim() == ""){
					_self.tipMsg("请填写留言内容");
					return;
				}
				
				if(_self.lyContent.trim() == ""){
					_self.tipMsg("请填写留言姓名");
					return;
				}
				
				if(!_self.checkPhone(_self.lyPhone)){
					return;
				}
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/centerup/guestbook', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid,
						content:_self.lyContent,
						phone:_self.lyPhone,
						username:_self.lyName
					},
				    success: (res) => {
				      //console.log(res);
					  
					  _self.tipMsg(res.data.msg);
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						_self.showBoard = false;
				    }
				});
				
			},
			//去提现
			goTiXian(){
				uni.navigateTo({
					url:"../pay/withdraw_deposit?money="+_self.userMoney
				})
			},
			//安全退出
			quitAccount(){
				try {
					uni.removeStorageSync('u_id');
					uni.removeStorageSync('u_token');
					uni.removeStorageSync('u_head');
					uni.removeStorageSync('u_name');
					var loginRes = _self.checkLogin('../index/personal', '2');
					if(!loginRes){return false;}
				} catch (e) {
					// error
				}
			},
			getUserInfo(){
				
				uni.request({
				    url: _self.$httpUrl+'api/Usersup/center', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid
					},
				    success: (res) => {
				      //console.log("************");
				      //console.log(res);
					  if(res.data.status == 1){
						  var u=res.data.result.list[0];
						  _self.userName = u.nickname;
						  _self.userId = u.user_id;
						  _self.userMoney = u.user_money;
						  _self.userRedMoney = u.rate_money;
						  _self.userImg = u.head_pic;
						  _self.userPhone = u.mobile;
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						_self.loadData = false;
				    }
				});
				
				
			},
			openMsg(){
				_self.showBoard = true;
			}
		}
	}
	
</script>

<style>
	
	@import url("css/personal.css");
	@import url("css/animate.css");
</style>
