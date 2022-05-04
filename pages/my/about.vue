<template>
	<view>
		<view class="center column">
			<image class="logo" src="/static/logo.png" lazy-load mode="widthFix"></image>
			<text class="version">Version 1.0.0</text>
		</view>
		<view class="center-content">
			<p>网云音乐是一款专注于发现与分享的音乐产品,DJ,好友推荐及社交功能,为用户打造全新的音乐生活.360软件管家免费下载!</p>
			<p>网云音乐是一款专注于发现与分享的音乐产品,DJ,好友推荐及社交功能,为用户打造全新的音乐生活.360软件管家免费下载!</p>
			<p>网云音乐是一款专注于发现与分享的音乐产品,DJ,好友推荐及社交功能,为用户打造全新的音乐生活.360软件管家免费下载!</p>
		</view>
		
		<view class="bottom-fixed center bottom">
			Copyright &copy; 2022 xiaolingdang.net All rights.
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: $jh-color-grey;
	}
	.logo {
		width: 240rpx;
		margin-top: 60rpx;
		margin-bottom: 20rpx;
	}
	.version {
		font-size: 30rpx;
		color: $jh-color-primary;
		font-weight: bold;
	}
	.center-content {
		font-size: 30rpx;
		color: $jh-text-color-black;
		margin-top: 50rpx;
		padding: 0 30rpx;
		
		p {
			text-indent: 2em;
			margin-bottom: 20rpx;
		}
	}
	
	.bottom {
		bottom: 10rpx;
		font-size: 30rpx;
		color: $jh-text-color-grey;
		background-color: $jh-color-grey;
	}
</style>
