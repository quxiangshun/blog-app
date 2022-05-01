<template>
	<view>
		<view class="money column center">
			<text>余额</text>
			<text>0.00币</text>
		</view>
		<view class="recharge">
			<view>充值</view>
			<view class="list">
				<!-- 此处不要使用item：app端是1开始，小程序是0开始 -->
				<view v-for="(item, index) in 6" :key="index">
					<view>{{index + index}}00币</view>
					<view>￥{{index + index}}00</view>
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
			<button class="btn" :loading="loading" :disabled="loading" @click="iosPayHandler">立即充值</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false
			}
		},
		methods: {
			iosPayHandler() {

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
</style>
