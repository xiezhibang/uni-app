<template>
	<view>
		<toprow2 titleval="会员邀请"></toprow2>
		
		<view class="top_free">
			<view class="ewm_box">
				
				<view class="ewm_desc">分享聚富财码APP<br/>扫一扫开始赚钱吧！</view>
				
				<view class="ewm_img_container">
					<image :src="ewmImg"></image>
					<view class="tip">我的推荐码</view>
				</view>
				
				
			</view>
		</view>
		
		<!-- #ifndef MP-WEIXIN -->
		<view class="purple_btn btn_box" @click="saveImgToLocal">
			保存到相册
		</view>
		<!-- #endif -->
		
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="openSettingBtnHidden" class="purple_btn btn_box" @click="saveEwm">
			保存到相册
		</view>
		
		<button v-else class="purple_btn btn_box" hover-class="none" open-type="openSetting" @opensetting='handleSetting'>保存到相册</button>
		<!-- #endif -->
		
		<view class="useMethod">
			1、邀请未升级会员的朋友打开聚富财码APP或小程序<br/>
			2、进入会员升级购买页扫取您的推荐码<br/>
			3、朋友扫取您的推荐码后注册会员则推荐成功<br/>
		</view>
		
	</view>
</template>

<script>
	
	var _self;
	export default{
		data(){
			return {
				openSettingBtnHidden: true,//是否授权
				uid:0,
				canSave:true,
				ewmImg:"",
				ecode:null
			}
		},
		onLoad(opt) {
			_self = this;
			if(opt.uid != undefined){
				_self.uid = opt.uid;
				_self.getEwm();
			}
		},
		components:{
		},
		methods:{
			//微信小程序保存到相册
			handleSetting(e){
				if (!e.detail.authSetting['scope.writePhotosAlbum']) {
				      _self.openSettingBtnHidden = false;
				} else {
					 _self.openSettingBtnHidden = true;
				}
			},
			//获取推荐码
			getEwm(){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/recommend/getUserqrcode', 
					method:"POST",
					data:{
						user_id:_self.uid
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.ecode = res.data.result.code;
						_self.ewmImg = res.data.result.qrcode;
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
			},
			saveEwm:function(e){
				//获取相册授权
				   uni.getSetting({
				     success(res) {
				       if (!res.authSetting['scope.writePhotosAlbum']) {
				         uni.authorize({
				           scope: 'scope.writePhotosAlbum',
				           success() {
				             //这里是用户同意授权后的回调
				             _self.saveImgToLocal();
				           },
				           fail() {//这里是用户拒绝授权后的回调
				               _self.openSettingBtnHidden=false
				           }
				         })
				       } else {//用户已经授权过了
				         _self.saveImgToLocal();
				       }
				     }
				   })
			},
			saveImgToLocal:function(e){
				
				uni.showModal({
				    title: '提示',
				    content: '确定保存到相册吗',
				    success: function (res) {
				        if (res.confirm) {
							
							uni.downloadFile({
									url: _self.ewmImg,//图片地址
									success: (res) =>{
										if (res.statusCode === 200){
											uni.saveImageToPhotosAlbum({
												filePath: res.tempFilePath,
												success: function() {
													uni.showToast({
														title: "保存成功",
														icon: "none"
													});
												},
												fail: function() {
													uni.showToast({
														title: "保存失败",
														icon: "none"
													});
												}
											});
										} 
									}
								})
							
							
				        } else if (res.cancel) {
							
				        }
				    }
				});
				
			}
		}
	}
	
</script>

<style>
	@import url("css/ewm_share.css");
</style>

