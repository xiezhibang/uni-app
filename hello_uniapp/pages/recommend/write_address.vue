<template>
	<view class="write_address_page">
		<toprow titleval="填写地址"></toprow>
		
		<view class="top_free">
			
			<view class="address_item">收货人<input type="text" v-model="uname"  placeholder="请填写收货人"/></view>
			<view class="address_item">手机号<input type="number" v-model="phone" maxlength="11" placeholder="请填写收货手机号"/></view>
			<view class="address_item" @click="openPicker">所在地区<input type="text" disabled="true" v-model="region" maxlength="11" placeholder="请选择省市区"/><image :src="getImgSrc('tuijian/tj11.png')" mode="widthFix"></image></view>
			<view class="address_item">详细地址<input type="text" v-model="uaddress" placeholder="请填写详细地址"/></view>
			
		</view>
		
		<button class="purple_btn" :class="{save_btn : !canSave}" hover-class="none" @click="saveAddress">保存</button>
		
		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
		
	</view>
	
</template>

<script>
	import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	var _self;
	export default{
		data(){
			return {
				canSave:true,
				positionInfo:"",
				lotusAddressData:{
					visible:false,
					provinceName:'',
					cityName:'',
					townName:'',
				},
				region:'',
				phone:"",
				uname:"",
				uaddress:""
			}
		},
		onLoad() {
			_self = this;
			uni.getLocation({
				type: 'wgs84',
				geocode:true,
				success: function (res) {
					_self.getCurrentSite(res.longitude,res.latitude);
					
				},fail() {

				}
			});
		},
		onShow() {
			_self = this;
			try{
				var adInfo = uni.getStorageSync("user_address");
				if(adInfo != ""){
					_self.uname = adInfo.uname;
					_self.phone = adInfo.uphone;
					_self.uaddress = adInfo.uaddress;
					_self.uname = adInfo.uname;
					_self.uname = adInfo.uname;
					_self.lotusAddressData.provinceName = adInfo.uProvince;
					_self.lotusAddressData.cityName = adInfo.uCity;
					_self.lotusAddressData.townName = adInfo.uTown;
					_self.region = adInfo.uProvince + " " + adInfo.uCity + " " + adInfo.uTown;
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		components:{
			"lotus-address":lotusAddress
		},
		methods:{
			//根据经纬度拿到当前省市区
			getCurrentSite(lng,lat){
				uni.request({
				    url:"https://restapi.amap.com/v3/geocode/regeo?output=json&location="+lng+","+lat+"&key=f37d49f85f46c59af0ee84115b6c1f3c&radius=0&extensions=all", 
					method:"POST",
				    success: (res) => {
						console.log(res);
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
			//打开picker
			openPicker() {
				this.lotusAddressData.visible = true;
			
			},
			//回传已选的省市区的值
			choseValue(res){
				//res数据源包括已选省市区与省市区code
				console.log(res);
				_self.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
				//res.isChose = 1省市区已选 res.isChose = 0;未选
				if(res.isChose){
					_self.lotusAddressData.provinceName = res.province;//省
					_self.lotusAddressData.cityName = res.city;//市
					_self.lotusAddressData.townName = res.town;//区
					_self.region = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
				}
			},
			saveAddress(){
				
				if(_self.uname.trim() == ""){
					_self.showTips("请填写收货人")
					return;
				}
				
				if(!_self.checkPhone(_self.phone)){
					_self.showTips("手机号格式不正确")
					return;
				}
				
				if(_self.region.trim() == ""){
					_self.showTips("请选择省市区")
					return;
				}
				
				if(_self.uaddress.trim() == ""){
					_self.showTips("请填写详细地址")
					return;
				}
				
				var addressInfo = {
					uname:_self.uname,
					uphone:_self.phone,
					uProvince:_self.lotusAddressData.provinceName,
					uCity:_self.lotusAddressData.cityName,
					uTown:_self.lotusAddressData.townName,
					uaddress:_self.uaddress
				}
				
				try{
					uni.setStorageSync("user_address",addressInfo);
				}catch(e){
					//TODO handle the exception
				}
				
				uni.navigateBack({
					delta:1
				})
				
				
			},
			showTips(str){
				uni.showToast({
					title:str,
					icon:"none"
				})
			},
			chooseLocationFun(){
				uni.chooseLocation({
					success: (data)=> {
						console.log(data);
						_self.positionInfo = data.address;
					}
				})
			}
		}
	}
	
</script>

<style>
	@import url("css/write_address.css");
</style>
