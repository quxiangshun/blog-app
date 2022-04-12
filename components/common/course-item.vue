<template>
	<view class="course-item":class="{column: isColumn}">
		<view class="item-left">
			<image class="course-img" :src="item.mainImage" lazy-load=""></image>
			<view class="course-time">
				{{item.totalTime}}
			</view>
		</view>
		<view class="item-right column">
			<view class="title">{{item.title}}</view>
			<view class="info">
				<view class="nickname iconfont icon-laoshi2">{{item.nickName}}</view>
				<view class="count">
					<view v-if="!item.isFree" class="money">免费</view>
					<view v-else class="money iconfont icon-moneybag">
						{{item.priceDiscount || item.priceOriginal}}
					</view>
					<view class="iconfont icon-video">{{item.studyTotal}} 人在学</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 是否纵向排列图片和文字 （true 纵向，flase横向）
			isColumn: {
				type: Boolean,
				default: false
			},
			item: {
				type: Object,
				default: () => ({
					id: 1,
					mainImage: '/static/images/banner2.jpg',
					totalTime: '00:59:59',
					title: 'uni-app京剧戏曲节目',
					nickName: '屈想顺',
					isFree: 0, // 是否收费 0免费 1收费
					priceOriginal: 999, // 原价
					priceDiscount: 599, // 优惠价
					studyTotal: 999
				})
			}
		}
	}
</script>

<style lang="scss">
	.course-item {
		display: flex;
		// 纵向排列
		// flex-direction: column;
		width: 100%;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #F1F1F1;
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
				max-width: 365rpx;
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
				// border: 1px solid;
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
