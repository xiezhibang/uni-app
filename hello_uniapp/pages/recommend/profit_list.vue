<template>
	<view>
		
		<toprow2 titleval="推荐收益"></toprow2>
		
		<view class="fix_board">
			<view class="topRow">
				<view class="time_row">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" class="pik_obj left">
						<view>{{date}}</view>
						<image class="icon_triangle" mode="widthFix" :src="getImgSrc('tuijian/tj6.png')"></image>
					</picker>
					&nbsp;至&nbsp;
					<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2" class="pik_obj right">
						<view>{{date2}}</view>
						<image class="icon_triangle" mode="widthFix" :src="getImgSrc('tuijian/tj6.png')"></image>
					</picker>
					<button class="search_btn" hover-class="none" @click="searchInfo">查询</button>
				</view>
			</view>
			
			<view class="list_control">
				<view class="list_item_btn" :class="{active : todoIndex == 1}" @click="changeList(1)">朋友</view>
				<view class="list_item_btn" :class="{active : todoIndex == 2}" @click="changeList(2)">商家</view>
				<view class="list_item_btn" :class="{active : todoIndex == 3}" @click="changeList(3)">合伙人</view>
			</view>
			
			<view class="list_head">
				<view>会员</view>
				<view v-if="todoIndex == 1">消费金额</view>
				<view v-else-if="todoIndex == 2">营业金额</view>
				<view v-else>升级金额</view>
				<view>我的收益</view>
				<view>收益到账时间</view>
			</view>
		</view>
		
		<view class="top_free">
			
			<view class="list_container list_one">
				
				
				<view class="row_item" v-for="(item,index) of dataList" :key="index">
					<view>
						<view class="img_block centerObj">
							<image :src="item.head_pic" mode="widthFix"></image>
							<view>{{item.nickname}}</view>
						</view>
					</view>
					<view>
						<view class="price_block">￥{{item.total_amount}}</view>
						<!-- <view class="time_block">2019-12-19<br/>11:13:46</view> -->
					</view>
					<view>
						<view class="price_block">￥{{item.share_money}}</view>
						<!-- <view class="time_block">2019-12-19<br/>11:13:46</view> -->
					</view>
					<view>
						<view class="order_num_block centerObj">
							{{item.add_time}}
						</view>
					</view>
				</view>
				
				<noData v-if="listIsFree"></noData>
				
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
			})
			return {
				listIsFree:false,
				currentDate:currentDate,
				date: currentDate,
				date2: currentDate,
				todoIndex:1, //1朋友 2商家 3合伙人
				loginInfo:{},
				currentPage:1,
				totalPage:1,
				isLast:true,
				dataList:[],
				startTimeNum:0,
				endTimeNum:0
			}
		},
		onLoad() {
			_self = this;
			
			var loginRes = this.checkLogin('../index/recommend', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
			_self.date = dateUtil.mathChangeDate(_self.date,"-",30).split(" ")[0];
			_self.startTimeNum = dateUtil.getUnixTime(_self.date);
			_self.endTimeNum = dateUtil.getUnixTime(_self.date2);
			
			this.getDataList(_self.currentPage,_self.todoIndex);
			
		},
		onReachBottom() {
			this.nextPage();
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
			getDataList(pageIndex,typeVal,hasTime){
				
				var dataObj = {
					user_id:_self.loginInfo.uid,
					type:typeVal,
					limit:10,
					page:pageIndex,
					start_time:_self.startTimeNum * 1,
					end_time:_self.endTimeNum * 1 + 86400
				}
				
				if(hasTime){
					dataObj.start_time = _self.startTimeNum * 1;
					dataObj.end_time = _self.endTimeNum * 1 + 86400;
				}
				
				console.log(dataObj);
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/recommend/getRecommendmoney', 
					method:"POST",
					data:dataObj,
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
			//转换时间戳为正常格式
			changeTimeType(){
				var list = _self.dataList;
				for(var i = 0 ; i < list.length;i++){
					list[i].add_time = dateUtil.toDate(list[i].add_time);
				}
				
				_self.dataList = list;
				
			},
			//切换列表
			changeList:function(i){
				_self.todoIndex = i;
				_self.dataList = [];
				_self.getDataList(1,i);
			},
			//查询信息
			searchInfo(){
				
				//console.log(dateUtil.compareTime(_self.date,_self.date2));
				_self.startTimeNum = dateUtil.getUnixTime(_self.date);	
				_self.endTimeNum = dateUtil.getUnixTime(_self.date2);	
				_self.getDataList(1,_self.todoIndex,true)
					
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
					year = year - 20;
				} else if (type === 'end') {
					year = year + 5;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
	
</script>

<style>
	@import url("css/profit_list.css");
</style>
