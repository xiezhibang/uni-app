<template>
	<view>
		
	
		
	</view>
</template>

<script>
	
	var _self;
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			_self=this;
		},
		methods: {
			req(){
				uni.request({
				    url: _self.$httpUrl+'api/Usersup/center', 
					method:"POST",
					data:{
						data:_self.data
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						
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
	
	@import url("css/xx.css");
	
</style>
