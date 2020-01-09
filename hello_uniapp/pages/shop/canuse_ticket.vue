<template>
	<view>
		<toprow titleval="活动券(当前店铺)"></toprow>
		<view class="top_free">
			
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
					
					<button class="get_ticker_btn ct_obj" hover-class="none" @click="goUse(item.id)">去使用</button>
					
				</view>
				
				<noData v-if="listIsFree" tip="该店铺暂无可用券"></noData>
				
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
				loginInfo:{},
				storeId:0,
				currentPage:1,
				totalPage:1,
				storeInfo:{},
				isLast:true,
				dataList:[]
			}
		},
		onLoad(opt) {
			_self=this;
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
			if(opt.id != undefined){
				_self.storeId = opt.id;
				_self.getDataList(_self.currentPage);
			}
			
		},
		onReachBottom() {
			this.nextPage();
		},
		methods: {
			//去使用
			goUse(id){
				
				uni.navigateTo({
					url:"/pages/shop/pay?id="+id+"&storeInfo="+JSON.stringify(_self.storeInfo)+"&sid="+_self.storeId
				})
			},
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
						_self.getDataList(pageNum);
					}
				}
			},
			//获取列表数据
			getDataList(pageIndex){
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/index/userCoupon', 
					method:"POST",
					data:{
						storeid:_self.storeId,
						user_id:_self.loginInfo.uid,
						page:pageIndex,
						limit:10
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						 _self.storeInfo = res.data.result.storeinfo;
						 
						_self.dataList = _self.dataList.concat(res.data.result.couponlist.data);
						//_self.changeTimeType();
						_self.currentPage = res.data.result.couponlist.current_page;
						_self.isLast = res.data.result.couponlist.current_page >= res.data.result.couponlist.last_page ? true : false;
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
	
	@import url("css/canuse_ticket.css");
	
</style>
