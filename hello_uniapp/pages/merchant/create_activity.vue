<template>
	<view>
		
		<toprow2 titleval="发布活动"></toprow2>
		
		<view class="top_free">
			
			<view class="line_view">
				<view class="line_item name">活动类型：</view>
				<view class="line_item content">
					<radio-group name="acType" class="acTypeLine">
							<view class="radio_opt" @click="changeType(0)"><radio :checked="typeIndex == 0" value="红利" color="#7A37C5"/>红利</view>
							<view class="radio_opt" @click="changeType(1)"><radio :checked="typeIndex == 1" value="闲置" color="#7A37C5"/>闲置</view>
							<view class="radio_opt" @click="changeType(2)"><radio :checked="typeIndex == 2" value="满减" color="#7A37C5"/>满减</view>
					</radio-group>
				</view>
			</view>
			
			<view class="active_box" v-if="typeIndex == 0">
				<view class="line_view">
					<view class="line_item name">让利比例：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="2" v-model="rate" placeholder="请输入分润比例(10%~80%)" />
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">发放数量：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="10" v-model="sendNum" placeholder="请输入发放数量" />
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">限领数量：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="4" v-model="limitNum" placeholder="请输入每人限领次数" />
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">领取期限：</view>
					<view class="line_item content">
						<view class="time_line">
							<view class="time_wrap">
								<input type="text" disabled="true" v-model="timeList.time1" placeholder="开始时间" />
								<picker class="pk_obj" mode="date" data-id='1' :value="date1" :start="startDate" :end="endDate" @change="bindDateChange">
									<view>{{date1}}</view>
								</picker>
							</view>
							-至-
							<view class="time_wrap right">
								<input type="text" disabled="true" v-model="timeList.time2" placeholder="结束时间" />
								<picker class="pk_obj" mode="date" data-id='2' :value="date2" :start="startDate" :end="endDate" @change="bindDateChange2">
									<view>{{date2}}</view>
								</picker>
							</view>
							
						</view>
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">使用期限：</view>
					<view class="line_item content">
						<view class="time_line">
							<view class="time_wrap">
								<input type="text" disabled="true" v-model="timeList.time3" placeholder="开始时间" />
								<picker class="pk_obj" mode="date" data-id='3' :value="date3" :start="startDate" :end="endDate" @change="bindDateChange">
									<view>{{date3}}</view>
								</picker>
							</view>
							-至-
							<view class="time_wrap right">
								<input type="text" disabled="true" v-model="timeList.time4" placeholder="结束时间" />
								<picker class="pk_obj" mode="date" data-id='4' :value="date4" :start="startDate" :end="endDate" @change="bindDateChange2">
									<view>{{date4}}</view>
								</picker>
							</view>
							
						</view>
					</view>
				</view>
				
				<view class="activity_desc">活动详情：</view>
				
				<textarea class="desc_text" maxlength="50" v-model="acContent" placeholder="请选择活动详情" />
				
			</view>
			
			<view class="active_box" v-if="typeIndex == 1">
				<view class="line_view">
					<view class="line_item name">让利比例：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="2" v-model="rate2" placeholder="请输入分润比例(10%~80%)" />
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">发放数量：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="10" v-model="sendNum2" placeholder="请输入发放数量" />
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">限领数量：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="4" v-model="limitNum2" placeholder="请输入每人限领次数" />
					</view>
				</view>
				
				<view class="line_view">
					<view class="line_item name">领取期限：</view>
					<view class="line_item content">
						<view class="time_line">
							<view class="time_wrap">
								<input type="text" disabled="true" v-model="timeList.time5" placeholder="开始时间" />
								<picker class="pk_obj" mode="date" data-id='5' :value="date5" :start="startDate" :end="endDate" @change="bindDateChange">
									<view>{{date5}}</view>
								</picker>
							</view>
							-至-
							<view class="time_wrap right">
								<input type="text" disabled="true" v-model="timeList.time6" placeholder="结束时间" />
								<picker class="pk_obj" mode="date" data-id='6' :value="date6" :start="startDate" :end="endDate" @change="bindDateChange2">
									<view>{{date6}}</view>
								</picker>
							</view>
							
						</view>
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">使用期限：</view>
					<view class="line_item content">
						<view class="time_line">
							<view class="time_wrap">
								<input type="text" disabled="true" v-model="timeList.time7" placeholder="开始时间" />
								<picker class="pk_obj" mode="date" data-id='7' :value="date7" :start="startDate" :end="endDate" @change="bindDateChange">
									<view>{{date7}}</view>
								</picker>
							</view>
							-至-
							<view class="time_wrap right">
								<input type="text" disabled="true" v-model="timeList.time8" placeholder="结束时间" />
								<picker class="pk_obj" mode="date" data-id='8' :value="date8" :start="startDate" :end="endDate" @change="bindDateChange2">
									<view>{{date8}}</view>
								</picker>
							</view>
							
						</view>
					</view>
				</view>
				
				<view class="activity_desc">活动详情：</view>
				
				<textarea class="desc_text" maxlength="50" v-model="acContent2" placeholder="请选择活动详情" />
				
			</view>
			
			<view class="active_box" v-if="typeIndex == 2">
				<view class="line_view">
					<view class="line_item name">让利比例：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="2" v-model="rate3" placeholder="请输入分润比例(10%~80%)" />
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">减免金额：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="10" v-model="reduceMoney" placeholder="请输入减免数量" />
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">使用限额：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="10" v-model="useLimitMoney" placeholder="请输入最低消费额" />
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">发放数量：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="10" v-model="sendNum3" placeholder="请输入发放数量" />
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">限领数量：</view>
					<view class="line_item content">
						<input class="ipt_obj" type="number" maxlength="4" v-model="limitNum3" placeholder="请输入每人限领次数" />
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">领取期限：</view>
					<view class="line_item content">
						<view class="time_line">
							<view class="time_wrap">
								<input type="text" disabled="true" v-model="timeList.time9" placeholder="开始时间" />
								<picker class="pk_obj" mode="date" data-id='9' :value="date9" :start="startDate" :end="endDate" @change="bindDateChange">
									<view>{{date9}}</view>
								</picker>
							</view>
							-至-
							<view class="time_wrap right">
								<input type="text" disabled="true" v-model="timeList.time10" placeholder="结束时间" />
								<picker class="pk_obj" mode="date" data-id='10' :value="date10" :start="startDate" :end="endDate" @change="bindDateChange2">
									<view>{{date10}}</view>
								</picker>
							</view>
							
						</view>
					</view>
				</view>
				<view class="line_view">
					<view class="line_item name">使用期限：</view>
					<view class="line_item content">
						<view class="time_line">
							<view class="time_wrap">
								<input type="text" disabled="true" v-model="timeList.time11" placeholder="开始时间" />
								<picker class="pk_obj" mode="date" data-id='11' :value="date11" :start="startDate" :end="endDate" @change="bindDateChange">
									<view>{{date11}}</view>
								</picker>
							</view>
							-至-
							<view class="time_wrap right">
								<input type="text" disabled="true" v-model="timeList.time12" placeholder="结束时间" />
								<picker class="pk_obj" mode="date" data-id='12' :value="date12" :start="startDate" :end="endDate" @change="bindDateChange2">
									<view>{{date12}}</view>
								</picker>
							</view>
							
						</view>
					</view>
				</view>
				
				<view class="activity_desc">活动详情：</view>
				
				<textarea class="desc_text" maxlength="50" v-model="acContent3" placeholder="请选择活动详情" />
				
			</view>
			
			
			
			<view class="purple_btn" @click="addActivity">发布</view>
			
		</view>
	
		
	</view>
