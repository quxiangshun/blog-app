<template>
	<view class="confirm-order">
		<view class="goods">
			<text>商品信息</text>
			<course-item></course-item>
		</view>
		<view class="option-pay card">
			<view class="title">支付方式</view>

			<!-- APP端的IOS设备上显示 -->
			<view v-if="true" class="ios">
				<text>余额：</text>
				<text>0.00币（不足支付）</text>
			</view>

			<!-- 非APP端的IOS设备上显示 -->
			<radio-group v-else @change="radioChange">
				<label class="pay-item center space-between">
					<view class="left center">
						<image src="/static/pay/alipay.png"></image>
						<view>支付宝支付</view>
					</view>
					<radio value="alipay" checked style="transform: scale(0.8);" />
				</label>
				<label class="pay-item center space-between">
					<view class="left center">
						<image src="/static/pay/wxpay.png"></image>
						<view>微信支付</view>
					</view>
					<radio value="wxpay" style="transform: scale(0.8);" />
				</label>
			</radio-group>
		</view>
		<view class="card price">
			<view class="space-between">
				<text>商品金额</text>
				<text>￥888.99</text>
			</view>
			<view class="space-between">
				<text>优惠价</text>
				<text>￥668.99</text>
			</view>
		</view>

		<view class="pay space-between">
			<view class="">
				<text class="grey">实付金额：</text>
				<text>￥668.99</text>
			</view>
			<view class="">
				<button class="btn" loading="true">充值并支付</button>
			</view>
		</view>
	</view>
</template>

<script>
	import courseItem from '@/components/common/course-item.vue'
	export default {
		components: {
			courseItem
		},
		data() {
			return {
				course: null, // 课程信息

			}
		},
		onLoad(option) {
			// 微信小程序需要转义，非微信小程序需要转义”.replace(/%/g, '%25')“,，否则会报错
			// #ifndef MP-WEIXIN
			if (option.course) this.course = JSON.parse(decodeURIComponent(option.course.replace(/%/g, '%25')))
			if (option.courseGroup) this.course = JSON.parse(decodeURIComponent(option.courseGroup.replace(/%/g,
				'%25')))
			// #endif

			// #ifdef MP-WEIXIN
			if (option.course) this.course = JSON.parse(decodeURIComponent(option.course))
			if (option.courseGroup) this.course = JSON.parse(decodeURIComponent(option.courseGroup))
			// #endif

		},
		methods: {
			radioChange() {

			}
		}
	}
</script>

<style lang="scss">
	.confirm-order {
		font-size: 29rpx;
		color: #333;
	}

	.goods {
		padding: 20rpx 30rpx 0 30rpx;
		background-color: #FFFFFF;
	}

	.card {
		padding: 0 30rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		box-shadow: 1px 0 rpx 0 rgba(0, 0, 0, 0.08);
		border-radius: 20rpx;
	}

	.option-pay {
		.title {
			line-height: 90rpx;
			border-bottom: $jh-underline;
		}

		.ios {
			line-height: 90rpx;

			text:last-child {
				color: $jh-text-color-red;
			}
		}

		.pay-item {
			line-height: 90rpx;

			.left {
				image {
					width: 60rpx;
					height: 60rpx;
				}

				text {
					font-size: 33rpx;
					padding-left: 20rpx;
				}
			}
		}
	}

	.price {
		>view {
			line-height: 90rpx;
			border-bottom: 1px solid #F8F9FB;
		}
	}

	.pay {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		align-items: center;
		height: 100rpx;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		border-top: $jh-underline;

		view:first-child>text:last-child {
			color: $jh-text-color-red;
			font-size: 35rpx;
		}

		.btn {
			background-color: $jh-color-primary;
			color: #FFFFFF;
			border-radius: 50rpx;
			line-height: 80rpx;
			font-size: 30rpx;

			// loading状态会有一个边框，移除后加载的边框
			&::after {
				border: none;
			}
		}
	}
</style>
