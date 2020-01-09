<template>
	<view>
		
		<toprow2 titleval="领取详情"></toprow2>
	
		<view class="top_free">
			
			<view class="ticket_block" v-for="(item,index) of dataList" :key="index">
				
				<view class="imgs_item">
					<image v-if="item.type == 0" class="tk_type_img" :src="getImgSrc('shangjia/sj45.png')" mode="widthFix"></image>
					<image v-if="item.type == 1" class="tk_type_img" :src="getImgSrc('shangjia/sj50.png')" mode="widthFix"></image>
					<image v-if="item.type == 2" class="tk_type_img" :src="getImgSrc('shangjia/sj49.png')" mode="widthFix"></image>
					
					
					<image v-if="item.status == 0" class="tk_use_img" :src="getImgSrc('shangjia/sj24.png')" mode="widthFix"></image>
					<image v-if="item.status == 1" class="tk_use_img" :src="getImgSrc('shangjia/sj27.png')" mode="widthFix"></image>
					<image v-if="item.status == 2" class="tk_use_img" :src="getImgSrc('shangjia/sj37.png')" mode="widthFix"></image>
				</view>
				
				<view class="words_item">
					<view class="tk_name">{{item.nickname}}</view>
					<view class="tk_time get">领取时间：{{item.recive_time}}</view>
					<view v-if="item.status == 1" class="tk_time use">使用时间：{{item.use_time}}</view>
					<view v-else-if="item.status == 0" class="tk_time use">使用时间：未使用</view>
					<view v-else-if="item.status == 2" class="tk_time use">使用时间：已过期</view>
				</view>
			</view>
			
			<noData v-if="listIsFree"></noData>
			
		</view>
		
	</view>
</template>

<script>
	
	var _self;
	var isLoadInterFace = false;
	export default {
		data() {
			return {
				listIsFree:false,
				storeId:0,
				currentPage:1,
				totalPage:1,
				isLast:true,
				dataList:[]
			}
		},
		onLoad(opt) {
			_self=this;
			if(opt.id != undefined){
				console.log(opt.id);
				_self.storeId = opt.id;
				_self.getDataList(1);
			}
		},
		onReachBottom() {
			this.nextPage();
		},
		methods: {
			//加载下一页
			nextPage(){
				console.log(_self.isLast);
				if(_self.isLast){
					uni.showToast({
						title: '没有更多了',
						icon:"none"
					});
				}else{
					if(!isLoadInterFace){
						isLoadInterFace = true;
						var pageNum = _self.currentPage + 1;
						_self.getDataList(pageNum);
					}
				}
			},
			getDataList(pageNum){
				var dataObj = {
						storeid:_self.storeId,
						limit:10,
						page:pageNum
					};
				
				console.log(dataObj);
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/couponinfo', 
					method:"POST",
					data:dataObj,
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.dataInfo = res.data.result;
						_self.dataList = _self.dataList.concat(res.data.result.data);
						_self.currentPage = res.data.result.current_page;
						_self.isLast = _self.currentPage >= res.data.result.last_page ? true : false;
					  }else{
						  uni.showToast({
						  	icon:"none",
						  	title:res.data.msg
						  })
					  }
					  
					  
					  if(_self.dataList.length <= 0){
					  	_self.listIsFree = true;
					  }else{
					  	_self.listIsFree = false;
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						isLoadInterFace = false;
				    }
				});
			}
		}
	}
	
</script>

<style>
	
	@import url("css/get_info.css");
	
</style>
