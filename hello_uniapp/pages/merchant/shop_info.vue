<template>
	<view>
		<toprow2 titleval="店铺详情"></toprow2>
		
		<view class="top_free">
			
			<image class="img_part" :src="imgUrl" mode="widthFix"></image>
			
			
			<view class="purple_btn up" @click="upImg">上传/更换详情图片</view>
			<view class="purple_btn ok" @click="confirmUpdate">确认本次修改</view>
		</view>
	</view>
</template>


<script>
	
	var _self;
	export default{
		
		data() {
			return {
				storeId:"",
				imgUrl:""
			}
		},
		onLoad(opt) {
			_self = this;
			console.log(opt);
			if(opt.id != undefined){ 
				_self.storeId = opt.id;
				_self.getShopInfo();
			}
		},
		components:{
		},
		methods:{
			//查询店铺已有信息
			getShopInfo(){
				
				uni.request({
					url: _self.$httpUrl+'index.php/api/store/getstore', 
					method:"POST",
					data:{
						storeid:_self.storeId
					},
					success: (res) => {
					 
					  console.log(res);
					  
					  if(res.data.status == 1){
						  _self.imgUrl = res.data.result.storeinfo.biref;
						  
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
			upImg(){
				
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //相册或相机
				    success: function (res) {
						//console.log(res.tempFiles);
						var tempFilePaths = res.tempFiles[0].path;
						//将图片传到服务器
						uni.uploadFile({
							url: _self.$httpUrl+'index.php/Api/Store/uploadImgFile', 
							filePath: tempFilePaths,
							name: 'image',
							formData:{
								"names":"image",
								"dirs":"shopDetail"
							},
							success: (res) => {
								var dataEntity = JSON.parse(res.data);
								console.log(dataEntity);
								if(dataEntity.status == "1"){
									_self.imgUrl = dataEntity.result.result[0];
								}else{
									uni.showToast({
										icon:"none",
										title:dataEntity.msg
									})
								}
								
								
								
							},fail: (e) => {
								
						    },complete: (e) => {
								
						    }
						});
						
						
						
				    }
				});
				
				
			},
			confirmUpdate(){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/setbiref', 
					method:"POST",
					data:{
						storeid:_self.storeId,
						biref:_self.imgUrl
					},
				    success: (res) => {
					  console.log(_self.storeId);
					  console.log(_self.imgUrl);
				      console.log(res);
					  
					  if(res.data.status == 1){
						uni.showToast({
							title:"设置成功！！！",
							icon:"none"
						})
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
	
	@import url("css/shop_info.css");
	
</style>
