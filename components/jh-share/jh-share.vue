<template>
	<view>
		<!-- 遮罩蒙层 -->
		<view v-show="isShow" @click="showHandler()" class="mask" @touchmove.stop.prevent="()=>{}"></view>
		<view v-show="isShow" class="share-body">
			<scroll-view class="share-scroll noScorll" scroll-x="true">
				<view class="share-item">
					<image src="/static/share/weixin.png"></image>
					<view>微信好友</view>
				</view>
				
				<view class="share-item">
					<image src="/static/share/pengyouquan.png"></image>
					<view>微信朋友圈</view>
				</view>
				<view class="share-item">
					<image src="/static/share/weibo.png"></image>
					<view>新浪微博</view>
				</view>
				<view class="share-item">
					<image src="/static/share/qq.png"></image>
					<view>QQ好友</view>
				</view>
				<view class="share-item">
					<image src="/static/share/link.png"></image>
					<view>复制链接</view>
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
			}
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
