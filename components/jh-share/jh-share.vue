<template>
	<view>
		<!-- 遮罩蒙层 -->
		<view v-show="isShow" @click="showHandler()" class="mask" @touchmove.stop.prevent="()=>{}"></view>
		<view v-show="isShow" class="share-body">
			<scroll-view class="share-scroll noScorll" scroll-x="true">
				<view class="share-item" v-for="(item, index) in providerList" :key="index">
					<image :src="item.icon"></image>
					<view>{{item.name}}</view>
				</view>
			</scroll-view>
			<view class="share-cancel" @click="showHandler()">取消</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				title: '天韵戏曲交流',
				shareText: 'uni-app可以同时发布成原生App、小程序、H5，邀请你一起体验！',
				href: "https://uniapp.dcloud.io",
				image: '',
				// https://uniapp.dcloud.io/api/plugins/share.html#%E5%88%86%E4%BA%AB
				shareType: 0, // 0图文 1文字 2图片
				providerList: [], // 提供商
			}
		},
		// 此处不能写onLoad，这个是组件，没有页面钩子，使用vue原生钩子
		created() {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					console.log('success', e);
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '微信好友',
									id: 'weixin',
									sort: 0,
									icon: '/static/share/weixin.png'
								})
								data.push({
									name: '微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline',
									sort: 1,
									icon: '/static/share/pengyouquan.png'
								})
								break;
							case 'sinaweibo':
								data.push({
									name: '新浪微博',
									id: 'sinaweibo',
									sort: 2,
									icon: '/static/share/weibo.png'
								})
								break;
							case 'qq':
								data.push({
									name: 'QQ好友',
									id: 'qq',
									sort: 3,
									icon: '/static/share/qq.png'
								})
								break;
							default:
								break;
						}
					}
					data.push({
						name: '复制链接',
						id: 'copy',
						sort: 4,
						icon: '/static/share/link.png'
					})
					this.providerList = data.sort((x, y) => {
						return x.sort - y.sort
					});
				},
				fail: (e) => {
					console.log('获取分享通道失败', e);
					uni.showModal({
						content: '获取分享通道失败',
						showCancel: false
					})
				}
			});
		},
		methods: {
			// 显示隐藏分享组件
			showHandler() {
				this.isShow = !this.isShow
			}
		}
	}
</script>

<style lang="scss">
	.mask {
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.share-body {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;

		.share-scroll {
			background-color: #F7F7F7;
			width: 100%;
			height: 200rpx;
			display: flex;
			white-space: nowrap;
			padding-top: 45rpx;

			.share-item {
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 25%;
			}

			image {
				width: 60rpx;
				height: 60rpx;
			}

			view {
				color: $jh-text-color-grey;
				font-size: 25rpx;
				padding-top: 10rpx;
			}
		}

		.share-cancel {
			background-color: #FFFFFF;
			text-align: center;
			width: 100%;
			padding: 25rpx 0;
		}
	}
</style>
