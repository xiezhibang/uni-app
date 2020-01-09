<template>
	<view>
		<view class="fix_box">
			<view class="title_padding"></view>
			<view class="top_line">
				<image class="bg_img" :src="getImgSrc('shangjia/sj333.png')" mode="widthFix"></image>
				
				<view class="back_box" @click="backBeforePage">
					<image mode="widthFix" :src="getImgSrc('back/back1.png')"></image>
				</view>
				
				<view class="ys_top_data ys_title floatObj">营收报表</view>
				
				<view class="ys_top_data ys_money floatObj"><text>￥</text>{{dataEntity.ordermoney}}</view>
				
				<view class="ys_top_data ys_desc floatObj" @click="nextPage">店铺总收益({{dataEntity.ordernum}}单)</view>
				
			</view>
			
			<view class="total_info_box">
				<view class="info_cube">
					<view class="red_info"><text>￥</text>{{dataEntity.todaymoney}}</view>
					<view class="black_info">今日({{dataEntity.todaynum}}单)</view>
					<text class="grey_str"></text>
				</view>
				<view class="info_cube">
					<view class="red_info"><text>￥</text>{{dataEntity.monthmoney}}</view>
					<view class="black_info">本月({{dataEntity.monthnum}}单)</view>
					<text class="grey_str"></text>
				</view>
				<view class="info_cube">
					<view class="red_info"><text>￥</text>{{dataEntity.lastmoney}}</view>
					<view class="black_info" @click="monthSwitch">{{per_month}}月({{dataEntity.lastnum}}单)<image :src="getImgSrc('shangjia/sj7.png')" mode="widthFix"></image></view>
					<view class="month_Box" v-if="month_show">
						<block v-for="(item,index) of 12" :key="index">
							<view class="month_cube" :class="{active:month_index == index}" @click="changeMonthData(index)">
								{{index + 1}}月
							</view>
						</block>
					</view>
				</view>
			</view>
			
			<view class="grey_line"></view>
			
			
			<view class="profit_tit">
				<image :src="getImgSrc('shangjia/sj17.png')" mode="widthFix"></image>
				收益详情
			</view>
			
			<view class="time_row">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" class="pik_obj left">
					<view>{{date}}</view>
					<image class="icon_triangle" mode="widthFix" :src="getImgSrc('shangjia/sj7.png')"></image>
				</picker>
				&nbsp;至&nbsp;
				<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2" class="pik_obj right">
					<view>{{date2}}</view>
					<image class="icon_triangle" mode="widthFix" :src="getImgSrc('shangjia/sj7.png')"></image>
				</picker>
				<button class="search_btn" hover-class="none" @click="searchInfo">查询</button>
			</view>
			
			<view class="line_row title">
				<view>交易号</view>
				<view>消费会员</view>
				<view>消费金额</view>
				<view>店铺收益</view>
			</view>
			
		</view>
		<view class="list_coat">
			<view class="line_row" v-for="(item,index) of dataList" :key="index">
				<view><view>{{item.order_sn}}</view></view>
				<view><view>{{item.nickname}}</view></view>
				<view><view>￥{{item.total_amount}}</view></view>
				<view><view>￥{{item.store_amount}}</view></view>
			</view>
		</view>
		
	
		
	</view>
</template>

<script>
	
	import dateUtil from "../../common/dateUtil.js"
	
	var isLoadInterFace = false;
	var _self;
	
	export default{
		data(){
			const currentDate = this.getDate({
			    format: true
			});
			const date_start = this.getDate('date_start');
			const date_end = this.getDate('date_end');
			return {
				currentPage:1,
				totalPage:1,
				isLast:true,
				month_show:false,
				//指定月份
				per_month:1,
				month_index:0,
				loginInfo:{},
				dataList:[],
				dataEntity:{},
				storeId:0,
				currentDate:currentDate,
				date: date_start,
				date2: date_end,
				time1:0,
				time2:0,
				todoIndex:0
			}
		},
		onReachBottom() {
			this.nextPage();
		},
		onLoad(opt) {
			_self = this;
			
			var loginRes = this.checkLogin('../index/merchant', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
			//获取当前月份
			var month_num = dateUtil.getCurrentTime(new Date(),"month");
			this.per_month = month_num;
			this.month_index = month_num - 1;
			
			//30天前时间戳
			var bt = dateUtil.getUnixTime(dateUtil.mathChangeDate(dateUtil.formatDateThis(new Date()),"-",30));
			//当前时间戳
			var ct = dateUtil.getUnixTime(dateUtil.formatDateThis(new Date()));
			this.time1 = bt;
			this.time2 = ct;
			
			if(opt.id != undefined){
				console.log(opt.id);
				_self.storeId = opt.id;
				_self.getDataList(1);
			}
		},
		components:{
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods:{
			
			//初始查询
			initSearch(){
				_self.dataList = [];
				_self.getDataList(1);
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
			//显示月份列表
			monthSwitch(){
				_self.month_show = !_self.month_show;
			},
			//切换月份
			changeMonthData(m){
				_self.month_index = m;
				_self.per_month = m + 1;
				_self.monthSwitch();
				_self.initSearch();
			},
			//查询数据,参数x，x=0就默认查一个月内的数据 ,pageNum当前页数
			getDataList(pageNum){
				var dataObj = {
						storeid:_self.storeId,
						month:_self.per_month,
						start_time:_self.time1,
						end_time:_self.time2 * 1 + 86400,
						limit:10,
						page:pageNum
					};
				
				console.log(dataObj);
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/getStoreorder', 
					method:"POST",
					data:dataObj,
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.dataEntity = res.data.result;
						_self.dataList = _self.dataList.concat(res.data.result.orderlist.data);
						_self.currentPage = res.data.result.orderlist.current_page;
						_self.isLast = _self.currentPage >= res.data.result.orderlist.last_page ? true : false;
					  }else{
						  uni.showToast({
						  	icon:"none",
						  	title:res.data.msg
						  })
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						isLoadInterFace = false;
				    }
				});
				
				
				
			},
			//切换列表
			changeList:function(i){
				_self.todoIndex = i;
			},
			//查询信息
			searchInfo:function(e){
					_self.time1 = dateUtil.getUnixTime(_self.date);
					_self.time2 = dateUtil.getUnixTime(_self.date2);
					_self.initSearch();
			},
			showTips:function(str){
				uni.showToast({
				    title: str,
				    duration: 2000,
					icon:"none"
				});
			},
			bindDateChange(e) {
				
				_self.date = e.target.value;
				
			},
			bindDateChange2(e) {
				
				_self.date2 = e.target.value;
				
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				if(type === 'date_start'){
					return `${year}-${month}-01`;
				}else if(type === 'date_end'){
					var days = new Date(year, month, 0).getDate();
					return `${year}-${month}-${days}`;
				}else{
					return `${year}-${month}-${day}`;
				}
			},
			backBeforePage(){
				
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
	
</script>

<style>
	@import url("css/revenue_report.css");
	
</style>
