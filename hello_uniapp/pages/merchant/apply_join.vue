<template>
	<view>
		<view class="head_out">
			<view class="title_padding"></view>
			<view class="head_row">
				<view class="back_before" @click="backBeforePage">
					<image :src="getImgSrc('back/back2.png')" mode="widthFix"></image>
				</view>
				申请加盟
				<navigator open-type="navigate" url="audit_info"><view class="cash_log_entrance">审核详情</view></navigator>
				
			</view>
		</view>
		
		<view class="top_free">
			
			<view class="line_coat">
				<view class="line_logo">
					<image :src="getImgSrc('shangjia/sj25.png')" mode="widthFix" class="camera_icon"></image>
					LOGO
					<!-- <image :src="logoImg" class="upImg"></image> -->
					<avatar class="upImg"
						selWidth="500upx" selHeight="500upx" @upload="myUpload" :avatarSrc="logoImg"
						avatarStyle="width: 128upx; height: 128upx; border-radius:1upx;">
					</avatar>
				</view>
				
				<view class="line_input">
					<view class="left">店铺名称：</view>
					<view class="right"><input class="ipt" type="text" v-model="name" placeholder="请输入店铺名称" /></view>
				</view>
				
				<view class="line_input">
					<view class="left">所在地区：</view>
					<view class="right" @click="openPicker"><input class="ipt" type="text" disabled="true" v-model="region" placeholder="请选择所在地区" /></view>
				</view>
				
				<view class="line_input">
					<view class="left">店铺地址：</view>
					<view class="right">
						<input class="ipt" type="text" v-model="address" placeholder="请输入店铺地址" />
						
					</view>
				</view>
				
				<view class="line_input">
					<view class="left">店铺类别：</view>
					<view class="right" @click="setTypeShow(0)"><input class="ipt" type="text" disabled="true" v-model="typeStr" placeholder="请选择店铺类别" /></view>
				</view>
				
				<view class="line_input">
					<view class="left">联系人：</view>
					<view class="right"><input class="ipt" type="text" v-model="user" placeholder="请填写联系人" /></view>
				</view>
				
				<view class="line_input">
					<view class="left">联系电话：</view>
					<view class="right"><input class="ipt" type="number" maxlength="11" v-model="phone" placeholder="请填写联系电话" /></view>
				</view>
				
				<view class="line_input">
					<view class="left">验证码：</view>
					<view class="right">
						<input class="ipt yzm" type="number" maxlength="10" v-model="code" placeholder="请输入验证码" />
						<view class="check_code" v-if="canGet" @click="getCodeOne">获取验证码</view>
						<view class="check_code wait" v-if="!canGet">{{time1}}s后重新获取</view>
					</view>
				</view>

				<view class="word_line">上传身份证正反面</view>
				
				<view class="sfz_box">
					<view class="sfz_photo">
						<image :src="getImgSrc('shangjia/sj25.png')" mode="widthFix" class="camera_icon"></image>
						上传身份证正面
						<!-- <image :src="sfzImg1" class="upImg"></image> -->
						<avatar class="upImg"
							selWidth="600upx" selHeight="380upx" @upload="myUpload1" :avatarSrc="sfzImg1"
							avatarStyle="width: 250upx; height: 158upx; border-radius:1upx;">
						</avatar>
					</view>
					
					<view class="sfz_photo">
						<image :src="getImgSrc('shangjia/sj25.png')" mode="widthFix" class="camera_icon"></image>
						上传身份证反面
						<!-- <image :src="sfzImg2" class="upImg"></image> -->
						<avatar class="upImg"
							selWidth="600upx" selHeight="380upx" @upload="myUpload2" :avatarSrc="sfzImg2"
							avatarStyle="width: 250upx; height: 158upx; border-radius:1upx;">
						</avatar>
					</view>
				
				</view>
				
				
				<view class="box_line_wrap">
					<view class="word_line">上传店面照片</view>
					
				</view>
				
				<view class="box_line_wrap">
					
					<view class="pic_wrap">
						<view class="picture_box shop">
							<image :src="getImgSrc('shangjia/sj2.png')" mode="widthFix" class="camera_icon"></image>
							<!-- <image :src="shopImg" class="upImg"></image> -->
							<avatar class="upImg"
								selWidth="750upx" selHeight="450upx" @upload="myUpload4" :avatarSrc="shopImg"
								avatarStyle="width: 250upx; height: 150upx; border-radius:1upx;">
							</avatar>
						</view>
						
					</view>
					
				</view>
				
				<view class="word_line">上传营业执照</view>
				
				<view class="box_line_wrap">
					<view class="pic_wrap">
						<view class="picture_box">
							<image :src="getImgSrc('shangjia/sj2.png')" mode="widthFix" class="camera_icon"></image>
							<!-- <image :src="licenseImg" class="upImg"></image> -->
							<avatar class="upImg"
								selWidth="500upx" selHeight="716upx" @upload="myUpload3" :avatarSrc="licenseImg"
								avatarStyle="width: 250upx; height: 358upx; border-radius:1upx;">
							</avatar>
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="purple_btn" @click="applyJoin">申请</view>
			
			<view class="last_word">申请即表示同意聚富财码<text @click="goPage(0)">用户协议</text>和<text @click="goPage(1)">隐私条款</text></view>
			
		</view>
	
		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
		
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
		
		
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	var _self;
	var timer;
	export default {
		data() {
			return {
				canGet:true,
				time1:60,
				loginInfo:{},
				lotusAddressData:{
					visible:false,
					provinceName:'',
					cityName:'',
					townName:'',
				},
				region:'',
				logoImg:'',
				sfzImg1:'',
				sfzImg2:'',
				licenseImg:'',
				shopImg:'',
				name:'',
				user:'',
				address:'',
				phone:'',
				code:'',
				typeList:[],
				typeIdList:[],
				showTypeWindow:false,
				typeStr:"",
				cat_id_str:""
			}
		},
		onLoad() {
			_self=this;
			this.getTypeList();
			uni.getLocation({
				type: 'wgs84',
				geocode:true,
				success: function (res) {
					_self.getCurrentSite(res.longitude,res.latitude);
				},fail() {
			 
				}
			 });
		},
		onShow(){
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
		},
		components:{
			"lotus-address":lotusAddress,
			avatar
		},
		methods: {
			//跳转协议和条款
			goPage(i){
				if(i == 0){
					uni.navigateTo({
						url:"/pages/personal/user_guide"
					})
				}else{
					uni.navigateTo({
						url:"/pages/personal/privacy_policy"
					})
				}
			},
			//根据经纬度拿到当前省市区
			getCurrentSite(lng,lat){
				uni.request({
					url:"https://restapi.amap.com/v3/geocode/regeo?output=json&location="+lng+","+lat+"&key=f37d49f85f46c59af0ee84115b6c1f3c&radius=0&extensions=all", 
					method:"POST",
					success: (res) => {
						//console.log(res);
						if(res.data.info == "OK"){
							
							_self.lotusAddressData.provinceName = res.data.regeocode.addressComponent.province;
							_self.lotusAddressData.townName = res.data.regeocode.addressComponent.district;
							_self.lotusAddressData.cityName = res.data.regeocode.addressComponent.city;
							
							if(_self.lotusAddressData.cityName instanceof Array){
								_self.lotusAddressData.cityName = res.data.regeocode.addressComponent.district;
								_self.lotusAddressData.townName = "";
							}
							
						}
					 
					  
					},fail: (e) => {
						
					},complete: (e) => {
						
					}
				});
			},
			//最高层级
			coverTop(i){
				console.log(i);
			},
			//获取裁剪后的图像
			myUpload(rsp) {
				//console.log(rsp);
				_self.logoImg = rsp.path; //更新头像方式一
				//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
				_self.upImgToServer(0,rsp.path);
			},
			myUpload1(rsp) {
				//console.log(rsp);
				_self.sfzImg1 = rsp.path; //更新头像方式一
				_self.upImgToServer(1,rsp.path);
			},
			myUpload2(rsp) {
				//console.log(rsp);
				_self.sfzImg2 = rsp.path; //更新头像方式一
				_self.upImgToServer(2,rsp.path);
			},
			myUpload3(rsp) {
				//console.log(rsp);
				_self.licenseImg = rsp.path; //更新头像方式一
				_self.upImgToServer(3,rsp.path);
			},
			myUpload4(rsp) {
				//console.log(rsp);
				_self.shopImg = rsp.path; //更新头像方式一
				_self.upImgToServer(4,rsp.path);
			},
			//获取手机验证码
			getCodeOne(){
				
				var phoneNum = _self.phone;
				if(!_self.checkPhone(phoneNum)){
					return;
				}
				
				uni.request({
				    url: _self.$httpUrl+'index.php/api/store/sendcodemess', 
					method:"POST",
					data:{
						mobile:phoneNum,
						scene:12
					},
				    success: (res) => {
				      
					  //console.log(res);
					  
					  if(res.data.status == "1"){
							_self.canGet = false;
							_self.timeDown();
					  }
					  
					  uni.showToast({
					  	title:res.data.msg,
					  	icon:'none'
					  })
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
				
			},
			//倒计时
			timeDown(){
				clearInterval(timer);
				_self.time1 = 60;
				timer = setInterval(function(){
					_self.time1 = _self.time1 - 1;
					if(_self.time1 < 1){
						clearInterval(timer);
						_self.canGet = true
						_self.time1 = 60;
					}
				},1000);
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
			//数据归位
			dataInit(){
				_self.name = "";
				_self.code = "";
				_self.address = "";
				clearInterval(timer);
				_self.canGet = true
				_self.time1 = 60;
				_self.licenseImg = "";
				_self.shopImg = "";
				_self.logoImg = "";
			},
			//申请加盟
			applyJoin(){
				
				var dataObj={
					code:_self.code,
					provinces:_self.lotusAddressData.provinceName,
					citys:_self.lotusAddressData.cityName,
					districts:_self.lotusAddressData.townName,
					certificateimg:_self.sfzImg1,
					certificateimg1:_self.sfzImg2,
					licenseimg:_self.licenseImg,
					storeimg:_self.shopImg,
					storelogo:_self.logoImg,
					mobile:_self.phone,
					storeaddress:_self.address,
					storename:_self.name,
					username:_self.user,
					cat_id:_self.cat_id_str,
					user_id:_self.loginInfo.uid
				};
				
				console.log(dataObj);
				
				if(dataObj.storelogo.trim() == ""){
					_self.tipMsg("请上传店铺LOGO")
					return;
				}
				
				if(dataObj.storename.trim() == ""){
					_self.tipMsg("请填写店铺名称")
					return;
				}
				
				if(dataObj.provinces.trim() == ""){
					_self.tipMsg("请选择地区")
					return;
				}
				
				if(dataObj.storeaddress.trim() == ""){
					_self.tipMsg("请填写店铺地址")
					return;
				}
				
				if(dataObj.cat_id.trim() == ""){
					_self.tipMsg("请选择店铺类别")
					return;
				}
				
				if(dataObj.username.trim() == ""){
					_self.tipMsg("请填写联系人")
					return;
				}
				
				if(!_self.checkPhone(dataObj.mobile)){
					_self.tipMsg("手机号格式不正确")
					return;
				}
				
				if(dataObj.code.trim() == ""){
					_self.tipMsg("请填写验证码")
					return;
				}
				
				if(dataObj.certificateimg.trim() == "" || dataObj.certificateimg1.trim() == ""){
					_self.tipMsg("请上传身份证")
					return;
				}
				
				if(dataObj.storeimg.trim() == ""){
					_self.tipMsg("请上传店面照片")
					return;
				}
				
				if(dataObj.licenseimg.trim() == ""){
					_self.tipMsg("请上传营业执照")
					return;
				}
			
				
				uni.request({
				    url: _self.$httpUrl+'index.php/Api/store/addUserstore', 
					method:"POST",
					data:dataObj,
				    success: (res) => {
				     
				      console.log(res);
					  
					  if(res.data.status == 1){
							_self.dataInit();
							setTimeout(function(){
								uni.navigateTo({
									url:"audit_info"
								})
							},1500);
						
					  }else{
						  
					  }
					  
					  uni.showToast({
						title:res.data.msg,
						icon:'none'
					  })
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
			},
			uploadImg(i){
				
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //相册或相机
				    success: function (res) {
						console.log(res.tempFiles);
						//const tempFilePaths = (res.tempFilePaths)[0];
						const tempFilePaths = res.tempFiles[0].path;
						//将图片传到服务器
						_self.upImgToServer(i,tempFilePaths);
						
				    }
				});
				
			},
			//上传图片到服务器
			upImgToServer(i,imgFile){
				
				uni.uploadFile({
					url: _self.$httpUrl+'index.php/Api/Store/uploadImgFile', 
					filePath: imgFile,
					name: 'image',
					formData:{
						"names":"image",
						"dirs":"shopAdd"
					},
					success: (res) => {
						var dataEntity = JSON.parse(res.data);
						console.log(dataEntity);
						if(dataEntity.status == "1"){
							var imgSrc = dataEntity.result.result[0];
							if(i == 0){
								_self.logoImg = imgSrc;
							}else if(i == 1){
								_self.sfzImg1 = imgSrc;
							}else if(i == 2){
								_self.sfzImg2 = imgSrc;
							}else if(i == 3){
								_self.licenseImg = imgSrc;
							}else if(i == 4){
								_self.shopImg = imgSrc;
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
				_self.cat_id_str = idStr;
				
			},
			backBeforePage: ()=>{
				
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
	
</script>

<style>
	
	@import url("css/apply_join.css");
	
</style>