</template>

<script>
	import dateUtil from "../../common/dateUtil.js"
	var _self;
	export default {
		data() {
			const currentDate = this.getDate({
			    format: true
			})
			return {
				storeId:0,
				typeVal:"红利",
				typeIndex:0,
				currentDate:currentDate,
				date1: currentDate,
				date2: currentDate,
				date3: currentDate,
				date4: currentDate,
				date5: currentDate,
				date6: currentDate,
				date7: currentDate,
				date8: currentDate,
				date9: currentDate,
				date10: currentDate,
				date11: currentDate,
				date12: currentDate,
				todoIndex:0,
				timeList:{
					time1:"",
					time2:"",
					time3:"",
					time4:"",
					time5:"",
					time6:"",
					time7:"",
					time8:"",
					time9:"",
					time10:"",
					time11:"",
					time12:""
				},
				//让利比例，发放数量，限领数量，领取期限和使用期限,活动详情
				rate:"",
				sendNum:"",
				limitNum:"",
				getEndTime:"",
				getStartTime:"",
				useEndTime:"",
				useStartTime:"",
				acContent:"",
				//让利比例，发放数量，限领数量，领取期限和使用期限,活动详情
				rate2:"",
				sendNum2:"",
				limitNum2:"",
				getEndTime2:"",
				getStartTime2:"",
				useEndTime2:"",
				useStartTime2:"",
				acContent2:"",
				//让利比例，发放数量，限领数量，领取期限和使用期限,活动详情
				rate3:"",
				sendNum3:"",
				limitNum3:"",
				getEndTime3:"",
				getStartTime3:"",
				useEndTime3:"",
				useStartTime3:"",
				acContent3:"",
				//减免金额和使用限额
				reduceMoney:"",
				useLimitMoney:""
				
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(opt) {
			_self=this;
			if(opt.id != undefined){
				console.log(opt.id);
				_self.storeId = opt.id;
			}
		},
		methods: {
			//发布活动
			addActivity(){
				
				var dataObj = {};
				
				if(_self.typeIndex == 0){
					
					dataObj = {
								type:_self.typeIndex,
								storeid:_self.storeId,
								rate:_self.rate * 1,
								activity_detail:_self.acContent,
								createnum:_self.sendNum * 1,
								limitnum:_self.limitNum * 1,
								send_start_time:_self.getStartTime * 1,
								send_end_time:_self.getEndTime * 1,
								use_start_time:_self.useStartTime * 1,
								use_end_time :_self.useEndTime * 1
							};
					
				}else if(_self.typeIndex == 1){
					
					dataObj = {
								type:_self.typeIndex,
								storeid:_self.storeId,
								rate:_self.rate2 * 1,
								activity_detail:_self.acContent2,
								createnum:_self.sendNum2 * 1,
								limitnum:_self.limitNum2 * 1,
								send_start_time:_self.getStartTime2 * 1,
								send_end_time:_self.getEndTime2 * 1,
								use_start_time:_self.useStartTime2 * 1,
								use_end_time :_self.useEndTime2 * 1
							};
					
				}else if(_self.typeIndex == 2){
					
					dataObj = {
								type:_self.typeIndex,
								storeid:_self.storeId,
								rate:_self.rate3 * 1,
								activity_detail:_self.acContent3,
								createnum:_self.sendNum3 * 1,
								limitnum:_self.limitNum3 * 1,
								send_start_time:_self.getStartTime3 * 1,
								send_end_time:_self.getEndTime3 * 1,
								use_start_time:_self.useStartTime3 * 1,
								use_end_time :_self.useEndTime3 * 1,
								limitmoney :_self.useLimitMoney * 1,
								money :_self.reduceMoney * 1
							};
					
				}
				
				if(dataObj.rate < 10 || dataObj.rate > 80){
					_self.tipMsg("分润百分比为10到80");
					return;
				}
				
				if(dataObj.createnum < 1){
					_self.tipMsg("发放数量需大于1");
					return;
				}
				
				if(dataObj.limitnum < 1){
					_self.tipMsg("限领数量需大于1");
					return;
				}
				
				if(dataObj.limitnum > dataObj.createnum){
					_self.tipMsg("限领数量不能大于发放数量");
					return;
				}
				
				if(_self.typeIndex == 2){
					if(dataObj.money < 1){
						_self.tipMsg("减免金额需大于1");
						return;
					}
				}
				
				if(dataObj.send_start_time == 0 || dataObj.send_end_time == 0 || dataObj.use_start_time == 0 || dataObj.use_end_time == 0){
					_self.tipMsg("请补全时间信息");
					return;
				}
				
				
				
				console.log(dataObj);
				
				uni.request({
					url: _self.$httpUrl+'index.php/Api/Store/addcoupon', 
					method:"POST",
					data:dataObj,
					success: (res) => {
					 
					  console.log(res);
					  
					  if(res.data.status == 1){
						  setTimeout(function(){
							  uni.navigateBack({
							  	delta:1
							  })
						  },2000);
					  }
						  
					  _self.tipMsg(res.data.msg,1500,"none",true);
					  
					},fail: (e) => {
						
					},complete: (e) => {
					}
				});
				
			},
			changeType(i){
				_self.typeIndex = i;
				console.log(i);
			},
			showTips:function(str){
				uni.showToast({
				    title: str,
				    duration: 2000,
					icon:"none"
				});
			},
			bindDateChange: function(e) {
				var tid = e.currentTarget.dataset.id;
				console.log(tid);
				if(tid == 1){
					_self.date1 = e.target.value;
					_self.timeList.time1 = _self.date1;
					_self.getStartTime = dateUtil.getUnixTime(_self.date1);
				}else if(tid == 3){
					_self.date3 = e.target.value;
					_self.timeList.time3 = _self.date3;
					_self.useStartTime = dateUtil.getUnixTime(_self.date3);
				}else if(tid == 5){
					_self.date5 = e.target.value;
					_self.timeList.time5 = _self.date5;
					_self.getStartTime2 = dateUtil.getUnixTime(_self.date5);
				}else if(tid == 7){
					_self.date7 = e.target.value;
					_self.timeList.time7 = _self.date7;
					_self.useStartTime2 = dateUtil.getUnixTime(_self.date7);
				}else if(tid == 9){
					_self.date9 = e.target.value;
					_self.timeList.time9 = _self.date9;
					_self.getStartTime3 = dateUtil.getUnixTime(_self.date9);
				}else if(tid == 11){
					_self.date11 = e.target.value;
					_self.timeList.time11 = _self.date11;
					_self.useStartTime3 = dateUtil.getUnixTime(_self.date11);
				}
			},
			bindDateChange2: function(e) {
				var tid = e.currentTarget.dataset.id;
				if(tid == 2){
					_self.date2 = e.target.value;
					_self.timeList.time2 = _self.date2;
					_self.getEndTime = dateUtil.getUnixTime(_self.date2);
				}else if(tid == 4){
					_self.date4 = e.target.value;
					_self.timeList.time4 = _self.date4;
					_self.useEndTime = dateUtil.getUnixTime(_self.date4);
				}else if(tid == 6){
					_self.date6 = e.target.value;
					_self.timeList.time6 = _self.date6;
					_self.getEndTime2 = dateUtil.getUnixTime(_self.date6);
				}else if(tid == 8){
					_self.date8 = e.target.value;
					_self.timeList.time8 = _self.date8;
					_self.useEndTime2 = dateUtil.getUnixTime(_self.date8);
				}else if(tid == 10){
					_self.date10 = e.target.value;
					_self.timeList.time10 = _self.date10;
					_self.getEndTime3 = dateUtil.getUnixTime(_self.date10);
				}else if(tid == 12){
					_self.date12 = e.target.value;
					_self.timeList.time12 = _self.date12;
					_self.useEndTime3 = dateUtil.getUnixTime(_self.date12);
				}
				
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
	
	@import url("css/create_activity.css");
	
</style>
