<template>
	<view>
		<toprow2 titleval="审核详情"></toprow2>
		
		<view class="top_free">
			<view class="fixBox">
				<view class="sys_msg_line">
					<image :src="getImgSrc('shangjia/sj20.png')" mode="widthFix"></image>
					<view class="msg_box">平台功能更新公告：欢迎广大商家加入</view>
				</view>
				
				<view class="list_control">
					<view class="list_item_btn" :class="{active : todoIndex == 0}" @click="changeList(0)">审核中</view>
					<view class="list_item_btn" :class="{active : todoIndex == 1}" @click="changeList(1)">已运营</view>
					<view class="list_item_btn" :class="{active : todoIndex == 2}" @click="changeList(2)">已拒绝</view>
				</view>
			</view>
			
			<view class="list_out">
				
				<block v-for="(item,index) of dataList" :key="index">
					<view class="shop_block">
						<view class="cube one">
							<image :src="item.storelogo" mode="widthFix"></image>
						</view>
						<view class="cube two">
							<view class="line_out">
								<view class="lineTit">{{item.storename}}</view>
								<view class="status_tag" v-if="todoIndex == 0">审核中</view>
								<view class="status_tag" v-else-if="todoIndex == 1">已运营</view>
								<view class="status_tag" v-else>已拒绝</view>
							</view>
							<!-- <view class="lineWord">用户权限：管理员</view> -->
							<view class="lineWord">商家区域：{{item.provinces}} {{item.citys}} {{item.districts}} </view>
							<view class="lineWord">店铺地址：{{item.storeaddress}}</view>
							<!-- <view class="lineWord long">商家营业总额123view> -->
							
						</view>
					</view>
				</block>
				
				<noData v-if="listIsFree"></noData>
				
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	
	
	var isLoadInterFace = false;
	var _self;
	
	export default{
		
		data() {
			return {
				listIsFree:false,
				todoIndex:0,
				dataList:[],
				currentPage:1,
				totalPage:1,
				isLast:true,
				loginInfo:{}
			}
		},
		onLoad() {
			_self = this;
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			this.dataList = [];
			this.changeDataList(1,_self.todoIndex);
		},
		components:{
			
		},
		onReachBottom() {
			this.nextPage();
		},
		methods:{
			//加载下一页
			nextPage(){
				if(_self.isLast){
					uni.showToast({
						title: '没有更多了',
						icon:"none"
					});
				}else{
					if(!isLoadInterFace){
						isLoadInterFace = true;
						var pageNum = _self.currentPage + 1;
						_self.changeDataList(pageNum,_self.todoIndex);
					}
				}
			},
			changeDataList(pageIndex,i){
				
				uni.request({
				    url: _self.$httpUrl+'index.php/Api/store/getStorestatus', 
					method:"POST",
					data:{
						user_id:_self.loginInfo.uid,
						type:i,
						limit:10,
						page:pageIndex
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.dataList = _self.dataList.concat(res.data.result.data);
						_self.currentPage = res.data.result.current_page;
						_self.isLast = res.data.result.current_page >= res.data.result.last_page ? true : false;
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
				
				
			},
			changeList(i){
				_self.todoIndex = i;
				_self.dataList = [];
				_self.changeDataList(1,i);
			}
			
			
		}
		
		
		
	}
	
	
</script>

<style>
	
	@import url("css/audit_info.css");
	
</style>
