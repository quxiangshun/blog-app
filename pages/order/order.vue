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
				orderList: []
			}
		},
		onLoad() {
			this.loadData()
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
			orderPay(item) {

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
</style>
