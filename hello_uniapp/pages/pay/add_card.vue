<template>
	<view>
		<toprow2 titleval="添加银行卡"></toprow2>
		
		<view class="top_free">
			<view class="margin_box"></view>
			<view class="line_item">
				<view class="left_box">持卡人：</view>
				<view class="right_box">
					<input type="text" v-model="pname" placeholder="持卡人真实姓名" maxlength="12"/>
				</view>
			</view>
			
			<view class="line_item">
				<view class="left_box">银行卡：</view>
				<view class="right_box">
					<input type="number" @blur="cardNumBlur" v-model="pcard" placeholder="银行卡卡号" maxlength="19"/>
				</view>
			</view>
			
			<view class="line_item">
				<view class="left_box">所属行：</view>
				<view class="right_box">
					<input type="text" v-model="ptype" placeholder="例如(中国工商银行)" maxlength="16"/>
				</view>
			</view>
			<image v-if="bankImg != ''" :src="bankImg" mode="widthFix" class="bank_img"></image>
			<!-- 按钮 -->
			<button class="purple_btn next_btn" @click="bingCard">确认添加</button>
			
		</view>
		
		
	</view>
</template>

<script>
	
	var _self;
	import bankList from "../../common/bank.js"
	export default{
		
		data() {
			return {
				loginInfo:{},
				storeId:0,
				pname:"",
				ptype:"",
				pcard:"",
				bankImg:""
			}
		},
		onLoad(opt) {
			_self = this;
			
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
		},
		components:{
		},
		methods:{
			//失去焦点
			cardNumBlur(e){
				console.log(e.detail.value);
				_self.getCardInfo(e.detail.value);
			},
			//获取银行卡信息
			getCardInfo(card){
				_self.ptype = "";
				_self.bankImg = "";
				uni.request({
				    url:"https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo="+card+"&cardBinCheck=true", 
					method:"GET",
				    success: (res) => {
				     
				      console.log(res);
					  if(res.data.validated){
						 var bank = res.data.bank;
						 var bankWord = bankList.bankList[bank];
						 if(bankWord != undefined){
							 _self.ptype = bankWord;
							 _self.bankImg = "https://apimg.alipay.com/combo.png?d=cashier&t="+bank;
						 }
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
			},
			//绑定银行卡
			bingCard(){
				
				
				if(_self.pname.trim() == ""){
					_self.tipMsg("请输入姓名");
					return;
				}
				
				var pattern = /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/;
				  
			    if (!pattern.test(_self.pcard)) {
				   _self.tipMsg("请输入正确的卡号");
				   return;
				}
				
				if(_self.ptype.trim() == ""){
					_self.tipMsg("请填写所属行");
					return;
				}
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/addBankCard', 
					method:"POST",
					data:{
						bankcode:_self.pcard,
						bankname:_self.ptype,
						realname:_self.pname,
						type:1,
						user_id:_self.loginInfo.uid
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						uni.navigateBack({
							delta:1
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
	@import url("css/add_card.css");
	
</style>
