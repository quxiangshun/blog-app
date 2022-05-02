<template>
	<view>
		<view class="money column center">
			<text>余额</text>
			<text>{{parseFloat(balance).toFixed(2)}}币</text>
		</view>
		<view class="recharge">
			<view>充值</view>
			<view class="list">
				<!-- 此处不要使用item：app端是1开始，小程序是0开始 -->
				<view :class="{active: index === activeIndex}" v-for="(item, index) in moneyList" :key="index"
					@click="clickItem(item, index)">
					<view>{{item}}币</view>
					<view>￥{{item}}</view>
				</view>
			</view>
		</view>
		<view class="desc">
			<view class="">
				充值说明
			</view>
			1.在IOS设备的APP要进行充值后，使用虚拟币消费。<br>
			2.充值后不能在非IOS设备使用，与安卓版和网站余额不通用。<br>
			3.充值后没有使用期限，但不可提现、退换、转让和申请发票。<br>
			4.如遇无法充值、充值失败等问题，可关注[天韵戏曲]公众号，联系我们解决。<br>
			<view class="">

			</view>
		</view>
		<view class="bottom center">
			<button class="btn" :loading="loading" :disabled="disabled" @click="iosPayHandler">立即充值</button>
		</view>
	</view>
</template>

<script>
	// 支付渠道  苹果内部
	let iapChannel = null,
		productId = 'HelloUniappPayment1',
		productIds = ['HelloUniappPayment1', 'HelloUniappPayment6'];

	import api from '@/api/order.js'
	export default {
		data() {
			return {
				loading: false,
				disabled: true, // 禁用按钮（苹果支付前需要检查环境
				activeIndex: 0, // 选中的金额下标, 
				price: 0, // 支付金额
				courseIds: [], // 选中的课程IDs
				balance: 0, // 余额
				applePrice: 0, // 需要充值的金额
				moneyList: [], // 页面渲染的金额
			}
		},
		onLoad(option) {
			if (option.params) {
				const params = JSON.parse(option.params)
				// 1. 接收页面传递过来的参数：支付金额和课程IDs
				this.price = params.price
				this.courseIds = params.courseIds
				// 2. 查询余额
				this.loadData()

				// 获取渠道苹果内部支付
				plus.payment.getChannels((channels) => {
					console.log("获取到channel" + JSON.stringify(channels))
					for (var i in channels) {
						var channel = channels[i];
						if (channel.id === 'appleiap') {
							iapChannel = channel;
							this.requestOrder();
						}
					}
					if (!iapChannel) {
						this.errorMsg()
					}
				}, (error) => {
					this.errorMsg()
				});
			}
		},
		methods: {
			async loadData() {
				// 查询余额
				const {
					data
				} = await api.getUserBalance()
				this.balance = data
				// 3. 计算还差多少金额，则充值多少（取整）
				if (this.price) {
					// apple设备充值金额=余额balance - 付款金额price
					const applePrice = this.balance - this.price
					// cell 向上取整， abs取绝对值
					this.applePrice = Math.ceil(Math.abs(applePrice))
				}
				// 4. 充值列表展示金额
				for (let i = 0; i < 6; i++) {
					this.moneyList.push(this.applePrice + (i * 30))
				}
			},
			/**
			 * @param {Object} item 金额
			 * @param {Object} index 金额对应的下标
			 */
			clickItem(item, index) {
				this.activeIndex = index
				this.applePrice = item
			},
			iosPayHandler() {
				this.loading = true;
				uni.requestPayment({
					provider: 'appleiap',
					orderInfo: {
						productid: this.applePrice
					},
					success: async (e) => {
						this.$util.msg('支付成功')
						// 调用接口，立即扣款进行购买
						const res = await api.orderPayIOS(data)
						// 5. 刷新当前月（跳转到订单页）
						if (res.code === 20000) {
							this.getUserBalance()
							uni.showModal({
								content: '支付完成，立即学习',
								showCancel: false,
								success: () => {
									// 跳转到订单页
									this.navTo(`/pages/order/order`)
								}
							})
						} else {
							uni.showModal({
								content: '支付失败，原因' + res.message,
								showCancel: false
							})
						}
					},
					fail: (e) => {
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					},
					complete: () => {
						console.log("payment结束")
						this.loading = false;
					}
				})
			},
			/**
			 * 苹果检查支付环境
			 */
			requestOrder() {
				uni.showLoading({
					title: '检测支付环境...'
				})
				iapChannel.requestOrder(this.moneyList, (orderList) => { //必须调用此方法才能进行 iap 支付
					this.disabled = false;
					// console.log('requestOrder success666: ' + JSON.stringify(orderList));
					uni.hideLoading();
				}, (e) => {
					// console.log('requestOrder failed: ' + JSON.stringify(e));
					uni.hideLoading();
					this.errorMsg()
				});
			},
			errorMsg() {
				uni.showModal({
					content: "暂不支持苹果 iap 支付",
					showCancel: false
				})
			}
		}
	}
</script>

<style lang="scss">
	.money {
		height: 288rpx;
		background-color: $jh-color-primary;
		color: #FFFFFF;
		font-size: 88rpx;

		text:first-child {
			color: #E7E4E9;
			font-size: 30rpx;
		}
	}

	.recharge {
		margin: 20rpx 0 0 20rpx;
		font-size: 30rpx;
		color: #999999;

		.list {
			margin-top: 20rpx;
			text-align: center;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;

			>view {
				width: 225rpx;
				border: 1px solid $jh-color-grey;
				border-radius: 10rpx;
				background-color: #FFFFFF;
				margin-right: 10rpx;
				margin-bottom: 15rpx;
				padding: 20rpx 0;

				view:first-child {
					color: $jh-text-color-red;
					font-size: 36rpx;
				}
			}
		}
	}

	.desc {
		margin: 0 20rpx;
		font-size: 30rpx;
		line-height: 45rpx;
		color: #6E6D70;

		view:first-child {
			font-weight: bold;
			padding-top: 50rpx;
			padding-bottom: 30rpx;
		}

		view: last-child {
			padding-bottom: 130rpx
		}
	}

	.bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		height: 100rpx;
		border-top: $jh-underline;

		.btn {
			width: 700rpx;
			background-color: #345DC2;
			text-align: center;
			font-size: 35rpx;
			color: #FFFFFF;
			border-radius: 50rpx;
			line-height: 80rpx;

			&::after {
				border: none;
			}
		}
	}

	.active {
		box-shadow: 0 0 0 0.5px $jh-text-color-red;
	}
</style>
