import Vue from 'vue'
import App from './App'
import toprow from './components/toprow.vue'
import toprow2 from './components/toprow2.vue'
import rateShow from './components/rateShow.vue'
import noData from './components/noData.vue'
import loading from './components/loading.vue'

Vue.component('toprow',toprow);
Vue.component('toprow2',toprow2);
Vue.component('rateShow',rateShow);
Vue.component('noData',noData);
Vue.component('loading',loading);

Vue.config.productionTip = false;

Vue.prototype.$httpUrl = "https://www.jfcma.com/";

//获取图片路径
Vue.prototype.getImgSrc = function(src){
	return "https://www.jfcma.com/public/images/jfcm/" + src;
}


//登录检查
Vue.prototype.checkLogin = function(backpage, backtype){
	try{
		var SUID  = uni.getStorageSync('u_id');
		var SRAND = uni.getStorageSync('u_token');
		var SNAME = uni.getStorageSync('u_name');
		var SFACE = uni.getStorageSync('u_head');
		var SOID = uni.getStorageSync('u_openid');
		if(SUID == '' || SRAND == '' || SFACE == ''){
			uni.redirectTo({url:'../login/login?backpage='+backpage+'&backtype='+backtype});
			return false;
		}
		
		return {uid:SUID,token:SRAND,name:SNAME,head:SFACE,openid:SOID};
	}catch(e){
		//TODO handle the exception
		return false;
	}
}

Vue.prototype.tipMsg = function(str,time,icon,mask){
		str = str == undefined ? "系统繁忙" : str;
		time = time == undefined ? 1500 : time;
		icon = icon == undefined ? "none" : icon;
		mask = mask == undefined ? false : mask;
		uni.showToast({
			title:str,
			icon:icon,
			mask:mask,
			duration:time
		})
}

//验证手机号
Vue.prototype.checkPhone = function(phone){
	if(!(/^1[23456789]\d{9}$/.test(phone))){
		uni.showToast({
			title:"手机号格式不正确",
			icon:'none'
		})
		return false;
	}
	
	return true;
}




App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
