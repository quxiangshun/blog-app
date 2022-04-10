<template>
	<view class="category-box">
		<!-- slice(开始下标, 结束小标)，返回指定范围的元素，包头不包尾（前闭后开） -->
		<view v-for="(item, index) in categoryList.slice(0, 7)" :key="index">{{item.name}}</view>
		<view>全部分类</view>
	</view>
</template>

<script>
	export default {
		props: {
			categoryList: {
				type: Array,
				default: () => [{
						id: 1,
						name: '京剧'
					},
					{
						id: 2,
						name: '黄梅戏'
					},
					{
						id: 3,
						name: '昆剧'
					},
					{
						id: 4,
						name: '沪剧'
					},
					{
						id: 5,
						name: '越剧'
					},
					{
						id: 6,
						name: '淮剧'
					},
					{
						id: 7,
						name: '小调'
					},
					{
						id: 8,
						name: '粤剧'
					},
				]
			}
		}
	}
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
