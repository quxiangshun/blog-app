<template>
	<view>
		<!-- 头部空出的距离 -->
		<view class="status-bar">

		</view>
		<view class="my-header">
			<view class="header-content center space-between">
				<view class="left center">
					<image class="header-image" :src="isLogin ? '' : '/static/logo.png'" mode=""></image>
					<view v-if="isLogin" class="header-info column">
						<text class="nickname">线程池</text>
						<text class="username">用户名：休息休息吧</text>
					</view>
					<view v-else class="header-info column">
						<text class="nickname">请登录</text>
					</view>
				</view>
				<text class="iconfont icon-right"></text>
			</view>
		</view>

		<!-- 功能列表 -->
		<jh-list :list="list"></jh-list>
	</view>
</template>

<script>
	import MyListBar from '@/config/my-list-bar.js'
	export default {
		data() {
			return {
				isLogin: false,
				list: MyListBar(), // 调用方法不要缺少小括号
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.status-bar {
		height: calc(var(--status-bar-height) + 48px);
		background-color: $jh-color-primary;
	}

	.my-header {
		background-color: $jh-color-primary;

		.header-content {
			padding: 50rpx 39rpx;
			background-color: #FFFFFF;
			border-radius: 30rpx 30rpx 0 0;
		}

		.left {
			.header-image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 75rpx;
			}

			.header-info {
				margin-left: 30rpx;

				.nickname {
					font-size: 39rpx;
					font-weight: bold;
				}

				.username {
					font-size: 33rpx;
					color: $jh-text-color-grey;
				}
			}
		}

		.icon-right {
			font-size: 35rpx;
			color: $jh-text-color-grey;
		}
	}
</style>
