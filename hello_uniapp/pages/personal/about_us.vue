<template>
	<view>
		<toprow2 titleval="关于我们"></toprow2>
		
		<view class="top_free" decode="true">
			
			<view class="top_free_child">
				<u-parse :content="content"></u-parse>
			</view>
		
		</view>
	</view>
</template>


<script>
	import uParse from '../../components/u-parse/u-parse.vue'
	var _self;
	export default {
		data() {
			return {
				content:"..."
			}
		},
		components: {
			uParse
		},
		onLoad() {
			_self=this;
			this.requestData();
		},
		methods: {
			requestData(){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/Centerup/article', 
					method:"POST",
					data:{
						cat_id:1
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						if(res.data.result.contents != ""){
							_self.content = res.data.result.content;
						}
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						setTimeout(function(){
							if(_self.content == "..."){
								_self.content = "<div style='width:100%;text-align:center;'>更新中</div>";
							}
						},500);
				    }
				});
			}
		}
	}
	
	
</script>

<style>
	
	@import url("css/about_us.css");
	
</style>
