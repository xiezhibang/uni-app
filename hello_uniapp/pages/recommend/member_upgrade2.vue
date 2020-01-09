<template>
	
	<view class="member_upgrade2_page">
		<toprow2 titleval="会员升级"></toprow2>
		
		<view class="top_free">
			<image class="headImg" :src="getImgSrc('tuijian/tj27.png')" mode="widthFix"></image>
			
			<view class="content_box">
				<view class="white_block one">
					
					<view class="ball_box"></view>
					
					<view class="big_tit_box">
						<view class="tit_text">升级规则</view>
					</view>
					
					<!-- 段落标题 -->
					<view class="part_box tit">
						<view class="left_cube">
							<view class="big_ball">1</view>
						</view>
						<view class="right_cube">
							<text class="big_tit_letter">会员（无任何要求）</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>注册即可成为会员，邀请会员，获得被邀请会员消费分润<text class="color_word">（商家让利-5%）*2%</text></text>
						</view>
					</view>
					
					<view class="goUpGrade" @click="goUpGrade" v-if="!mbr">去升级掌柜</view>
					
					<view class="part_box tit">
						<view class="left_cube">
							<view class="big_ball">2</view>
						</view>
						<view class="right_cube">
							<text class="big_tit_letter">升级掌柜</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>会员购买升级礼包升级成为掌柜，邀请会员，获得被邀请会员消费分润
							<text class="color_word">（商家让利-5%）*12%，（会员12%-2%）</text>；
							</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>掌柜直接邀请升级掌柜奖励<text class="color_word">100元</text>/位；</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>掌柜邀请城市合伙人，获得城市合伙人签约金额<text class="color_word">10%</text>/位奖励。</text>
						</view>
					</view>
					
					<view class="part_box tit">
						<view class="left_cube">
							<view class="big_ball">3</view>
						</view>
						<view class="right_cube">
							<text class="big_tit_letter">升级运营商</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>掌柜直接邀请20名掌柜成为运营商，邀请会员，获得被邀请会员消费分润<text class="color_word">（商家让利-5%）*15%，（会员15%-2%，掌柜15%-12%）</text>；</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>运营商直接邀请升级掌柜奖励<text class="color_word">200元</text>/位；</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>运营商邀请城市合伙人，获得城市合伙人签约金额<text class="color_word">20%</text>/位奖励。</text>
						</view>
					</view>
					
					<image class="left_img" :src="getImgSrc('tuijian/tj28.png')" mode="widthFix"></image>
				</view>
				
				<view class="white_block two">
					<view class="part_box tit">
						<view class="left_cube">
							<view class="big_ball">4</view>
						</view>
						<view class="right_cube">
							<text class="big_tit_letter">升级城市运营商</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>直接成功培养5位运营商成为城市运营商，邀请会员，获得被邀请会员消费分润<text class="color_word">（商家让利-5%）20%，（会员20%-2%，掌柜20%-12%，运营商20%-15%）</text>；</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>城市运营商直接邀请升级掌柜奖励<text class="color_word">200元</text>/位；</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<!--  #ifndef   H5 -->
							<text decode="true">城市运营商成就的市场（小于等于 2级）每新增一名掌柜奖励<text class="color_word">100元</text>/位；</text>
							<!--  #endif -->
							<!--  #ifdef   H5 -->
							<text decode="true">城市运营商成就的市场（=&lt; 2级）每新增一名掌柜奖励<text class="color_word">100元</text>/位；</text>
							<!--  #endif -->
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>城市运营商邀请商家入驻本平台，获得商家营业额<text class="color_word">1%</text>奖励；</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>城市运营商邀请城市合伙人，获得城市合伙人签约金额<text class="color_word">30%</text>/位奖励。</text>
						</view>
					</view>
					
					<view class="part_box tit">
						<view class="left_cube">
							<view class="big_ball">5</view>
						</view>
						<view class="right_cube">
							<text class="big_tit_letter">城市合伙人</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>签约城市合伙人合同成为城市管理中心的合伙人（公司授权）线下签约<text class="color_word">（金额29800元）</text>。</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>城市合伙人邀请商家入驻本平台，获得商家营业额<text class="color_word">1%</text>奖励</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>城市合伙人获得签约城市所有商家营业额的<text class="color_word">1%</text>奖励（多个合伙人平均分）</text>
						</view>
					</view>
					
					<view class="part_box tit">
						<view class="left_cube">
							<view class="big_ball">6</view>
						</view>
						<view class="right_cube">
							<text class="big_tit_letter">商家奖励说明</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>所有达标商家获得全球商家营业额分润<text class="color_word">1%</text>奖励</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>钻石商家：5W>月营业额>=2W,拿一份分润的<text class="color_word">50%</text>奖励</text>
						</view>
					</view>
					
					<view class="part_box">
						<view class="left_cube">
							<view class="small_ball"></view>
						</view>
						<view class="right_cube">
							<text>明星商家：月营业额>=5W,拿一份分润的<text class="color_word">100%</text>（有多个商家达标时，多个商家进行平均分配）</text>
						</view>
					</view>
					
				</view>
				
				<image :src="getImgSrc('tuijian/tj29.png')" mode="widthFix" class="bottom_img"></image>
				
			</view>
			
		</view>
		
	</view>
	
	
</template>

<script>
	
	var _self;
	export default {
		data() {
			return {
				mbr:false
			}
		},
		onLoad(opt) {
			_self=this;
			console.log(opt);
			if(opt.mbr != undefined){
				_self.mbr = opt.mbr == "会员" ? false : true;
			}
		},
		methods: {
			goUpGrade(){
				uni.navigateTo({
					url:"member_upgrade1"
				})
			}
		}
	}
	
</script>

<style>
	@import url("css/member_upgrade2.css");
</style>
