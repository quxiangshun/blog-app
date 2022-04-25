<template>
	<view class="center column">
		<image mode="widthFix" lazy-load @load="load" v-for="(url, index) in detailUrls" :key="index" :src="url">
		</image>
		<image v-if="loading" class="loading" src="/static/images/loading.gif"></image>
		<text v-else class="footer-text">--已经到达底部，没有更多内容了--</text>
	</view>
</template>

<script>
	export default {
		props: {
			detailUrls: {
				type: Array,
				default: () => [
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01e5435ba9f9e6a801213deab59fb7.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653476317&t=f9ca8eb42f5a1fdea5a7c7b082edc95c'
				]
			}
		},
		data() {
			return {
				loading: true,
			}
		},
		methods: {
			load() {
				this.loading = false
			}
		}
	}
</script>

<style lang="scss">
	image {
		width: 100%;
	}

	.loading {
		height: 90rpx;
		width: 90rpx;
		margin-top: 50rpx;
	}

	.footer-text {
		color: #777;
		font-size: 30rpx;
		margin: 20rpx 0;
	}
</style>
