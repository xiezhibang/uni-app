<template>
	<view>
		<toprow titleval="活动券"></toprow>
		<view class="top_free">
			<view class="top_wrap">
				<view class="list_control">
					<view class="list_item_btn" :class="{active : todoIndex == 0}" @click="changeList(0)">未使用</view>
					<view class="list_item_btn" :class="{active : todoIndex == 1}" @click="changeList(1)">已使用</view>
					<view class="list_item_btn" :class="{active : todoIndex == 2}" @click="changeList(2)">已过期</view>
				</view>
			</view>
			
			<view class="list_box">
				
				<view class="ticket_item" v-for="(item,index) of dataList" :key="index">
					<view class="ti_red">分润比例：{{item.rate}}%</view>
					
					<view class="ti_name">
						{{item.storename}}
					</view>
					
					<view class="ti_location">
						{{item.provinces}}{{item.citys}}{{item.districts}}
					</view>
					
					<view class="ti_desc">
						<view class="left">活动详情：</view><view>{{item.activity_detail}}</view>
					</view>
					
					<view class="ti_time">
						<view class="left">活动时间：</view><view>{{item.use_start_time}}至{{item.use_end_time}}</view>
					</view>
					
					<button class="get_ticker_btn ct_obj" hover-class="none" v-if="item.type == 0">红利</button>
					<button class="get_ticker_btn ct_obj" hover-class="none" v-if="item.type == 1">闲置</button>
					<button class="get_ticker_btn ct_obj" hover-class="none" v-if="item.type == 2">满减</button>
					
				</view>
				
				<noData v-if="listIsFree"></noData>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	var isLoadInterFace = false;
	var _self;
	export default {
		data() {
			return {
				listIsFree:false,
				todoIndex:0,
				loginInfo:{},
				currentPage:1,
				totalPage:1,
				isLast:true,
				dataList:[]
			}
		},
		onLoad() {
			_self=this;
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			this.getDataList(_self.currentPage,_self.todoIndex);
		},
		onReachBottom() {
			this.nextPage();
		},
		methods: {
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
						_self.getDataList(pageNum,_self.todoIndex);
					}
				}
			},
			//获取列表数据
			getDataList(pageIndex,typeVal){
				console.log(_self.loginInfo.uid);
				uni.request({
				    url: _self.$httpUrl+'api/index/couponList', 
					method:"POST",
					data:{
						type:_self.todoIndex,
						user_id:_self.loginInfo.uid,
						page:pageIndex,
						limit:10
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.dataList = _self.dataList.concat(res.data.result.data);
						//_self.changeTimeType();
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
				_self.getDataList(1,i);
			}
		}
	}
	
</script>

<style>
	
	@import url("css/ticket_list.css");
	
</style>
