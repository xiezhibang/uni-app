<template>
	<view>
		<view class="head_out">
			<view class="title_padding"></view>
			<view class="head_row">
				<view class="back_before" @click="backBeforePage">
					<image :src="getImgSrc('back/back2.png')" mode="widthFix"></image>
				</view>
				招牌商品
				
				<view class="add_box" @click="showAddBox">
					<image :src="getImgSrc('shangjia/sj1.png')" mode="widthFix"></image>
				</view>
				
			</view>
		</view>
		
		
		<view class="top_free">
			
			<view class="list_box">
				
				<view class="list_item" v-for="(item,index) of goods" :key="index">
					<view class="img_coat">
						<image :src="item.original_img"></image>
					</view>
					<view class="item_name">
						{{item.goods_name}}
						<image :src="getImgSrc('shangjia/sj15.png')" :data-id="item.goods_id" @click="removeGoods"></image>
					</view>
					<view class="item_price">￥{{item.shop_price}}</view>
				</view>
				
			</view>
			
			<noData v-if="listIsFree"></noData>
		
		
		</view>
		
		<!-- 店铺标签弹窗 -->
		<view class="frame_box" v-if="showAddWindow">
			
			<view class="box_div">
				<view class="box_title">添加商品</view>
				
				<view class="img_box">
					
					添加图片
					<!-- <image :src="imgSrc"></image> -->
					<avatar class="upAddImg"
						selWidth="660upx" selHeight="400upx" @upload="myUpload" :avatarSrc="imgSrc"
						avatarStyle="width: 330upx; height: 200upx; border-radius:1upx;">
					</avatar>
				</view>
				
				<input class="input_block" type="text" v-model="goodsName" placeholder="请输入商品名字" maxlength="16"/>
				<input class="input_block" type="number" v-model="goodsPrice" placeholder="请输入商品价格" maxlength="7"/>
				<view class="box_control">
					<view class="box_btn" @click="addGoods(0)">取消</view>
					<view class="box_btn cb" @click="addGoods(1)">添加</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	var _self;
	export default {
		data() {
			return {
				listIsFree:false,
				storeId:0,
				goods:[],
				showAddWindow:false,
				goodsName:"",
				goodsPrice:"",
				imgSrc:""
			}
		},
		components:{
			avatar
		},
		onLoad(opt) {
			_self=this;
			if(opt.id != undefined){
				console.log(opt.id);
				_self.storeId = opt.id;
				_self.getShopInfo();
			}
		},
		methods: {
			//移除商品
			removeGoods(e){
				var gid=e.currentTarget.dataset.id;
				console.log(e);
				if(gid != ""){
					uni.showModal({
					    title: '提示',
					    content: '确认删除该商品吗？',
					    success: function (res) {
					        if (res.confirm) {
								
								uni.request({
									url: _self.$httpUrl+'index.php/api/store/delgoods', 
									method:"POST",
									data:{
										goods_id:gid * 1
									},
									success: (ress) => {
									  console.log(gid);
									  console.log(ress);
									  if(ress.data.status == 1){
										 _self.getShopInfo();
										  
									  }else{
										  uni.showToast({
											icon:"none",
											title:ress.data.msg
										  })
									  }
									  
									},fail: (e) => {
										
									},complete: (e) => {
									}
								});
								
					            
					        } else if (res.cancel) {
					           
					        }
					    }
					});
				}

			},
			myUpload(rsp){
				console.log(rsp);
				_self.imgSrc = rsp.path; //更新头像方式一
				_self.upImg(rsp.path);
			},
			upImg(tempFilePaths){
				//将图片传到服务器
				uni.uploadFile({
					url: _self.$httpUrl+'index.php/Api/Store/uploadImgFile', 
					filePath: tempFilePaths,
					name: 'image',
					formData:{
						"names":"image",
						"dirs":"shopSet"
					},
					success: (res) => {
						var dataEntity = JSON.parse(res.data);
						//console.log(dataEntity);
						if(dataEntity.status == "1"){
							_self.imgSrc = dataEntity.result.result[0];
							
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
			},
			//添加商品
			addGoods(flag){
				_self.showAddWindow = false;
				
				if(flag == 1){
					
					if(_self.imgSrc.trim() == ""){
						_self.tipMsg("请上传商品图片");
						return;
					}
					
					if(_self.goodsName.trim() == ""){
						_self.tipMsg("请填写商品名字");
						return;
					}
					
					if(_self.goodsPrice.trim() == ""){
						_self.tipMsg("请填写商品价格");
						return;
					}
					
					
					uni.request({
						url: _self.$httpUrl+'index.php/api/store/addStoregood', 
						method:"POST",
						data:{
							goods_name:_self.goodsName,
							original_img:_self.imgSrc,
							shop_price:_self.goodsPrice * 1,
							storeid:_self.storeId
						},
						success: (res) => {
						  console.log(_self.storeId);
						  console.log(res);
						  
						  if(res.data.status == 1){
							 uni.showToast({
								icon:"none",
								title:"添加成功"
							 })
							 
							 _self.getShopInfo();
							  
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
				
			},
			//显示添加弹窗
			showAddBox(){
				_self.showAddWindow = !_self.showAddWindow;
			},
			//查询店铺已有信息
			getShopInfo(){
				
				uni.request({
					url: _self.$httpUrl+'index.php/api/store/getStoregoods', 
					method:"POST",
					data:{
						storeid:_self.storeId
					},
					success: (res) => {
					 
					  console.log(res);
					  
					  if(res.data.status == 1){
						  _self.goods = res.data.result;
						  
					  }else{
						  uni.showToast({
							icon:"none",
							title:res.data.msg
						  })
					  }
					  
					  if(_self.goods.length <= 0){
					  	_self.listIsFree = true;
					  }else{
					  	_self.listIsFree = false;
					  }
					  
					},fail: (e) => {
						
					},complete: (e) => {
					}
				});
				
			},
			backBeforePage(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
	
</script>

<style>
	
	@import url("css/brand_goods.css");
	
</style>
