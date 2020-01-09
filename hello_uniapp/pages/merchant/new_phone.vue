<template>
	<view>
		<toprow2 titleval="换绑手机号"></toprow2>
		
		<view class="top_free">
			
			<view class="phone_block">
				
				<view class="phone_input" v-if="!showNext">
					<view class="phone_line one">
						<input type="number" disabled="true" v-model="phone1" placeholder="请输入原手机号" />
					</view>
					<view class="phone_line two">
						<input type="text" v-model="code1" placeholder="请输入验证码" />
						<view class="check_code" v-if="canGet" @click="getCodeOne(1)">获取验证码</view>
						<view class="check_code wait" v-if="!canGet">{{time1}}s后重新获取</view>
					</view>
				</view>
				
				<view class="phone_input" v-if="showNext">
					<view class="phone_line one">
						<input type="number" maxlength="11" v-model="phone2" placeholder="请输入新手机号" />
					</view>
					<view class="phone_line two">
						<input type="text" v-model="code2" placeholder="请输入验证码" />
						<view class="check_code" v-if="canGet2" @click="getCodeOne(2)">获取验证码</view>
						<view class="check_code wait" v-if="!canGet2">{{time1}}s后重新获取</view>
					</view>
				</view>
				
			</view>
			
			<!-- 按钮 -->
			<button v-if="!showNext" class="purple_btn next_btn" @click="updatePhone(1)">下一步</button>
			<button v-if="showNext" class="purple_btn next_btn" @click="updatePhone(2)">确认</button>
		
			<view v-if="okTip" class="up_ok">修改成功，{{timeBack}}s后自动返回...</view>
			
		</view>
		
		
	</view>
</template>

<script>
	
	var _self;
	var timer;
	
	export default{
		
		data() {
			return {
				storeId:0,
				phone1:'',
				phone2:'',
				showNext:false,
				canGet:true,
				canGet2:true,
				time1:60,
				loginInfo:{},
				code1:'',
				code2:'',
				timeBack:3,
				okTip:false
			}
		},
		onLoad(opt) {
			_self = this;
			if(opt.phone != undefined && opt.id != undefined){
				_self.phone1 = opt.phone;
				_self.storeId = opt.id;
			}
			
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
		},
		components:{
		},
		methods:{
			//获取手机验证码
			getCodeOne(flag){
				//flag = 1原手机 ，其他值新手机
				var phoneNum = "";
				if(flag == 1){
					phoneNum = _self.phone1;
				}else{
					phoneNum = _self.phone2;
					
					if(phoneNum == _self.phone1){
						_self.tipMsg("请绑定新的手机号");
						return;
					}
					
					if(!_self.checkPhone(phoneNum)){
						return;
					}
				}
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/sendcodemess', 
					method:"POST",
					data:{
						mobile:phoneNum,
						scene:13
					},
				    success: (res) => {
				     
					  uni.showToast({
					  	title:res.data.msg,
					  	icon:'none'
					  })
					  
					  if(res.data.status == 1){
						 _self.canGet = false;
						 _self.canGet2 = false;
						 _self.timeDown();
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
				
			},
			//修改手机号
			updatePhone(flag){
				
				var pcode = '';
				var phoneNum = "";
				var urlStr =  _self.$httpUrl+'index.php/api/store/bindmobile';
				if(flag == 1){
					pcode = _self.code1;
					phoneNum = _self.phone1;
				}else{
					pcode = _self.code2;
					phoneNum = _self.phone2;
					urlStr =  _self.$httpUrl+'index.php/api/store/bindnewmobile';
					
					if(phoneNum == _self.phone1){
						_self.tipMsg("请绑定新的手机号");
						return;
					}
					
					if(!_self.checkPhone(phoneNum)){
						return;
					}
					
				}
				
				if(pcode.trim() == ""){
					_self.tipMsg("请输入验证码");
					return;
				}
				
				console.log(_self.storeId);
				uni.request({
				    url: urlStr, 
					method:"POST",
					data:{
						code:pcode,
						mobile:phoneNum,
						storeid:_self.storeId
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						if(flag == 1){
							_self.showNext=true;
						}else{
							_self.okTip = true;
							var backT = setInterval(function(){
								_self.timeBack = _self.timeBack - 1;
								if(_self.timeBack < 1){
									clearInterval(backT);
									uni.navigateBack({
										delta:1
									})
								}
							},1000)
							
						}
					  }else{
						  uni.showToast({
							title:res.data.msg,
							icon:'none'
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
						_self.canGet2 = true;
						_self.time1 = 60;
					}
				},1000);
			}
			
			
		}
		
		
		
	}
	
	
</script>
<style>
	@import url("css/new_phone.css");
	
</style>
