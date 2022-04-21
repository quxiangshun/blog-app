<template>
	<view class="category row">
		<scroll-view class="left" scroll-y="true" >
			<view class="title">
				<view class="active">人工智能1</view>
				<view>2</view>
				<view>3</view>
				<view>4</view>
				<view>5</view>
				<view>6</view>
				<view>7</view>
				<view>8</view>
				<view>9</view>
				<view>10</view>
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y="true" >
			<view class="tag">
				<view>11</view>
				<view>22</view>
				<view>33</view>
				<view>44</view>
				<view>55</view>
				<view>66</view>
				<view>77</view>
				<view>88</view>
				<view>99</view>
				<view>1010</view>
			</view>
		</scroll-view>
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
		height: 100%;
	}
	.category {
		display: flex;
		height: 100%;
		.left {
			background-color: #F8F9FB;
			width: 260rpx;
			border-radius: 0 25rpx 25rpx 0;
			.title {
				view {
					color: #888888;
					text-align: center;
					font-size: 30rpx;
					width: 100%;
					padding: 55rpx 30rpx;
					// 在分类前面加上竖线表示激活
					// 在激活之前先把父元素取相对定位
					position: relative;
					&::before {
						position: absolute;
						content: '';
						width: 0;
						height: 0;
						border-right: 6rpx solid $jh-color-primary;
						border-radius: 30rpx;
						left: 0;
						top: 50%;
						// 切换过度效果
						transform: translateY(-50%);
						transform: 0.3s;
					}
				}
				.active {
					color: $jh-color-primary;
					font-size: 33rpx;
					font-weight: bold;
					&::before {
						height: 50rpx;
					}
				}
			}
		}
		.right {
			
		}
	}
</style>
