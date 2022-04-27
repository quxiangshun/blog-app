<template>
	<view class="course-header">
		<image class="img" :src="course.mainImage" lazy-load></image>
		<view class="header-info">
			<view class="price-info">
				<!-- 优惠价 -->
				<text v-if="course.priceDiscount">￥{{course.priceDiscount}}</text>
				<!-- 原价 -->
				<text :class="{price: course.priceDiscount}">￥{{course.priceOriginal}}</text>
				<text v-if="course.priceDiscount" class="youhui">优惠价</text>
			</view>
			<view class="title">
				{{course.title}}
			</view>
			<view class="count">
				<text class="iconfont icon-haoping2">{{course.goodRate}}好评</text>
				<text class="iconfont icon-touxiang2">{{course.studyTotal}}人在学</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			course: {
				type: Object,
				default: () => ({
					id: 1,
					title: '朝花夕拾',
					studyTotal: 580,
					goodRate: '100%', // 好评率
					mainImage: 'https://img2.baidu.com/it/u=63249423,2260265143&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500', // 主图
					isFree: 0, // 0付费 1免费
					priceOriginal: 999, // 原价
					priceDiscount: 499 // 优惠价
				})
			}
		}
	}
</script>

<style lang="scss">
	.course-header {
		.img {
			width: 750rpx;
			height: 420rpx;
		}

		.header-info {
			padding: 25rpx;
			background-color: #FFFFFF;
			border: 25rpx solid $jh-color-grey;
			border-left: 0;
			border-right: 0;
		}

		.price-info {
			text {
				margin-right: 15rpx;

				&:first-child {
					color: $jh-text-color-red;
					font-size: 46rpx;
					font-weight: bold;
				}
			}

			.price {
				color: #B6BBBF;
				font-size: 30rpx;
				text-decoration: line-through;
			}

			.youhui {
				color: $jh-text-color-red;
				font-size: 20rpx;
				border: 1rpx solid $jh-text-color-red;
				border-radius: 10rpx;
				padding: 0 3rpx;
			}
		}

		.title {
			color: #1D1D1F;
			font-size: 35rpx;
			font-weight: bold;
			padding-left: 8rpx;
		}

		.count {
			padding: 15rpx 0;

			text {
				margin-right: 15rpx;
				color: #7D828F;
				background-color: $jh-color-grey;
				padding: 15rpx;
				border-radius: 30rpx;
			}
		}
	}
</style>
