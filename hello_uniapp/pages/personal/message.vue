<template>
	
	<view>
		<toprow2 titleval="消息"></toprow2>
		<view class="tab_line">
			<scroll-view scroll-x="true" class="top_tab" >
				<view class="tab_box">
					<view class="tab_item" :class="{active : todoIndex == 0}" id="sc1" @click="changeTab(0)">最新消息</view>
					<view class="tab_item" :class="{active : todoIndex == 1}" id="sc2" @click="changeTab(1)">交易消息</view>
					<view class="tab_item" :class="{active : todoIndex == 2}" id="sc3"  @click="changeTab(2)">奖金消息</view>
					<view class="tab_item" :class="{active : todoIndex == 3}" id="sc4" @click="changeTab(3)">审核消息</view>
				</view>
			</scroll-view>
			
		</view>
		
		<!-- 各种消息列表 -->
		
		<view class="top_free"></view>
		
		<view class="msg_list one">
			
			<block v-for="(item,index) of msgList" :key="index">
				<view class="msg_item" v-if="item.type == 1">
					<view class="msg_block title">交易消息</view>
					<view class="msg_block content">{{item.title}}</view>
					<view class="msg_block content bright">金额：￥{{item.money}}</view>
					<view class="msg_block content">来源：{{item.source}}</view>
					<view class="msg_block time">{{item.send_time}}</view>
				</view>
				
				<view class="msg_item" v-if="item.type == 2">
					<view class="msg_block title">奖金消息</view>
					<view class="msg_block content">{{item.title}}</view>
					<view class="msg_block content bright">金额：￥{{item.money}}</view>
					<view class="msg_block content">来源：{{item.source}}</view>
					<view class="msg_block time">{{item.send_time}}</view>
				</view>
				
				<view class="msg_item" v-if="item.type == 3">
					<view class="msg_block title">审核消息</view>
					<view class="msg_block content">{{item.title}}</view>
					<view class="msg_block content">{{item.data}}</view>
					<view class="msg_block time">{{item.send_time}}</view>
				</view>
				
				<view class="msg_item" v-if="item.type == 4">
					<view class="msg_block title">审核消息</view>
					<view class="msg_block content">{{item.title}}</view>
					<view class="msg_block content">邀请人:{{item.unickname}}</view>
					<view class="msg_block content">被邀请人:{{item.usnickname}}</view>
					<view class="msg_block time">{{item.send_time}}</view>
				</view>
				
			</block>
			
			<noData v-if="listIsFree" tip="暂无消息"></noData>
			
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
				loginInfo:{},
				todoIndex:0,
				scTag:'',
				msgList:[],
				currentPage:1,
				totalPage:1,
				isLast:true
			}
		},
		onLoad() {
			_self = this;
			var loginRes = this.checkLogin('../index/personal', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			this.searchMsg(0,1);
			
		},
		onReachBottom() {
			this.nextPage();
		},
		components:{
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
						_self.searchMsg(_self.todoIndex,pageNum);
					}
				}
			},
			changeTab(t){
				_self.todoIndex = t;
				_self.msgList = [];
				_self.searchMsg(t,1);
			},
			searchMsg(typeId,pageNum){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/Centerup/getUsermes', 
					method:"POST",
					data:{
						type:typeId,
						user_id:_self.loginInfo.uid,
						limit:10,
						page:pageNum
					},
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						_self.isLast = pageNum >= res.data.result.last_page ? true : false;
						_self.currentPage = pageNum;
						_self.msgList = _self.msgList.concat(res.data.result.data);
						_self.changeTimeType();
						
						if(_self.msgList.length <= 0){
							_self.listIsFree = true;
						}else{
							_self.listIsFree = false;
						}
						
					  }else{
						  uni.showToast({
						  	title:res.data.msg,
							icon:"none"
						  })
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						isLoadInterFace = false;
				    }
				});
			},
			//转换时间戳为正常格式
			changeTimeType(){
				var list = _self.msgList;
				for(var i = 0 ; i < list.length;i++){
					list[i].send_time = dateUtil.toDate(list[i].send_time);
				}
				
				_self.msgList = list;
				console.log(list);
			}
			
			
		}
	}
	
	
</script>

<style>
	@import url("css/message.css");
</style>
