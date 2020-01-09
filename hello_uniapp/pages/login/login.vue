<template>
	<view>
		
		<toprow2 titleval="登录" isShowBack="false"></toprow2>
		<view class="top_free">
			
			<!-- #ifndef APP-PLUS || MP-WEIXIN -->
			<button type="primary" @click="appLoginTest">电脑端测试授权登录</button>
			<button type="primary" @click="clearLoginTest">清空测试授权登录</button>
			<!-- #endif -->
			
			<!-- #ifndef MP-WEIXIN -->
			<image v-if="!isShowBind" class="wxLoginImg" @click="appLogin" :src="getImgSrc('tuijian/tj41.png')" mode="widthFix"></image>
			<view v-if="!isShowBind" class="wxLoginBtn" @click="appLogin">微信授权登录</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN -->
			<image v-if="!isShowBind" class="wxLoginImg" :src="getImgSrc('tuijian/tj41.png')" mode="widthFix"></image>
			<button v-if="!isShowBind" class="wxLoginBtn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">微信授权登录</button>
			<!-- #endif -->
			
			<view v-if="isShowBind" class="phone_block">
				
				<view class="phone_input">
					<view class="phone_line one">
						<input type="number" maxlength="11" v-model="phone" placeholder="请输入手机号" />
					</view>
					<view class="phone_line two">
						<input type="text" v-model="phoneCode" placeholder="请输入验证码" />
						<view class="check_code" v-if="canGet" @click="getPhoneCode">获取验证码</view>
						<view class="check_code wait" v-if="!canGet">{{time1}}s后重新获取</view>
					</view>
				</view>
				
				<button class="purple_btn next_btn" @click="bindPhone">绑定手机号</button>
				
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	
	var _self;
	var timer;
	export default {
		data() {
			return {
				//登录后返回的页面
				backPage:"../index/index",
				//打开页面的类型[1 : redirectTo 2 : switchTab]
				backType:2,
				//授权信息
				authorization:{},
				//用户信息
				userInfo:{},
				//手机号
				phone:"",
				//验证码
				phoneCode:"",
				//是否显示绑定
				isShowBind:false,
				canGet:true,
				time1:60
				
			}
		},
		onLoad(opt) {
			_self=this;
			
			console.log(opt);
			
			if(opt.backpage != undefined && opt.backtype != undefined){
				_self.backPage = opt.backpage;
				_self.backType = opt.backtype;
			}
			
		},
		methods: {
			//清空测试授权登录缓存
			clearLoginTest(){
				try {
				    uni.removeStorageSync('u_id');
				    uni.removeStorageSync('u_token');
				    uni.removeStorageSync('u_head');
				    uni.removeStorageSync('u_name');
					uni.showToast({
						title:"已清空登录缓存"
					})
				} catch (e) {
				    // error
				}
			},
			appLoginTest(){
				//这里请求接口
				// #ifndef APP-PLUS
				uni.request({
					url: _self.$httpUrl+'index.php/api/usersup/Wxlogin', 
					method:"POST",
					data:{
						unionid:"oInzxw1b1Wl9CSM8ssBmPvzz32Nk",
						openid:"ozwOb5V3rR_Ujz5bXq3_eqWor4-U",
						oauth:'weixin',
						head_pic:"https://wx.qlogo.cn/mmopen/vi_32/4V9ZTRP6ic792IDqphTZGGKcJSb4w7TVj9RONediawicoqhU7Hr540TWibayZKsUX99rwl36DaoyGeQtfAibm78ib4TA/132",
						nickname:"nil"
					},
					success: (resss) => {
						console.log("电脑端测试登录接口返回：",resss);
						if(resss.data.status == "1"){
							var userData = resss.data.result.data;
							try{
								uni.setStorageSync("u_openid","ozwOb5V3rR_Ujz5bXq3_eqWor4-U");
								uni.setStorageSync("u_id",userData.user_id);
								uni.setStorageSync("u_token",userData.token);
								uni.setStorageSync("u_name","nil");
								uni.setStorageSync("u_head","https://wx.qlogo.cn/mmopen/vi_32/4V9ZTRP6ic792IDqphTZGGKcJSb4w7TVj9RONediawicoqhU7Hr540TWibayZKsUX99rwl36DaoyGeQtfAibm78ib4TA/132");
								// 跳转
								if(_self.backType == 1){
									uni.redirectTo({url:_self.backPage});
								}else{
									console.log("返回的页面",_self.backPage);
									uni.switchTab({
										url:_self.backPage
									})
								}
							
							}catch(e){
								//TODO handle the exception
							}
						}
						
					},fail: (e) => {
						
					},complete: (e) => {
						
					}
				});
				// #endif
			},
			getPhoneCode(){
				
				if(!_self.checkPhone(_self.phone)){
					return;
				}
				
				uni.request({
					url: _self.$httpUrl+'index.php/api/Usersup/sendInfomes', 
					method:"POST",
					data:{
						mobile:_self.phone * 1,
						scene:1
					},
					success: (res) => {
						
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						
						if(res.data.status == 1){
							_self.timeDown();
							_self.canGet = false;
						}
						
					},fail: (e) => {
						
					},complete: (e) => {
						
					}
				
				});
				
			},
			appLoginWx(){
					
				// #ifdef MP-WEIXIN
				
				uni.getProvider({
				  service: 'oauth',
				  success: function (res) {
					if (~res.provider.indexOf('weixin')) {
						
						uni.login({
							provider: 'weixin',
							success: (res) => {
								_self.authorization = res.code;
								
								uni.getUserInfo({
									provider: 'weixin',
									success: (info) => {
										_self.userInfo = info.userInfo;
										console.log("AA:",info.userInfo);
										//这里请求接口
										uni.request({
											url: _self.$httpUrl+'index.php/api/usersup/getsessionkey', 
											method:"POST",
											data:{
												code:res.code
												// encryptedData:info.encryptedData,
												// iv:info.iv
											},
											success: (ces) => {
												if(ces.data.status == 1){
													
													var thisOpenId = ces.data.result.openid;
													var thisSessionKey = ces.data.result.session_key;
													var thisUnionId = ces.data.result.unionid;
													_self.userInfo.unionId = thisUnionId;
													_self.userInfo.openId = thisOpenId;
													console.log("BB:",ces.data.result);
															//这里请求接口
															uni.request({
																url: _self.$httpUrl+'index.php/api/usersup/Wxlogin', 
																method:"POST",
																data:{
																	unionid:_self.userInfo.unionId,
																	openid:_self.userInfo.openId,
																	oauth:'weixin',
																	head_pic:_self.userInfo.avatarUrl,
																	nickname:_self.userInfo.nickName
																},
																success: (resss) => {
																	
																	if(resss.data.status == "1"){
																		var userData = resss.data.result.data;
																		try{
																			uni.setStorageSync("u_id",userData.user_id);
																			uni.setStorageSync("u_token",userData.token);
																			uni.setStorageSync("u_name",_self.userInfo.nickName);
																			uni.setStorageSync("u_head",_self.userInfo.avatarUrl);
																			uni.setStorageSync("u_openid",_self.userInfo.openId);
																			// 跳转
																			if(_self.backType == 1){
																				uni.redirectTo({url:_self.backPage});
																			}else{
																				uni.switchTab({url:_self.backPage});
																			}
																		
																		}catch(e){
																			//TODO handle the exception
																		}
																	}else if(resss.data.status == -3){
																		uni.showToast({
																			title:"请绑定手机号",
																			icon:"none"
																		})
																		
																		_self.isShowBind = true;
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
															
														
												}else{
													_self.tipMsg("登录失败！")
												}

												
											},fail: (e) => {
												
											},complete: (e) => {
												
											}
										});
									
									},
									fail: () => {
										uni.showToast({title:"微信登录授权失败",icon:"none"});
									}
								})
						
							},
							fail: () => {
								uni.showToast({title:"微信登录授权失败",icon:"none"});
							}
						})
						
					}else{
						uni.showToast({
							title: '请先安装微信或升级版本',
							icon:"none"
						});
					}
				  }
				});
				
				//#endif
					
			},
			appLogin(){
					
				// #ifdef APP-PLUS
				
				uni.getProvider({
				  service: 'oauth',
				  success: function (res) {
				    console.log(res.provider);
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: (res) => {
							  
								_self.authorization = res.authResult;
								
								uni.getUserInfo({
									provider: 'weixin',
									success: (info) => {
										_self.userInfo = info.userInfo;
										//这里请求接口
										uni.request({
											url: _self.$httpUrl+'index.php/api/usersup/Wxlogin', 
											method:"POST",
											data:{
												unionid:_self.userInfo.unionId,
												openid:_self.userInfo.openId,
												oauth:'weixin',
												head_pic:_self.userInfo.avatarUrl,
												nickname:_self.userInfo.nickName
											},
											success: (resss) => {
												
												if(resss.data.status == "1"){
													var userData = resss.data.result.data;
													try{
														uni.setStorageSync("u_id",userData.user_id);
														uni.setStorageSync("u_token",userData.token);
														uni.setStorageSync("u_name",_self.userInfo.nickName);
														uni.setStorageSync("u_head",_self.userInfo.avatarUrl);
														uni.setStorageSync("u_openid",_self.userInfo.openId);
														// 跳转
														if(_self.backType == 1){
															uni.redirectTo({url:_self.backPage});
														}else{
															uni.switchTab({url:_self.backPage});
														}
													
													}catch(e){
														//TODO handle the exception
													}
												}else if(resss.data.status == -3){
													uni.showToast({
														title:"请绑定手机号",
														icon:"none"
													})
													
													_self.isShowBind = true;
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
										
										
										
									},
									fail: () => {
										uni.showToast({title:"微信登录授权失败",icon:"none"});
									}
								})
							},
							fail: () => {
								uni.showToast({title:"微信登录授权失败",icon:"none"});
							}
						})
					}else{
						uni.showToast({
							title: '请先安装微信或升级版本',
							icon:"none"
						});
					}
				  }
				});
				
				//#endif
					
			},
			bindPhone(){
				
				
				if(!_self.checkPhone(_self.phone)){
					return;
				}
				
				if(_self.phoneCode.trim() == ""){
					uni.showToast({
						title:"请输入验证码",
						icon:"none"
					})
					return;
				}
				uni.request({
					url: _self.$httpUrl+'index.php/api/usersup/bindmobile', 
					method:"POST",
					data:{
						unionid:_self.userInfo.unionId,
						mobile:_self.phone,
						code:_self.phoneCode,
						openid:_self.userInfo.openId,
						oauth:'weixin',
						head_pic:_self.userInfo.avatarUrl,
						nickname:_self.userInfo.nickName
					},
					success: (res) => {
						if(res.data.status == "1"){
							var userData = res.data.result;
							try{
								uni.setStorageSync("u_id",userData.user_id);
								uni.setStorageSync("u_token",userData.token);
								uni.setStorageSync("u_name",_self.userInfo.nickName);
								uni.setStorageSync("u_head",_self.userInfo.avatarUrl);
								uni.setStorageSync("u_openid",_self.userInfo.openId);
								// 跳转
								if(_self.backType == 1){
									uni.redirectTo({url:_self.backPage});
								}else{
									uni.switchTab({url:_self.backPage});
								}
							
							}catch(e){
								//TODO handle the exception
							}
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
			},
			//倒计时
			timeDown(){
				clearInterval(timer);
				_self.time1 = 60;
				timer = setInterval(function(){
					_self.time1 = _self.time1 - 1;
					if(_self.time1 < 1){
						clearInterval(timer);
						_self.canGet = true;
						_self.time1 = 60;
					}
				},1000);
			}
		}
	}
	
</script>

<style>
	
	@import url("css/login.css");
	
</style>
