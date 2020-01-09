<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			//#ifdef APP-PLUS  
			/*var server = "http://www.jfcma.com"; //检查更新地址  
			var req = { //升级检测数据  
				"appid": plus.runtime.appid,  
				"version": plus.runtime.version  
			};  
			uni.request({  
				url: server,  
				data: req,  
				success: (res) => {  
					if (res.statusCode == 200 && res.data.status === 1) {  
						uni.showModal({ //提醒用户更新  
							title: "更新提示",  
							content: res.data.note,  
							success: (res) => {  
								if (res.confirm) {  
									plus.runtime.openURL(res.data.url);  
								}  
							}  
						})  
					}  
				}  
			})*/  
			//#endif  
			
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
		
	}
</script>

<style>
	/*每个页面公共css */
	
	page{
		background: #fff;
	}
	
	.navigator-hover{
		background: none;
		opacity: 1;
	}
	
	.purple_btn{
		width: 670upx;
		height: 80upx;
		border-radius: 40upx;
		background: #8A3EDF;
		color: #fff;
		text-align: center;
		font-size: 32upx;
		line-height: 80upx;
		border:none;
		outline: none;;
		margin: auto;
	}
	
	.head_out{
		position: fixed;
		z-index: 9999;
		top:0;
		left: 0;
		width: 750upx;
		height: auto;
		background: #fff;
	}
	
	
	.title_padding{
		width: 100%;
		height: var(--status-bar-height);
		/* #ifdef MP-WEIXIN */
		height: calc(44upx + var(--status-bar-height));
		/* #endif */
	}
	
	.title_padding.fix{
		position:fixed;
		top:0;
		left: 0;
		z-index: 999;
		width: 100%;
		height: var(--status-bar-height);
		/* #ifdef MP-WEIXIN */
		height: calc(44upx + var(--status-bar-height));
		/* #endif */
	}
	
	.top_free{
		width: 750upx;
		padding-top: calc(128upx + var(--status-bar-height));
		/* #ifdef MP-WEIXIN */
		padding-top: calc(172upx + var(--status-bar-height));
		/* #endif */
	}
	
	/*通用样式区*/
	.entityObj{
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.baseObj{
		width: 100%;
		display: block;
	}
	
	.floatObj{
		position: absolute;
		z-index: 2;
	}
	
	.floatObjInit{
		position: absolute;
		top:0;
		left: 0;
		z-index: 2;
	}
	
	.centerObj{
		position: absolute;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 2;
	}
	
</style>
