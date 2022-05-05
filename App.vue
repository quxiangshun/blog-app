<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.initLogin()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			initLogin() {
				const userInfo = uni.getStorageSync('userInfo')
				const accessToken = uni.getStorageSync('jhEducationToken')
				if(userInfo && accessToken) {
					this.$store.commit('setState', {userInfo, accessToken})
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	/* 公共样式 */
	@import url("@/common/css/common.css");
	
	/* #ifndef APP-PLUS-NVUE */
	/* 导入图标，官方建议使用本地方式~@开头 */
	@import url("~@/static/icon/iconfont.css");
	/* 微信小程序开发工具不支持网络链接，只支持本地方式。打包上线时，只支持在线方式且使用https://开头的网络文件 */
	/* @import url("https://at.alicdn.com/t/font_xxxx.css"); */
	
	/* 彩色图标 */
	@import url("~@/static/icon/iconfont-app-icon.css");
	/* #endif */
</style>
