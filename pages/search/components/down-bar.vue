<template>
	<view class="down-bar row sticky-box">
		<view class="one">
			<view class="center active">
				<text>综合排序</text>
				<!-- <text class="iconfont icon-down1"></text> -->
				<text class="iconfont icon-up"></text>
			</view>
			<view class="item-list" v-if="false">
				<view class="name">综合排序</view>
				<view class="name">最新排序</view>
				<view class="name">热门排序</view>
			</view>
			
			<!-- 蒙层 -->
			<view class="cover" v-if="false"></view>
		</view>
		<view class="one">
			<view class="center">
				<text>全部分类</text>
				<text class="iconfont icon-down1"></text>
				<!-- <text class="iconfont icon-up"></text> -->
			</view>
			<view class="item-list" v-if="false">
				<!-- <view class="category">分类页面</view> -->
			</view>
			
			<!-- 蒙层 -->
			<view class="cover" v-if="false"></view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.down-bar {
		z-index: 100;
		background-color: #FFFFFF;
		font-size: 30rpx;
		line-height: 80rpx;
	}
	.item-list {
		z-index: 100;
		background-color: #FFFFFF;
		position: absolute;
		left: 0;
		right: 0;
		.name {
			padding-left: 80rpx;
		}
		.category {
			height: 580rpx;
		}
	}
	// 点击之后的效果
	.active {
		color: $jh-text-color-blue;
	}
	// 粘顶（滚动到底部停留在顶部）
	.sticky-box {
		position: -webkit-sticky; // Safari浏览器
		position: sticky; // 其他浏览器
		// var(--window-top)表示内容区域距离顶部的距离（APP和小程序是0， H5是NavigationBar 的高度）
		top: var(--window-top);
	}
	// 蒙层
	.cover {
		z-index: 99;
		position: fixed;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: $jh-text-color-black;
		opacity: 0.2;
	}
</style>
