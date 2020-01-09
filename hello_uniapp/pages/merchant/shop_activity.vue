<template>
	<view>
		<toprow2 titleval="店铺活动"></toprow2>
		
		
		<view class="fix_box">
			
			<view class="white_block">
				<view class="at_title">活动统计</view>
				<view class="at_link" @click="goDetail">详情</view>
				
				<view class="add_at" @click="addActivity">发布活动</view>
				
				<view class="at_data_show">
					<view class="data_item">
						<view class="data_num">{{dataInfo.count}}</view>
						<view class="data_title">领取次数</view>
						<view class="rt_line"></view>
					</view>
					<view class="data_item">
						<view class="data_num">{{dataInfo.counts}}</view>
						<view class="data_title">使用次数</view>
						<view class="rt_line"></view>
					</view>
					<view class="data_item">
						<view class="data_num">￥{{dataInfo.couponsum}}</view>
						<view class="data_title">销售金额</view>
						<view class="rt_line"></view>
					</view>
					<view class="data_item">
						<view class="data_num">￥{{dataInfo.money}}</view>
						<view class="data_title">结算金额</view>
					</view>
				</view>
			</view>
			
			<view class="at_row">
				
				<image :src="getImgSrc('shangjia/sj11.png')" mode="widthFix"></image>
				活动列表
				
				<!-- <view class="select_view">发放中</view> -->
				
			</view>
			
		</view>
		
		<view class="top_free">
			
			<view class="list_block">
				 
				<block v-for="(item,index) of dataList" :key="index">
					<view class="tk_item">
						
						<view class="tk_lt">
							<image v-if="item.type == 0" class="status_img" :src="getImgSrc('shangjia/sj43.png')" mode="widthFix"></image>
							<image v-if="item.type == 1" class="status_img" :src="getImgSrc('shangjia/sj48.png')" mode="widthFix"></image>
							<image v-if="item.type == 2" class="status_img" :src="getImgSrc('shangjia/sj46.png')" mode="widthFix"></image>
							
							<view class="tk_rate">{{item.rate}}%</view>
							<view class="tk_letter">分润比例</view>
							<view @click="changeStatus(0,item.id)" v-if="item.status == 0" class="tk_btn">发放中</view>
							<view @click="changeStatus(1,item.id)" v-else-if="item.status == 1" class="tk_btn grey">已取消</view>
							<view v-else class="tk_btn grey">已过期</view>
						</view>
						
						<view class="tk_rt">
							<view class="tk_row one">
								<view>{{item.createnum}}</view>
								<view>{{item.limitmoney}}</view>
								<view>{{item.limitnum}}</view>
							</view>
							<view class="tk_row two">
								<view>发放数量</view>
								<view>使用限额</view>
								<view>限领次数</view>
							</view>
							<view class="tk_row three">使用期限：{{item.use_start_time}}至{{item.use_end_time}}</view>
							<view class="tk_row four">领取期限：{{item.send_start_time}}至{{item.send_end_time}}</view>
						</view>
					</view>
				</block>
				
				<noData v-if="listIsFree" tip="暂无活动"></noData>
				
			</view>
			
		</view>
	
		
	</view>
</template>

<script>
	
	import dateUtil from "../../common/dateUtil.js"
	
	var isLoadInterFace = false;
	var _self;
	export default {
		data() {
			return {
				listIsFree:false, 
				storeId:0,
				loginInfo:{},
				currentPage:1,
				totalPage:1,
				isLast:true,
				dataList:[],
				dataInfo:{}
			}
		},
		onReachBottom() {
			this.nextPage();
		},
		onLoad(opt) {
			_self=this;
			
			var loginRes = this.checkLogin('../index/personal', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
			if(opt.id != undefined){
				console.log(opt.id);
				_self.storeId = opt.id;
			}
		},
		onShow() {
			_self = this;
			if(_self.storeId != 0){
				_self.dataList = [];
				_self.getDataList(1);
			}
		},
		methods: {
			//修改活动状态
			changeStatus(i,id){
				console.log(i,id,_self.loginInfo.uid);
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/upstatus', 
					method:"POST",
					data:{
						coupon_id:id,
						status:i
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.dataList = [];
						_self.getDataList(1);
					  }else{
						  uni.showToast({
						  	icon:"none",
						  	title:res.data.msg
						  })
					  }

				    },fail: (e) => {
						
				    },complete: (e) => {
				    }
				});
				
			},
			
			//发布活动
			addActivity(){
				uni.navigateTo({
					url:"create_activity?id="+_self.storeId
				})
			},
			//去领取详情页
			goDetail(){
				uni.navigateTo({
					url:"get_info?id="+_self.storeId
				})
			},
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
				    url: _self.$httpUrl+'index.php/api/store/getCoupon', 
					method:"POST",
					data:dataObj,
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.dataInfo = res.data.result;
						_self.dataList = _self.dataList.concat(res.data.result.couponlist.data);
						_self.currentPage = res.data.result.couponlist.current_page;
						_self.isLast = _self.currentPage >= res.data.result.couponlist.last_page ? true : false;
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
	
	@import url("css/shop_activity.css");
	
</style>
