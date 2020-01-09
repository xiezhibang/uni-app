<template>
	<view>
		<view class="head_out">
			<view class="title_padding"></view>
			<view class="head_row">
				<view class="back_before" @click="backBeforePage">
					<image :src="getImgSrc('back/back2.png')" mode="widthFix"></image>
				</view>
				银行卡
				<view class="addCard" @click="goAddCard">+</view>
			</view>
		</view>
		
		
		<view class="top_free">
			
			<view class="main_block">
				<block v-for="(item,index) of cardList" :key="index">
					<view class="bank_item" :class="{double:index % 2 == 0}" @click="choiceCard(item)">
						<view class="bank_icon">
							￥
							<image v-if="item.bankname == '中国工商银行'" :src="getImgSrc('card_icon/gsicon.png')" mode=""></image>
							<image v-if="item.bankname == '中国建设银行'" :src="getImgSrc('card_icon/jsicon.png')" mode=""></image>
							<image v-if="item.bankname == '中国银行'" :src="getImgSrc('card_icon/zgicon.png')" mode=""></image>
							<image v-if="item.bankname == '中国农业银行'" :src="getImgSrc('card_icon/nyicon.png')" mode=""></image>
						</view>
						<view class="bank_name">{{item.bankname}}</view>
						<view class="bank_code">{{item.bankcode}}</view>
						<image @click.stop="delCard(item.bankmes_id,item.bankname,item.bankcode)" class="del_img" :src="getImgSrc('shangjia/sj15.png')" mode="widthFix"></image>
					</view>
				</block>

				<noData v-if="listIsFree"></noData>
				
			</view>
			
		</view>
		
	
	</view>
</template>


<script>
	
	var _self;
	
	export default{
		
		data() {
			return {
				listIsFree:false,
				loginInfo:{},
				cardList:[]
			}
		},
		onLoad(opt){
			_self = this;
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
		},
		onShow() {
			this.getBankCardList();
		},
		components:{
			
		},
		methods:{
			//选择该银行卡
			choiceCard(item){
				try{
					uni.setStorageSync("bank_card",item);
					uni.navigateBack({
						delta:1
					})
				}catch(e){
					//TODO handle the exception
				}
			},
			//删除银行卡
			delCard(id,bname,code){
				
				
				uni.showModal({
				    title: '提示',
				    content: '是否解绑'+bname+'卡',
				    success: function (res) {
				        if (res.confirm) {
							
							console.log(id,bname);
							uni.request({
							    url: _self.$httpUrl+'index.php/api/store/deleteBankcard', 
								method:"POST",
								data:{
									type:1,
									user_id:_self.loginInfo.uid,
									bankmes_id:id
								},
							    success: (res) => {
							     
							      console.log(res);
								  
								  if(res.data.status == 1){
										uni.showToast({
											title:"解绑成功",
											icon:"none"
										})
										
										try {
										    var card = uni.getStorageSync('bank_card');
										    if (card) {
												if(card.bankcode == code){
													try {
													    uni.removeStorageSync('bank_card');
													} catch (e) {
													    // error
													}
												}
										    }
										} catch (e) {
										    // error
										}
										
										_self.getBankCardList();
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
							
				          
				        } else if (res.cancel) {
				            
				        }
				    }
				});
				
				

			},
			//去绑卡
			goAddCard(){
				uni.navigateTo({
					url:"add_card"
				})
			},
			//查询银行卡
			getBankCardList(){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/getBanklist', 
					method:"POST",
					data:{
						type:1,
						user_id:_self.loginInfo.uid
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
							_self.cardList = res.data.result;
							_self.listIsFree = false;
					  }else{
						  /* uni.showToast({
						  	title:res.data.msg,
							icon:"none"
						  }) */
						  _self.cardList = [];
						  _self.listIsFree = true;
						  try {
						      uni.removeStorageSync('bank_card');
						  } catch (e) {
						      // error
						  }
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
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
	
	@import url("css/bank_card.css");
	
</style>
