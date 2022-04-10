<template>
	<view class="category-box">
		<view>前端</view>
		<view>前端</view>
		<view>前端</view>
		<view>前端</view>
		<view>前端</view>
		<view>前端</view>
		<view>前端</view>
		<view>全部分类</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.category-box {
		display: flex;
		justify-content: space-around;
		// 一行显示不下自动换行
		flex-wrap: wrap;
		// 上右下左
		padding: 20rpx 30rpx 0 30rpx;
		>view {
			width: 160rpx;
			height: 70rpx;
			background-color: $jh-color-grey;
			text-align: center;
			line-height: 70rpx;
			font-size: 26rpx;
			border-radius: 20rpx;
			overflow: hidden;
			margin-top: 15rpx;
		}
	}
</style>
