<template>
	<view>
		
		<toprow2 titleval="店铺设置"></toprow2>
		
		<view class="top_free">
			
			<view class="line_box">
				<view class="line_lt">店铺logo</view>
				<view class="line_rt">
					<view class="logo_cube">
						<!-- <image :src="storeInfo.logo"></image> -->
						<avatar class="upImg"
							selWidth="500upx" selHeight="500upx" @upload="myUpload" :avatarSrc="storeInfo.logo"
							avatarStyle="width: 80upx; height: 80upx; border-radius:1upx;">
						</avatar>
					</view>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">店铺名称</view>
				<view class="line_rt">
					<input type="text" v-model="storeInfo.storename" maxlength="16" placeholder="请输入店铺名称" />
					<image class="arrow_icon" :src="getImgSrc('shangjia/sj8.png')" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">店铺ID</view>
				<view class="line_rt">
					<text class="shop_id">{{storeInfo.id}}</text>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">店铺联系方式</view>
				<view class="line_rt" @click="bindPhone">
					<view class="textBlock">{{storeInfo.tel}}</view>
					<image class="arrow_icon" :src="getImgSrc('shangjia/sj8.png')" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">绑定收银员</view>
				<view class="line_rt" @click="bindShouYing">
					<input type="text" disabled="true" v-model="storeInfo.usernickname" placeholder="暂未绑定" />
					<image class="arrow_icon" :src="getImgSrc('shangjia/sj8.png')" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">所在地区</view>
				<view class="line_rt" @click="openPicker">
					<view class="textBlock">{{region}}</view>
					<image class="arrow_icon" :src="getImgSrc('shangjia/sj8.png')" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">店铺地址</view>
				<view class="line_rt">
					<input type="text" v-model="storeInfo.street" maxlength="30" placeholder="填写店铺地址" />
					<image class="arrow_icon" src="../../static/image/shangjia/sj8.png" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">店面照片</view>
				<view class="line_rt">
					<text class="grey_word rl">最多上传4张</text>
					<view class="upImgLine">
						<avatar class="upImg" :avatarSrc="upImg"
							selWidth="750upx" selHeight="450upx" @upload="myUpload1"
							avatarStyle="width: 100upx; height: 60upx; border-radius:1upx;">
						</avatar>
					</view>
					
				</view>
			</view>
			
			<!-- 店面照片 -->
			<view class="line_box">
				<view class="photo_box" v-for="(item,index) of photoList" :key="index">
					<image class="shop_photo" :src="item"></image>
					<image class="close_img" :src="getImgSrc('shangjia/sj18.png')" @click="removePhoto(index)"></image>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">营业时间</view>
				<view class="line_rt">
					<view class="time_line">
						<view class="time_wrap">
							<input type="text" disabled="true" v-model="time1" placeholder="开始时间" />
							<picker class="pk_obj" mode="time" :value="date1" @change="bindDateChange">
								<view>{{date1}}</view>
							</picker>
						</view>
						-至-
						<view class="time_wrap right">
							<input type="text" disabled="true" v-model="time2" placeholder="结束时间" />
							<picker class="pk_obj" mode="time" :value="date2" @change="bindDateChange2">
								<view>{{date2}}</view>
							</picker>
						</view>
						
					</view>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">人均价格</view>
				<view class="line_rt">
					<input type="number" v-model="storeInfo.avgmoney" maxlength="7" placeholder="填写金额/人" />
					<image class="arrow_icon" :src="getImgSrc('shangjia/sj8.png')" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">店铺分类</view>
				<view class="line_rt" @click="setTypeShow(0)">
					<input type="text" disabled="true" v-model="typeStr" placeholder="选择分类(可多选)" />
					<image class="arrow_icon" :src="getImgSrc('shangjia/sj7.png')" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">店铺标签</view>
				<view class="line_rt" @click="addLabel(0)">
					<text class="grey_word">最多添加四个</text>
					<view class="add_icon">+</view>
				</view>
			</view>
			
			<!-- 店铺标签 -->
			<view class="line_box">
				<view class="tag_box" v-for="(item,index) of labelList" :key="index">
					{{item}}
					<image class="close_img" :src="getImgSrc('shangjia/sj18.png')" @click="removeLabel(index)"></image>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">店铺招牌</view>
				<view class="line_rt" @click="setBrandGoods">
					<input type="text" disabled="true" placeholder="设置商品/服务" />
					<image class="arrow_icon" :src="getImgSrc('shangjia/sj8.png')" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="line_box">
				<view class="line_lt">店铺详情</view>
				<view class="line_rt" @click="setDetailContent">
					<input type="text" disabled="true" placeholder="图文编辑" />
					<image class="arrow_icon" :src="getImgSrc('shangjia/sj8.png')" mode="widthFix"></image>
				</view>
			</view>
			
			<view class="search_word">搜索关键词：</view>
			
			<textarea class="search_text" maxlength="50" v-model="storeInfo.keyword" placeholder="请输入搜索关键词(最多添加30个字),如:美味鱼香茄子" />
			
			<view class="purple_btn" @click="saveNewInfo">保存</view>
			
		</view>
		
		<!-- 店铺标签弹窗 -->
		<view class="frame_box" v-if="showLabelWindow">
			
			<view class="box_div">
				<view class="box_title">添加标签</view>
				<input class="input_block" type="text" v-model="labelStr" placeholder="请输入标签名" maxlength="4"/>
				<view class="box_control">
					<view class="box_btn" @click="addLabel(0)">取消</view>
					<view class="box_btn cb" @click="addLabel(1)">添加</view>
				</view>
			</view>
			
		</view>
		
		
		<!-- 店铺分类弹窗 -->
		<view class="frame_box" v-if="showTypeWindow">
			
			<view class="box_div">
				<view class="box_title">分类选择</view>
				
				<checkbox-group name="sptype" class="check_boss" @change="typeChoiceChange">
					<view class="box_content">
							<block v-for="(item,index) of typeList" :key="index">
								<view class="check_block">
									<checkbox color="#7A37C5" :value="item.id+''" :checked="item.check" class="check_item"/>{{item.name}}
								</view>
							</block>
					</view>
				</checkbox-group>
				
				<view class="box_control">
					<view class="box_btn" @click="setTypeShow(0)">取消</view>
					<view class="box_btn cb" @click="setTypeShow(1)">确定</view>
				</view>
			</view>
			
		</view>
		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	import dateUtil from "../../common/dateUtil.js"
	var _self;
	export default {
		data() {
			const currentDate = this.getDate({
			    format: true
			})
			return {
				upImg:"http://www.jfcma.com/public/images/jfcm/shangjia/up.png",
				storeId:0,
				storeInfo:{},
				//营业时间
				time1:"",
				time2:"",
				currentDate:currentDate,
				date1: "00:00",
				date2: "00:00",
				//店面照片
				photoList:[],
				//店铺标签
				labelList:[],
				labelResult:"",
				labelStr:"",
				showLabelWindow:false,
				//分类数据
				typeList:[],
				typeIdList:[],
				showTypeWindow:false,
				typeStr:"",
				//城市选择
				lotusAddressData:{
					visible:false,
					provinceName:'',
					cityName:'',
					townName:'',
				},
				region:''
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
				_self.getShopInfo();
			}
			
			try {
			    uni.removeStorageSync('cashier_name');
			} catch (e) {
			    // error
			}
			
		},
		onShow() {
			try {
			    var cashier_name = uni.getStorageSync('cashier_name');
			    if (cashier_name) {
			        _self.storeInfo.usernickname = cashier_name;
			    }
			} catch (e) {
			    // error
			}
		},
		components:{
			"avatar":avatar,
			"lotus-address":lotusAddress
		},
		methods: {
			//设置店铺图文详情
			setDetailContent(){
				uni.navigateTo({
					url:"shop_info?id="+_self.storeId
				})
			},
			//绑定收银员
			bindShouYing(){
				uni.navigateTo({
					url:"bind_cashier?id="+_self.storeId+"&name="+_self.storeInfo.usernickname
				})
			},
			//绑定手机
			bindPhone(){
				uni.navigateTo({
					url:"new_phone?id="+_self.storeId+"&phone="+_self.storeInfo.tel
				})
			},
			//设置招牌商品
			setBrandGoods(){
				uni.navigateTo({
					url:"brand_goods?id="+_self.storeId
				})
			},
			//同步数据
			updateData(){
				//地区
				_self.lotusAddressData.provinceName = _self.storeInfo.provinces;
				_self.lotusAddressData.cityName = _self.storeInfo.citys;
				_self.lotusAddressData.townName = _self.storeInfo.districts;
				_self.region = _self.storeInfo.provinces + " " + _self.storeInfo.citys + " " + _self.storeInfo.districts; //region为已选的省市区的值
			
				//营业时间
				_self.time1 = _self.storeInfo.yingstarttime;
				_self.time2 = _self.storeInfo.yingendtime;
				if(_self.time1.trim() != ""){
					_self.date1 = _self.time1;
				}
				
				if( _self.time2.trim() != ""){
					_self.date2 = _self.time2;
				}
				
				//店面照片
				if(!_self.storeInfo.storeimg){
					_self.storeInfo.storeimg = [];
				}
				_self.photoList = _self.storeInfo.storeimg;
				
				//店铺标签
				if(_self.storeInfo.label != ""){
					_self.labelList = _self.storeInfo.label.split(",");
				}
				
			},
			//打开picker
			openPicker() {
				this.lotusAddressData.visible = true;
				
			},
			//回传已选的省市区的值
			choseValue(res){
				//res数据源包括已选省市区与省市区code
				console.log(res);
				this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if(res.isChose){
					this.lotusAddressData.provinceName = res.province;//省
					this.lotusAddressData.cityName = res.city;//市
					this.lotusAddressData.townName = res.town;//区
					this.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
			},
			//删除店面照片
			removePhoto(i){
				console.log(i);
				if(_self.photoList.length <= 1){
					_self.tipMsg("至少保留一张店面照片");
					return;
				}
				
				_self.photoList.splice(i,1);
				_self.storeInfo.storeimg = _self.photoList;
				console.log(_self.photoList);
			},
			//照片上传
			myUpload(rsp){
				console.log(rsp);
				_self.storeInfo.logo = rsp.path; //更新头像方式一
				_self.upLoadPhoto(0,rsp.path);
			},
			myUpload1(rsp){
				console.log(rsp);
				_self.upLoadPhoto(1,rsp.path);
			},
			//上传店面照片
			upLoadPhoto(flag,tempFilePaths){
				
				if(flag == 1 && _self.photoList.length >= 4){
					uni.showToast({
						title:"照片数量上限",
						icon:"none"
					})
					return;
				}
				

				//将图片传到服务器
				uni.uploadFile({
					url: _self.$httpUrl+'index.php/Api/Store/uploadImgFile', 
					filePath: tempFilePaths,
					name: 'image',
					formData:{
						"names":"image",
						"dirs":"shopSet"
					},
					success: (res) => {
						var dataEntity = JSON.parse(res.data);
						//console.log(dataEntity);
						if(dataEntity.status == "1"){
							var imgSrc = dataEntity.result.result[0];
							if(flag == 1){
								_self.photoList.push(imgSrc);
								_self.storeInfo.storeimg = _self.photoList;
							}else{
								_self.storeInfo.logo = imgSrc;
							}
							
						}else{
							uni.showToast({
								icon:"none",
								title:dataEntity.msg
							})
						}
						
						
						
					},fail: (e) => {
						
					},complete: (e) => {
						
					}
				});
			},
			//标签添加
			addLabel(flag){
				_self.showLabelWindow = !_self.showLabelWindow;
				if(flag == 1 && _self.labelStr.trim() != ""){
					if(_self.labelList.length < 4){
						_self.labelList.push(_self.labelStr);
					}else{
						uni.showToast({
							title:"标签数量上限",
							icon:"none"
						})
					}
				}
				
				_self.labelResult = _self.labelList.join(",");
				_self.storeInfo.label = _self.labelResult;
				_self.labelStr = "";
			},
			//标签移除
			removeLabel(i){
				console.log(i);
				_self.labelList.splice(i,1);
				_self.labelResult = _self.labelList.join(",");
				console.log(_self.labelResult);
				console.log(_self.labelList);
				_self.storeInfo.label = _self.labelResult;
			},
			//保存店铺修改信息
			saveNewInfo(){
				
				if(_self.storeInfo.storename.trim() == ""){
					_self.tipMsg("店铺名称不能为空");
					return;
				}
				
				var dataObj={
					storeid:_self.storeInfo.id,
					street:_self.storeInfo.street,
					provinces:_self.storeInfo.provinces,
					citys:_self.storeInfo.citys,
					districts:_self.storeInfo.districts,
					avgmoney:_self.storeInfo.avgmoney * 1,
					cat_id:_self.storeInfo.cat_id,
					keyword:_self.storeInfo.keyword,
					label:_self.storeInfo.label,
					logo:_self.storeInfo.logo,
					storeimg:_self.storeInfo.storeimg,
					storename:_self.storeInfo.storename,
					yingendtime:_self.storeInfo.yingendtime,
					yingstarttime:_self.storeInfo.yingstarttime
				};
				console.log(dataObj);
				//return;
				uni.request({
					url: _self.$httpUrl+'index.php/api/store/setstore', 
					method:"POST",
					data:dataObj,
					success: (res) => {
					 
					  console.log(res);
					  
					  if(res.data.status == 1){
						  uni.showToast({
							icon:"none",
							title:"设置成功！"
						  })
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
			//查询店铺已有信息
			getShopInfo(){
				
				uni.request({
					url: _self.$httpUrl+'index.php/api/store/getstore', 
					method:"POST",
					data:{
						storeid:_self.storeId
					},
					success: (res) => {
					 
					  console.log(res);
					  
					  if(res.data.status == 1){
						  _self.storeInfo = res.data.result.storeinfo;
						  
						 //同步数据
						 _self.updateData();
						 
						  _self.getTypeList();
						  
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
			//多选框变化
			typeChoiceChange(e){
				var arr = e.detail.value;
				if(arr.length > 3){
					_self.tipMsg("最多选择三个分类");
					return;
				}
				_self.typeIdList = arr;
			},
			//类型选择
			setTypeShow(flag){
				_self.showTypeWindow = !_self.showTypeWindow;
				if(flag == 1){
					_self.splitTypeStr();
				}
			},
			//加载分类数据
			getTypeList(){
				//加载分类数据
				uni.request({
				    url: _self.$httpUrl+'index.php/Api/index/getcategory', 
					method:"POST",
				    success: (res) => {
				        //console.log(res);
						if(res.data.status == "1" && res.data.result.length != 0){
							var tyList = res.data.result;
							_self.typeList = tyList;
							_self.typeIdList = _self.storeInfo.cat_id.split(",");
							_self.splitTypeStr();
						}
				        
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
			},
			//拆分  类别id 获取分类名字
			splitTypeStr(flag){
				
				var idArr = _self.typeIdList
				var objArr = _self.typeList;
				var wordStr = "";
				var idStr = idArr.join(",");
				
				for(var x=0;x<objArr.length;x++){
					objArr[x].check = false;
				}
				
				for(var i=0;i<idArr.length;i++){
					for(var j=0;j<objArr.length;j++){
						if(idArr[i] == objArr[j].id){
							objArr[j].check = true;
							wordStr = wordStr + " " + objArr[j].name;
						}
					}
				}
				
				// console.log(idStr);
				// console.log(wordStr);
				
				_self.typeStr = wordStr;
				_self.storeInfo.cat_id = idStr;
				
			},
			
			bindDateChange: function(e) {
				_self.date1 = e.target.value;
				_self.time1 = e.target.value;
				_self.storeInfo.yingstarttime = e.target.value;
			},
			bindDateChange2: function(e) {
				_self.date2 = e.target.value;
				_self.time2 = e.target.value;
				_self.storeInfo.yingendtime = e.target.value;
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
	
	@import url("css/shop_set.css");
	
</style>
