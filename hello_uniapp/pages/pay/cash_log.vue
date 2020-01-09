<template>
	<view>
		<toprow2 titleval="提现记录"></toprow2>
		
		<view class="top_free">
			
			<view class="list_control">
				<view class="list_item_btn" :class="{active : todoIndex == 0}" @click="changeList(0)">已通过</view>
				<view class="list_item_btn" :class="{active : todoIndex == 1}" @click="changeList(1)">未通过</view>
				<view class="list_item_btn" :class="{active : todoIndex == -1}" @click="changeList(-1)">已拒绝</view>
			</view>
			
			<!-- 记录 -->
			<view class="log_list_box">
				
				<view class="month_list_box" v-for="(item,index) of logList" :key="index">
					<!-- <view class="month_line">2019年{{index + 5}}月</view> -->
					<view class="log_item">
						<view class="money_num">￥{{item.money}}</view>
						<view class="log_desc">
							{{item.bank_name}}
							<view class="log_time">{{item.create_time}}</view>
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
		
		data() {
			return {
				listIsFree:false,
				todoIndex:0,
				loginInfo:{},
				currentPage:1,
				totalPage:1,
				isLast:true,
				logList:[]
			}
		},
		onReachBottom() {
			this.nextPage();
		},
		onLoad() {
			_self = this;
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
			this.getData(0,1);
		},
		components:{
		},
		methods:{
			changeList(i){
				_self.todoIndex = i;
				_self.logList = [];
				_self.getData(i,1);
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
						_self.getData(_self.todoIndex,pageNum);
					}
				}
			},
			getData(typeId,pageNum){
				console.log(typeId);
				uni.request({
				    url: _self.$httpUrl+'index.php/api/centerup/withdrawlog', 
					method:"POST",
					data:{
						type:1,
						status:typeId,
						user_id:_self.loginInfo.uid,
						limit:10,
						page:pageNum
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.isLast = pageNum >= res.data.result.last_page ? true : false;
						_self.currentPage = pageNum;
						_self.logList = _self.logList.concat(res.data.result.data);
					  }else{
						  uni.showToast({
						  	title:res.data.msg,
							icon:"none"
						  })
					  }
					  
					  if(_self.logList.length <= 0){
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
				var list = _self.logList;
				for(var i = 0 ; i < list.length;i++){
					list[i].send_time = dateUtil.toDate(list[i].send_time);
				}
				
				_self.logList = list;
				console.log(list);
			}
			
		}
		
	}
	
	
</script>

<style>
	
	@import url("css/cash_log.css");
	
</style>
