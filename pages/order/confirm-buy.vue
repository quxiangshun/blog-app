<template>
	<view class="confirm-order">
		<view class="goods">
			<text>商品信息</text>
			<!-- 注意此处v-if和v-for在同时使用的时候，v-for有限，此处会报错，所以加一个block或template元素 -->
			<block v-if="course && course.list">
				<course-item v-for="(item, index) in course.list" :key="index" :item="item">
				</course-item>
			</block>
			<course-item v-else :item="course"></course-item>
		</view>
		<view class="option-pay card">
			<view class="title">支付方式</view>

			<!-- APP端的IOS设备上显示 -->
			<view v-if="isIOS" class="ios">
				<text>余额：</text>
				<text>0.00币（不足支付）</text>
			</view>

			<!-- 非APP端的IOS设备上显示 -->
			<radio-group v-else @change="radioChange">
				<!-- #ifndef MP-WEIXIN -->
				<label class="pay-item center space-between">
					<view class="left center">
						<image src="/static/pay/alipay.png"></image>
						<view>支付宝支付</view>
					</view>
					<radio value="alipay" :checked="provider === 'alipay'" style="transform: scale(0.8);" />
				</label>
				<!-- #endif -->
				<!-- #ifndef MP-ALIPAY -->
				<label class="pay-item center space-between">
					<view class="left center">
						<image src="/static/pay/wxpay.png"></image>
						<view>微信支付</view>
					</view>
					<radio value="wxpay" :checked="provider === 'wxpay'" style="transform: scale(0.8);" />
				</label>
				<!-- #endif -->
			</radio-group>
		</view>
		<view class="card price">
			<view class="space-between">
				<text>商品金额</text>
				<!-- 原价或套餐总原价 -->
				<text>￥{{course.priceOriginal || course.totalPrice}}</text>
			</view>
			<view class="space-between" v-if="course.priceDiscount || course.groupPrice">
				<text>优惠价</text>
				<!-- 优惠价或套餐组合价 -->
				<text>￥{{course.priceDiscount || course.groupPrice}}</text>
			</view>
		</view>

		<!-- 解决遮挡底部问题，height是按钮的高度 -->
		<view style="height: 130rpx;"></view>

		<view class="pay space-between">
			<view class="">
				<text class="grey">实付金额：</text>
				<text>￥{{course.priceDiscount || course.groupPrice || course.priceOriginal || course.totalPrice}}</text>
			</view>
			<view class="">
				<button v-if="isIOS" class="btn" :loading="loading" :disabled="loading"
					@click="iosPayHandler">充值并支付</button>
				<!-- #ifdef MP-WEIXIN -->
				<button v-else class="btn" :loading="loading" :disabled="loading" @click="wxPayHandler">提交订单</button>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<button v-else class="btn" :loading="loading" :disabled="loading" @click="payHandler">提交订单</button>
				<!-- #endif -->
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
				course: {}, // 课程信息(此处信息数据结构不一致，一种是商品，一种是套餐)
				isIOS: false, // 是否为APP端的IOS设备
				provider: 'alipay', // 支付方式
				loading: false, // 是否提交

			}
		},
		onLoad(option) {
			// 微信小程序需要转义，非微信小程序需要转义”.replace(/%/g, '%25')“,，否则会报错
			// #ifndef MP-WEIXIN
			if (option.course) this.course = JSON.parse(decodeURIComponent(option.course.replace(/%/g, '%25')))
			if (option.groupCourse) this.course = JSON.parse(decodeURIComponent(option
				.groupCourse.replace(/%/g,
					'%25')))
			// #endif

			// #ifdef MP-WEIXIN
			if (option.course) this.course = JSON.parse(decodeURIComponent(option.course))
			if (option.groupCourse) this.course = JSON.parse(decodeURIComponent(option.groupCourse))
			// 微信小程序选中微信支付
			this.provider = 'wxpay'
			// #endif

			// #ifdef APP-PLUS
			this.isIOS = uni.getSystemInfoSync().platform === 'ios'
			// #endif
		},
		methods: {
			radioChange() {

			},
			// APPLE应用类支付
			iosPayHandler() {

			},
			// 微信小程序支付
			wxPayHandler() {

			},
			// 安卓端APP支付
			payHandler() {

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
