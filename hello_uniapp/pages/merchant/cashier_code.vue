<template>
	<view>
		<toprow2 titleval="收银码"></toprow2>
		
		<view class="top_free">
			<view class="ewm_box">
				
				<view class="shop_head">
					<image :src="shopInfo.storeinfo.backgroundimg"></image>
					<view class="shop_name">{{shopInfo.storeinfo.storename}}</view>
					<view class="shop_id">ID：{{shopInfo.storeinfo.id}}</view>
				</view>
				
				<view class="ewm_img_container">
					<image :src="shopInfo.qrcode"></image>
					<view class="tip">本店铺收银码</view>
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
			1、顾客打开聚富财码APP或小程序<br/>
			2、点击首页左上角的扫码付款扫取店铺的收银码<br/>
			3、扫码后识别所拥有的本店铺优惠券列表<br/>
			4、选择可使用的优惠券进行商品支付
		</view>
		
	</view>
</template>

<script>
	
	var _self;
	export default{
		data(){
			return {
				openSettingBtnHidden: true,//是否授权
				storeId:0,
				shopInfo:{
					qrcode:"",
					storeinfo:{
						backgroundimg:"",
						storename:"",
						id:""
					}
				}
			}
		},
		components:{
		},
		onLoad(opt) {
			_self = this;
			if(opt.id != undefined){
				_self.storeId = opt.id;
				_self.getEwm();
			}
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
				    url: _self.$httpUrl+'index.php/api/Store/getStoreqrcode', 
					method:"POST",
					data:{
						storeid:_self.storeId
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.shopInfo = res.data.result;
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
									url: _self.shopInfo.qrcode,//图片地址
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
	@import url("css/cashier_code.css");
</style>

