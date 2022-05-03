<template>
	<view>
		<view class="order-item" v-for="(item, index) in orderList" :key="index">
			<view class="base-info center space-between">
				<text>{{item.updateDate}}</text>
				<text>订单号：{{item.orderId}}</text>
			</view>
			<course-item v-for="(course, ci) in item.courseList" :key="ci" :item="course"></course-item>
			<view class="shifu">
				<text>实付：</text>
				<text>{{item.priceDiscount || item.pricePayable}}</text>
			</view>
			<view class="option center space-between">
				<!-- 订单状态：1待支付、2交易成功、3交易关闭 -->
				<text v-if="item.status === 1" class="red">待支付</text>
				<text v-if="item.status === 2" class="grey">交易成功</text>
				<text v-if="item.status === 3" class="grey">交易关闭</text>
				<view>
					<!-- 
					 待支付：显示取消订单、立即支付
					 交易成功：不显示任何按钮
					 教师关闭：显示删除按钮
					 -->
					<button v-if="item.status === 1" size="mini" @click="cancelOrder(item.orderId)">取消订单</button>
					<button v-if="item.status === 1" type="warn" size="mini" @click="orderPay(item)">立即支付</button>
					<button v-if="item.status === 3" size="mini" @click="deleteOrder(item.orderId)">删除订单</button>
				</view>
			</view>
		</view>

		<view v-if="isIOS && isShow" class="mask" @touchmove.stop.prevent="()=>{}" catchtouchmove="true"></view>

		<view v-if="isIOS && isShow" class="bottom-ios bottom-fixed" @touchmove.stop.prevent="()=>{}"
			catchtouchmove="true">
			<view class="title center">
				<text>确定支付</text>
				<text @click="showHidePay">取消</text>
			</view>
			<view class="price space-between">
				<text>支付金额</text>
				<text>{{payPrice}}</text>
			</view>
			<view class="price space-between">
				<text>当前余额</text>
				<text>{{balance}}</text>
			</view>
			<button @click="iosPay" class="btn" :loading="loading" :disabled="loading">{{isPay ? '立即支付' : '余额不足，立即充值'}}</button>
		</view>
	</view>
</template>

<script>
	import courseItem from '@/components/common/course-item.vue'
	import api from '@/api/order.js'
	export default {
		components: {
			courseItem
		},
		data() {
			return {
				orderList: [],
				isIOS: false, // 是否为APP端的IOS设备
				isShow: false, // 显示ios支付窗口
				balance: 0, // IOS设备余额
				currentOrder: {}, // 当前应付订单
				loading: false,
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.isIOS = uni.getSystemInfoSync().platform === 'ios'
			// #endif

			this.loadData()
		},
		computed: {
			payPrice() {
				// 支付金额
				return this.currentOrder.priceDiscount || this.currentOrder.pricePayable
			},
			isPay() {
				return this.balance >= this.payPrice
			}
		},
		methods: {
			loadData() {
				this.getUserOrderList()
			},
			/**
			 * 查询用户订单列表
			 */
			async getUserOrderList() {
				const {
					data
				} = await api.getUserOrderList()
				this.orderList = data
			},
			/**
			 * 删除订单
			 * @param {Object} orderId
			 */
			deleteOrder(orderId) {
				uni.showModal({
					content: '确定删除该订单记录？',
					success: async (res) => {
						if (res.confirm) {
							const res = await api.deleteOrder(orderId)
							if (res.code = 20000) {
								this.$util.msg('删除成功')
								this.loadData()
							} else {
								this.$util.msg('删除失败，请重试')
							}
						}
					}
				})
			},
			async orderPay(item) {
				this.currentOrder = item
				if (this.isIOS) {
					this.loading = true
					// 是app端ios平台，则弹出
					this.showHidePay()
					// 查询余额
					const {
						data
					} = await api.getUserBalance()
					this.balance = data
					this.loading = false
				} else {
					const data = {
						price: this.payPrice,
						orderId: this.currentOrder.orderId
					}
					// 非app端ios，则跳转到订单支付页面
					this.navTo(`/pages/order/order-pay?params=${JSON.stringify(data)}`)
				}

			},
			/**
			 * 取消订单
			 * @param {Object} orderId
			 */
			cancelOrder(orderId) {
				uni.showModal({
					content: '确定取消该订单记录？',
					success: async (res) => {
						if (res.confirm) {
							const res = await api.cancelOrder(orderId)
							if (res.code = 20000) {
								this.$util.msg('取消成功')
								this.loadData()
							} else {
								this.$util.msg('取消失败，请重试')
							}
						}
					}
				})
			},
			showHidePay() {
				this.isShow = !this.isShow
			},
			/**
			 * ios弹窗中点击的按钮
			 */
			async iosPay() {
				const data = {
					price: this.payPrice,
					orderId: this.currentOrder.orderId
				}
				if(this.isPay) {
					// 余额充足，直接支付
					this.loading = true
					uni.showLoading({
						title: '支付中，请勿离开此页面',
						mask: true
					})
					const res = await api.orderPayIOS(data)
					uni.hideLoading()
					// 支付成功，关闭弹窗
					this.showHidePay()
					if(res.code === 20000) {
						uni.showToast({
							title: '支付成功'
						})
						this.loadData()
					} else {
						uni.showModal({
							content: '支付失败，请重试！原因：' + res.message,
							showCancel: false
						})
					}
				} else {
					// 余额不足，跳转到我的余额，进行充值
					this.navTo(`/pages/order/my-balance?params=${JSON.stringify(data)}`)
				}
			}
		}
	}
</script>

<style lang="scss">
	.order-item {
		background-color: #FFFFFF;
		padding: 20rpx 30rpx;
		margin-bottom: 20rpx;
		font-size: 25rpx;
		border-bottom: $jh-underline;

		.base-info {
			color: $jh-text-color-black;
		}

		.shifu {
			text-align: right;
			line-height: 70rpx;

			text:last-child {
				font-size: 35rpx;
				color: $jh-text-color-red;
			}
		}

		.option {
			button {
				font-size: 20rpx;
				margin-left: 10rpx;
			}

			.red {
				color: $jh-text-color-red;
			}

			.grey {
				color: $jh-text-color-grey;
			}
		}
	}

	.bottom-ios {
		padding: 30rpx 40rpx;
		border-top: $jh-underline;

		.title {
			font-size: 38rpx;
			margin-bottom: 20rpx;
			text-align: center;

			text:first-child {
				flex: 1;
				margin-left: 70rpx;
			}

			text:last-child {
				color: $jh-text-color-grey;
				font-size: 35rpx;
			}
		}

		.price {
			font-size: 30rpx;
			line-height: 90rpx;

			text:last-child {
				color: $jh-text-color-red;
			}
		}

		.btn {
			background-color: $jh-color-primary;
			color: #FFFFFF;
			border-radius: 50rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			margin-top: 20rpx;

			// loading状态会有一个边框，移除后加载的边框
			&::after {
				border: none;
			}
		}
	}
</style>
