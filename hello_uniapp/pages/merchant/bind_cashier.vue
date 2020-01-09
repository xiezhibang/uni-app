<template>
	<view>
		<toprow2 titleval="绑定收银员"></toprow2>
		
		<view class="top_free">
			<view class="head_box">
				<image :src="getImgSrc('shangjia/sj38.png')" mode="widthFix"></image>
			</view>
			
			<view class="head_desc">{{uname == "" ? "暂未绑定收银员" : uname}}</view>
			
			<view class="bind_ok" v-if="uname != ''">已绑定</view>
			
			<input class="input_phone" type="number" v-model="uphone" placeholder="请输入手机号" maxlength="11"/>
			
		</view>
		
		<view class="purple_btn btn_box" @click="bindPerson">
			{{uname == "" ? "绑定" : "换绑"}}
		</view>
		
	</view>
</template>

<script>
	
	var _self;
	export default{
		data(){
			return {
				uname:"",
				uphone:"",
				storeId:""
				
			}
		},
		onLoad(opt) {
			_self= this;
			console.log(opt);
			if(opt.id != undefined && opt.name !=undefined){
				_self.uname = opt.name;
				_self.storeId = opt.id;
			}
		},
		methods:{
			bindPerson(){
				
				if(!_self.checkPhone(_self.uphone)){
					return;
				}
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/bindauthid', 
					method:"POST",
					data:{
						mobile:_self.uphone,
						storeid:_self.storeId
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						  _self.uname = res.data.result.result;
						  try {
						      uni.setStorageSync('cashier_name', _self.uname);
						  } catch (e) {
						      // error
						  }
					  }
					  
					  uni.showToast({
						title:res.data.msg,
						icon:"none"
					  })
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
			}
		}
	}
	
</script>

<style>
	@import url("css/bind_cashier.css");
</style>

