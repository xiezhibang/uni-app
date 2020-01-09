<template>
	<view>
		<view class="head_out">
			<view class="title_padding"></view>
			<view class="head_row">
				<view class="back_before" @click="backBeforePage">
					<image :src="getImgSrc('back/back2.png')" mode="widthFix"></image>
				</view>
				提现
				<view @click="goLog2" class="cash_log_entrance">提现记录</view>
				
			</view>
		</view>
		
		
		<view class="top_free">
			
			<view class="main_block">
				<text>提现金额</text>
				<view class="input_cash">
					￥
					<input type="number" v-model="moneyNum" maxlength="14"/>
					<view class="all_ti" @click="allMoneyUp">全部</view>
				</view>
				
				<view class="can_num">可提现金额：￥{{totalMoney}}</view>
				
				<view class="card_row" @click="goChangeCard">
					<view class="left_row">
						到账银行卡
					</view>
					<view class="right_row">
						<text v-if="cardTail == ''">添加银行卡</text>
						<text v-else>{{cardInfo.bankname}}({{cardTail}})</text>
						<image class="icon_arrow" mode="widthFix" :src="getImgSrc('person/my4.png')"></image>
					</view>
				</view>
				
				
			</view>
			
		</view>
		
		<button class="purple_btn" @click="tiXian">提现</button>
		
	</view>
</template>


<script>
	
	var _self;
	
	export default{
		
		data() {
			return {
				currentIndex:0,
				loginInfo:{},
				//提现金额
				moneyNum:"",
				//可提现金额
				totalMoney:0,
				cardInfo:{},
				storeId:"",
				cardTail:""
			}
		},
		onLoad(opt) {
			_self = this;
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			if(opt.money != undefined && opt.id != undefined){
				_self.totalMoney = opt.money;
				_self.storeId = opt.id;
			}
			try {
				_self.cardTail = "";
			    uni.removeStorageSync('bank_card2');
			} catch (e) {
			    // error
			}
			this.getDefaultCard();
		},
		onShow() {
			_self = this;
			try {
			    var card = uni.getStorageSync('bank_card2');
			    if (card) {
			        _self.cardInfo = card;
					_self.cardTail = card.bankcode.slice(-4);
					console.log(card);
			    }else{
					_self.getDefaultCard();
				}
			} catch (e) {
			    // error
			}
		},
		components:{
			
		},
		methods:{
			//提现记录
			goLog2(){
				uni.navigateTo({
					url:"cash_log2?id="+_self.storeId
				})
			},
			//添加、更换银行卡
			goChangeCard(){
				uni.navigateTo({
					url:"bank_card2?id="+_self.storeId
				})
			},
			//提现
			tiXian(){
				
				if(_self.moneyNum == "" || _self.moneyNum * 1 > _self.totalMoney * 1 || _self.moneyNum * 1 <= 0){
					_self.tipMsg("请输入正确的金额");
					return;
				}
				
				var dataObj = {
						bankcode:_self.cardInfo.bankcode,
						bankname:_self.cardInfo.bankname,
						price:_self.moneyNum * 1,
						realname:_self.cardInfo.realname,
						type:2,
						storeid:_self.storeId,
						user_id:_self.loginInfo.uid
					};
					
				
				console.log(dataObj);
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/withdraw', 
					method:"POST",
					data:dataObj,
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
							
							_self.totalMoney = _self.totalMoney * 1 - _self.moneyNum * 1;
							
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
			//获取默认银行卡
			getDefaultCard(){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/getUserOrstorebank', 
					method:"POST",
					data:{
						type:2,
						storeid:_self.storeId,
						user_id:_self.loginInfo.uid
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
							_self.cardInfo = res.data.result;
							_self.cardTail = _self.cardInfo.bankcode.slice(-4);
							uni.setStorageSync("bank_card2",res.data.result);
					  }else{
						  _self.cardTail = "";
						  /* uni.showToast({
						  	title:res.data.msg,
							icon:"none"
						  }) */
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
			},
			
			changePayType(i){
				_self.currentIndex = i;
			},
			allMoneyUp(){
				_self.moneyNum = _self.totalMoney;
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
	
	@import url("css/withdraw_deposit2.css");
	
</style>
