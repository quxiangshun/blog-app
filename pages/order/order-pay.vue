<template>
	<view>
		<view class="option-pay card">
			<view class="title">支付方式</view>

			<radio-group @change="radioChange">
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
		<view class="card price space-between">
			<text>实付金额</text>
			<!-- 原价或套餐总原价 -->
			<text>￥{{data.price}}</text>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<button class="btn" :loading="loading" :disabled="loading" @click="wxPayHandler">立即支付</button>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<button class="btn" :loading="loading" :disabled="loading" @click="payHandler">立即支付</button>
		<!-- #endif -->
	</view>
</template>

<script>
	import api from '@/api/order.js'
	import payMixin from './mixins/pay.js'
	export default {
		mixins: [payMixin],
		data() {
			return {
				data: {
					price: 0, // 支付金额
					orderId: null, // 订单id
					openid: null, // 小程序的openid
				}

			}
		},
		onLoad(option) {
			if (option.params) {
				this.data = JSON.parse(option.params)
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.card {
		margin: 0 30rpx;
		padding: 0 20rpx;
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
		line-height: 90rpx;
		font-size: 30rpx;

		text:last-child {
			color: $jh-text-color-red
		}
	}

	.btn {
		margin: 30rpx 40rpx;
		border-top: $jh-underline;
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
</style>
