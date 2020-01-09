<template>
	<view>
		<toprow titleval="定位"></toprow>
		
		<view class="backHome" @click.stop="backHomePage"></view>
		
		<view class="top_free">
			
			<city-select
				@cityClick="cityClick"
				:formatName="formatName"
				:activeCity="activeCity"
				:hotCity="hotCity"
				:obtainCitys="obtainCitys"
				:isSearch="true"
				ref="citys"
			></city-select>
			
		</view>
		
	</view>
</template>

<script>
import citys from '../../components/city-select/citys.js'
import citySelect from '../../components/city-select/city-select.vue'

var _self;

export default {
	data() {
		return {
			//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
			formatName: 'title',
			//当前城市
			activeCity: {
				id: 1,
				title: '广州市'
			},
			//热门城市
			hotCity: [
				{
					id: 0,
					title: '广州市'
				},
				{
					id: 1,
					title: '南宁市'
				}
			],
			//显示的城市数据
			obtainCitys: [
				
			]
		}
	},
	components: {
		citySelect
	},
	onLoad(opt) {
		
		_self = this;
		if(opt.city != undefined){
			//修改当前城市
			_self.activeCity = {
				cityName: opt.city,
				cityCode: 123456
			}
		}
		
		//动态更新数据
		setTimeout(() => {
			//修改数据格式
			_self.formatName = 'cityName'
			
			//修改热门城市
			_self.hotCity = [
				{
					cityName: '广州市',
					cityCode: 440100
				},
				{
					cityName: '南宁市',
					cityCode: 530000
				}
			]
			//修改构建索引数据
			_self.obtainCitys = citys
			
		}, 200)
	},
	methods: {
		cityClick(item) {
			var obj = JSON.stringify(item);
			console.log(obj);
			_self.activeCity = {
				cityName: item.cityName,
				cityCode: item.cityCode * 1
			}
			uni.setStorage({
				key: 'city',
				data: _self.activeCity
			})
			
			_self.backHomePage();
		},
		backHomePage(){
			uni.switchTab({
				url:'../index/index?city=' + _self.activeCity
			})
		}
	}
}
</script>

<style>
	
	.backHome{
		position: fixed;
		width: 100upx;
		height: 128upx;
		top:var(--status-bar-height);
		left: 0;
		z-index: 11000;
		opacity: 0;
	}
	
	
</style>
