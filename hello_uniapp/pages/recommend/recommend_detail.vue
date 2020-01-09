<template>
	<view>
		
		<toprow2 titleval="推荐详情"></toprow2>
		
		
		<view class="list_control">
			<view class="list_item_btn" :class="{active : todoIndex == 1}" @click="changeList(1)">朋友</view>
			<view class="list_item_btn" :class="{active : todoIndex == 2}" @click="changeList(2)">商家</view>
			<view class="list_item_btn" :class="{active : todoIndex == 3}" @click="changeList(3)">合伙人</view>
		</view>
		
		
		<view class="top_free">
		
			<!-- 朋友列表 -->
			<view class="friend_list" v-if="todoIndex == 1">
				
				<view class="fd_list_item" v-for="(item,index) of dataList" :key="index">
					<image :src="item.head_pic" mode="widthFix"></image>
					<view class="fd_info">
						<text class="name">{{item.nickname}}</text>
						<br/>
						注册时间：{{item.reg_time}}
					</view>
				</view>
				
			</view>
			<!-- 商家列表 -->
			<view class="merchant_list" v-if="todoIndex == 2">
				
				<view class="mc_list_item" v-for="(item,index) of dataList2" :key="index">
					<image :src="item.storeimg"></image>
					<view class="info_item mc_info">
						<view class="title">{{item.storename}}</view>
						{{item.storeaddress}}
						<view class="time">{{item.apply_time}}</view>
						<button class="btn_r btn_pass" v-if="item.status == 1" hover-class="none">通过</button>
						<button class="btn_r btn_no_pass" v-else hover-class="none">未通过</button>
					</view>
				</view>
				
			</view>
			
			<!-- 合伙人列表 -->
			<view class="partner_list" v-if="todoIndex == 3">
				<view class="fd_list_item" v-for="(item,index) of dataList3" :key="index">
					<image :src="item.head_pic" mode="widthFix"></image>
					<view class="fd_info">
						<text class="name">{{item.nickname}}</text>
						<br/>
						<text>注册时间：{{item.reg_time}}</text>
					</view>
				</view>
				
			</view>
			
			<noData v-if="listIsFree"></noData>
		
		</view>	

		
		
	</view>
</template>


<script>
	
	
	import dateUtil from "../../common/dateUtil.js"
	
	var isLoadInterFace = false;
	var _self;
	
	export default{
		data(){
			return {
				listIsFree:true,
				todoIndex:1,
				btnStatus:true,
				loginInfo:{},
				currentPage:1,
				totalPage:1,
				isLast:true,
				dataList:[],
				currentPage2:1,
				totalPage2:1,
				isLast2:true,
				dataList2:[],
				currentPage3:1,
				totalPage3:1,
				isLast3:true,
				dataList3:[]
			}
		},
		onLoad() {
			_self = this;
			var loginRes = this.checkLogin('../index/recommend', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
			this.getDataList(_self.currentPage,_self.todoIndex);
			
		},
		onReachBottom() {
			this.nextPage();
		},
		components:{
		},
		methods:{
			//加载下一页
			nextPage(){
				if(_self.todoIndex == 1){
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
				}else if(_self.todoIndex == 2){
					if(_self.isLast2){
						uni.showToast({
							title: '没有更多了',
							icon:"none"
						});
					}else{
						if(!isLoadInterFace){
							isLoadInterFace = true;
							var pageNum = _self.currentPage2 + 1;
							_self.getDataList(pageNum,_self.todoIndex);
						}
					}
				}else if(_self.todoIndex == 3){
					if(_self.isLast3){
						uni.showToast({
							title: '没有更多了',
							icon:"none"
						});
					}else{
						if(!isLoadInterFace){
							isLoadInterFace = true;
							var pageNum = _self.currentPage3 + 1;
							_self.getDataList(pageNum,_self.todoIndex);
						}
					}
				}
				
			},
			//获取列表数据
			getDataList(pageIndex,typeVal){
				
				var dataObj = {
					user_id:_self.loginInfo.uid,
					type:typeVal,
					limit:10,
					page:pageIndex
				}
			
				console.log(dataObj);
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/recommend/recommendinfo', 
					method:"POST",
					data:dataObj,
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
						  
						  if(typeVal == 1){
							  _self.dataList = _self.dataList.concat(res.data.result.data);
							  _self.changeTimeType(1);
							  _self.currentPage = res.data.result.current_page;
							  _self.isLast = res.data.result.current_page >= res.data.result.last_page ? true : false;
						  }else if(typeVal == 2){
							  _self.dataList2 = _self.dataList2.concat(res.data.result.data);
							  _self.changeTimeType(2);
							  _self.currentPage2 = res.data.result.current_page;
							  _self.isLast2 = res.data.result.current_page >= res.data.result.last_page ? true : false;
						  }else if(typeVal == 3){
							  _self.dataList3 = _self.dataList3.concat(res.data.result.data);
							  _self.changeTimeType(3);
							  _self.currentPage3= res.data.result.current_page;
							  _self.isLast3 = res.data.result.current_page >= res.data.result.last_page ? true : false;
						  }
						  
						  
						
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
			
			//转换时间戳为正常格式
			changeTimeType(i){
				var list = [];
				if(i == 1){
					list = _self.dataList;
					for(var i = 0 ; i < list.length;i++){
						list[i].reg_time = dateUtil.toDate(list[i].reg_time);
					}
					_self.dataList = list;
					
				}else if(i == 2){
					list = _self.dataList2;
					for(var i = 0 ; i < list.length;i++){
						list[i].apply_time = dateUtil.toDate(list[i].apply_time);
					}
					_self.dataList2 = list;
				}else if(i == 3){
					list = _self.dataList3;
					for(var i = 0 ; i < list.length;i++){
						list[i].reg_time = dateUtil.toDate(list[i].reg_time);
					}
					_self.dataList3 = list;
				}
				
				if(list.length <= 0){
					_self.listIsFree = true;
				}else{
					_self.listIsFree = false;
				}
				
			},
			//切换列表
			changeList:function(i){
				_self.todoIndex = i;
				if(i == 1){
					_self.dataList = [];
					_self.getDataList(1,_self.todoIndex);
				}else if(i == 2){
					_self.dataList2 = [];
					_self.getDataList(1,_self.todoIndex);
				}else if(i == 3){
					_self.dataList3 = [];
					_self.getDataList(1,_self.todoIndex);
				}
				
			}
		}
	}
	
</script>

<style>
	@import url("css/recommend_detail.css");
</style>
