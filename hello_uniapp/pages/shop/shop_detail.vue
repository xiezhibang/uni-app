<template>
	<view v-if="shopInfo.list != undefined">
		<view class="title_padding fix" style="background: #fff;"></view>
		<view class="title_padding"></view>
		
		<view class="swiper_box">
			<swiper 
			@change="swiperChange"
			:indicator-dots="false" 
			:autoplay="false"
			:circular="true"
			:duration="1000">
				<block v-for="(item,index) of shopInfo.list.storeimg" :key="index">
				<swiper-item>
					<view class="swiper-item"><image :src="item" mode="widthFix"></image></view>
				</swiper-item>
				</block>
			</swiper>
			
			<!-- 返回 -->
			<view class="sw_btn back" @click="backBeforePage">
				<image :src="getImgSrc('home/home6.png')" mode="widthFix"></image>
			</view>
			
			<!-- 收藏 -->
			
			<view v-if="is_collect == 0" class="sw_btn love" @click="likeShop(1)">
				<image :src="getImgSrc('home/home9.png')" mode="widthFix"></image>
			</view>
			<view v-else class="sw_btn love" @click="likeShop(0)" style="background: red;">
				<image :src="getImgSrc('home/home9.png')" mode="widthFix"></image>
			</view>
			
			<!-- 分享 -->
			<!-- #ifndef MP-WEIXIN -->
			<view class="sw_btn share" @click="shareBlockFun">
				<image :src="getImgSrc('home/home7.png')" mode="widthFix"></image>
				<view class="share_block" v-if="showShareBlock">
					<view class="share_line" @click="shareFriendFun"><image :src="getImgSrc('home/home19.png')" mode="widthFix"></image>微信好友</view>
					<view class="share_line" @click="shareCircleFun"><image :src="getImgSrc('home/home8.png')" mode="widthFix"></image>朋友圈</view>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="sw_btn share">
				<image :src="getImgSrc('home/home7.png')" mode="widthFix"></image>
				<button class="shareBtn" open-type="share"></button>
			</view>
			<!-- #endif -->

			<!-- 数值标识 -->
			<view class="sw_num">{{crIndex + 1}}/{{shopInfo.list.storeimg.length}}</view>	
			
		</view>
		
		<!-- 店铺名称 -->
		<view class="shop_name">
			{{shopInfo.list.storename}}
			<view class="tag ct_obj">{{shopInfo.list.isopen == 0 ? '营业中' : '休息中'}}</view>
		</view>
		
		<!-- 地址 -->
		<view class="shop_address">
			<image class="ct_obj" :src="getImgSrc('home/home1.png')" mode="widthFix"></image>
			{{shopInfo.list.street}}
			<view class="phone_call ct_obj" @click="callPhone">
				<image :src="getImgSrc('home/home2.png')" mode="widthFix"></image>
			</view>
		</view>
		
		<!-- 常规参数 -->
		<view class="custom_line"><text>营业时间：</text>{{shopInfo.list.yingstarttime}}~{{shopInfo.list.yingendtime}}</view>
		<view class="custom_line"><text>分类：</text>{{shopInfo.list.cat_name}}</view>
		<view class="custom_line"><text>标签：</text>{{shopInfo.list.label}}</view>
		<view class="custom_line">
			<text>评价：</text>
			<view class="star_info">
				<rate-show :num="shopInfo.list.service_rank" :size="24"></rate-show>
				<text v-if="shopInfo.list.service_rank == 0">暂无</text>
			</view>
		</view>
		
		<view class="custom_line"><text>月销量{{shopInfo.ordernum}}份</text><view class="avg_price ct_obj">￥{{shopInfo.list.avgmoney}}/人</view></view>
		
		<!-- 隔离线 -->
		<view class="line_grey" v-if="couponList.length > 0"></view>
		
		<!-- 活动券 -->
		<view class="sp_box_item active_ticket_box" v-if="couponList.length > 0">
			<view class="sp_title_line ticket_line_title">
				<image :src="getImgSrc('home/home15.png')" mode="widthFix"></image>
				活动券
			</view>
			
			<view class="ticket_item" v-for="(item,index) of couponList" :key="index">
				<view class="ti_red">分润比例：{{item.rate}}%</view>
				
				<view class="ti_desc">
					<view class="left">活动详情：</view><view>{{item.activity_detail}}</view>
				</view>
				
				<view class="ti_time">
					<view class="left">活动时间：</view><view>{{item.send_start_time}}至{{item.send_end_time}}</view>
				</view>
				
				<button class="get_ticker_btn ct_obj" hover-class="none" :data-id="item.id" @click="getTicketFun">领取</button>
				
			</view>
			<view class="lookMore" @click="nextPage" v-if="!isLast">查看更多</view>
		</view>
		
		<!-- 隔离线 -->
		<view class="line_grey"></view>
		
		<!-- 招牌商品 -->
		<view class="sp_box_item shop_hot_goods">
			<view class="sp_title_line hot_goods_title">
				<image :src="getImgSrc('home/home21.png')" mode="widthFix"></image>
				招牌商品
			</view>
			
			<view class="hot_line">
				<scroll-view scroll-x="true" class="hot_scroll_box">
					<view class="hot_list">
						<view class="hot_dish" v-for="(item,index) of shopInfo.goods" :key="index">
							<view class="img_coat" @click="lookBigImg(item.original_img)">
								<image :src="item.original_img" mode="widthFix"></image>
							</view>
							<view class="hot_letter">
								<view class="hot_dish_name">{{item.goods_name}}</view>
								<view class="hot_dish_price">￥{{item.shop_price}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			
		</view>
		
		<!-- 隔离线 -->
		<view class="line_grey"></view>
		
		<!-- 店铺详情 -->
		<view class="sp_box_item shop_introduce">
			<view class="sp_title_line shop_info_title">
				<image :src="getImgSrc('home/home3.png')" mode="widthFix"></image>
				店铺详情
			</view>
			
			
			<image :src="shopInfo.list.biref" mode="widthFix" class="introduce_img"></image>
			
			<!-- <view class="introduce_word">
				文字说明
			</view> -->
			
			<view class="over_block"></view>
			
		</view>
		
		
		<!-- 提示 -->
		<view class="getTips" v-show="isShowTip">
			<image :src="getImgSrc('home/home33.png')" mode="widthFix"></image>
			<view>成功领取活动券</view>
		</view>
		
		<loading v-if="loadData"></loading>
		
	</view>
</template>

<script>
	var isLoadInterFace = false;
	var _self;
	export default {
		data() {
			return {
				loadData:true,
				loginInfo:{},
				is_collect:0,
				shopId:0,
				crIndex:0,
				showShareBlock:false,
				isShowTip:false,
				shopInfo:{},
				couponList:[],
				currentPage:1,
				totalPage:1,
				isLast:true
			}
		},
		onLoad(opt) {
			_self=this;
			var loginRes = this.checkLogin('../index/index', '2');
			if(!loginRes){return false;}
			this.loginInfo = loginRes;
			
			//console.log(opt);
			if(opt.id != undefined){
				_self.shopId = opt.id;
				_self.searchShopInfo();
				_self.lookLikeStatus();
			}
		},
		onShow() {
			
		},
		onShareAppMessage() {
			return {
				title: "来和我一起Get新技能吧！",
				path: '/pages/index/index',
				imageUrl:'http://www.jfcma.com/public/images/jfcm/logo.png'
			}
		},
		methods: {
			//预览大图
			lookBigImg(imgdata){
				imgdata=[imgdata];
				uni.previewImage({
					urls: imgdata,
					current:1,
					success(e) {
						//console.log(e);
					},fail(e) {
						
					},complete(e) {
						
					}
					
				});
			},
			//拨打电话
			callPhone(){
				
				if(_self.checkPhone(_self.shopInfo.list.tel)){
					uni.makePhoneCall({
					    phoneNumber: _self.shopInfo.list.tel
					});
				}
				
			},
			//查询店铺是否收藏
			lookLikeStatus(){
				//console.log(_self.shopId);
				//console.log(_self.loginInfo.uid);
				uni.request({
				    url: _self.$httpUrl+'index.php/api/index/isCollect', 
					method:"POST",
					data:{
						storeid:_self.shopId,
						user_id:_self.loginInfo.uid
					},
				    success: (res) => {
				     
				      //console.log(res);
					  
					  if(res.data.status == 1){
						_self.is_collect = res.data.result;
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
			},
			//店铺收藏
			likeShop(x){
				uni.request({
				    url: _self.$httpUrl+'api/index/collect', 
					method:"POST",
					data:{
						storeid:_self.shopId,
						type:x,
						user_id:_self.loginInfo.uid
					},
				    success: (res) => {
				     
				      //console.log(res);
					  
					  if(res.data.status == 1){
						_self.is_collect = x;
						if(x == 0){
							uni.showToast({
								title:"取消收藏",
								icon:"none"
							})
						}else{
							uni.showToast({
								title:"收藏成功",
								icon:"none"
							})
						}
					  }
					  
				    },fail: (e) => {
						
				    },complete: (e) => {
						
				    }
				});
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
						_self.getShopCoupon(pageNum);
					}
				}
			},
			//查询店铺优惠券列表
			getShopCoupon(pageNum){
				uni.request({
				    url: _self.$httpUrl+'index.php/api/index/storeCoupon', 
					method:"POST",
					data:{
						storeid:_self.shopId,
						page:pageNum,
						limit:3
					},
				    success: (res) => {
				      //console.log(res);
					  if(res.data.status == 1){
						  _self.couponList = _self.couponList.concat(res.data.result.data);
						  _self.currentPage = res.data.result.current_page;
						  _self.isLast = _self.currentPage == res.data.result.last_page ? true : false;
					  }
				     
				    },fail: (e) => {
						
				    },complete: (e) => {
						isLoadInterFace = false;
				    }
				});
			},
			//查询店铺详情
			searchShopInfo(){
				
				uni.request({
				    url: _self.$httpUrl+'api/index/storeDetail', 
					method:"POST",
					data:{
						id:_self.shopId
					},
				    success: (res) => {
				      //console.log(res);
					  if(res.data.status == 1){
						  _self.shopInfo = res.data.result;
						  _self.getShopCoupon(1);
					  }
				     
				    },fail: (e) => {
						
				    },complete: (e) => {
						_self.loadData = false;
				    }
				});
				
			},
			showTipsFun(){
				_self.isShowTip = true;
				setTimeout(function(){
					_self.isShowTip = false;
				},1500);
			},
			//分享好友
			shareFriendFun(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "www.baidu.com",
					title: "来和我一起Get新技能吧！",
					summary: "我用这款App领取各种吃喝玩乐优惠券，还拿到了不少的分润哦，快来和我一起享优惠、拿分润吧！",
					imageUrl: "http://www.jfcma.com/public/images/jfcm/logo.png",
					success: function (res) {
						//console.log("success:" + JSON.stringify(res));
						_self.tipMsg("感谢分享！")
					},
					fail: function (err) {
						//console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			//分享朋友圈
			shareCircleFun(){
				
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
				    href: "www.baidu.com",
				    title: "来和我一起Get新技能吧！",
				    summary: "我用这款App领取各种吃喝玩乐优惠券，还拿到了不少的分润哦，快来和我一起享优惠、拿分润吧！",
				    imageUrl: "http://www.jfcma.com/public/images/jfcm/logo.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
						_self.tipMsg("感谢分享！")
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
				
			},
			shareBlockFun(){
				_self.showShareBlock = !_self.showShareBlock;
			},
			swiperChange(e){
				_self.crIndex = e.detail.current;
			},
			backBeforePage: ()=>{
				
				uni.navigateBack({
					delta:1
				})
			},
			getTicketFun(e){
				
				console.log(e);
				var cid = e.currentTarget.dataset.id;
				uni.request({
					url: _self.$httpUrl+'api/index/getCoupon', 
					method:"POST",
					data:{
						id:cid,
						user_id:_self.loginInfo.uid
					},
					success: (res) => {
					  console.log(res);
					  if(res.data.status == 1){
						  if(!_self.isShowTip){
						  	_self.showTipsFun();
						  }
					  }else{
						  uni.showToast({
						  	title:res.data.msg,
							icon:"none"
						  })
					  }
					 
					},fail: (e) => {
						
					},complete: (e) => {
						
					}
				});
			}
			
		}
	}
	
</script>

<style>
	
	@import url("css/shop_detail.css");
	
</style>
