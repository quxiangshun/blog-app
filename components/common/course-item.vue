<template>
	<view class="course-item">
		<view class="item-left">
			<image class="course-img" src="/static/images/banner1.jpg" lazy-load=""></image>
			<view class="course-time">
				12:12:12
			</view>
		</view>
		<view class="item-right column">
			<view class="title">uni-app京剧戏曲节目斤斤计较军军军军军军军军军军</view>
			<view class="info">
				<view class="nickname iconfont icon-laoshi2">屈想顺</view>
				<view class="count">
					<!-- <view class="money">免费</view> -->
					<view class="money iconfont icon-moneybag">199</view>
					<view class="iconfont icon-video">100 人在学</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.course-item {
		display: flex;
		// 纵向排列
		// flex-direction: column;
		width: 100%;
		padding: 20rpx 0;

		.item-left {
			position: relative;
			width: 290rpx;
			height: 160rpx;
			margin-right: 20rpx;

			.course-img {
				width: 290rpx;
				height: 160rpx;
				border-radius: 10rpx;
			}

			.course-time {
				position: absolute;
				bottom: 5rpx;
				right: 5rpx;
				font-size: 22rpx;
				color: #FFFFFF;
				background: rgba(51, 51, 51, 0.4);
				border-radius: 20rpx;
				padding: 0 8rpx;
			}
		}
		
		.item-right {
			// 有公共样式Column代替了flex和纵向布局
			justify-content: space-between;
			// 设置行高，防止强制变形
			height: 160rpx;
			padding-top: 5rpx;
			padding-left: 5rpx;
			.title {
				max-width: 290rpx;
				height: 70rpx;
				line-height: 35rpx;
				font-size: 28rpx;
				font-weight: bold;
				// 显示两行，超出部分...显示
				overflow: hidden;
				text-overflow: ellipsis; // 显示省略号
				-webkit-line-clamp: 2; // 最多两行
				display: -webkit-box; // 块是弹性的
				-webkit-box-orient: vertical; // 排列方式
				white-space: normal; // 空白显示
			}
			.info {
				font-size: 23rpx;
				color: #999;
				align-items: center;
			}
			.count {
				display: flex;
				align-items: center;
				.iconfont {
					font-size: 23rpx;
					color: #222;
				}
				.money {
					color: $jh-color-orange;
					width: 130rpx;
					font-size: 28rpx;
					padding-right: 28rpx;
				}
			}
		}
	}
</style>
