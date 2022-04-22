<template>
	<view class="keyword">
		<view class="title">热门搜索</view>
		<view class="tag-list">
			<view>1</view>
			<view>1</view>
			<view>1</view>
			<view>1</view>
		</view>
		<view class="title space-between">
			<text>历史搜索</text>
			<text>清空</text>
		</view>
		<view class="tag-list">
			<view>1</view>
			<view>1</view>
			<view>1</view>
			<view>1</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.keyword {
		padding: 25rpx;

		.title {
			font-size: 30rpx;
			color: #222222;

			text:last-child {
				color: #999
			}
		}

		.tag-list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 20rpx;
			margin-bottom: 60rpx;

			view {
				font-size: 25rpx;
				color: #999;
				border: 1rpx solid #999;
				border-radius: 8rpx;
				padding: 6rpx 15rpx;
				margin: 10rpx;
				// 超过一行处理(不换行以省略号代替)
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
