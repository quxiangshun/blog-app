<template>
	<view>
		<web-view v-if="isOpen(url)" :src="url"></web-view>
		<view v-else class="tip column">
			<text>如需浏览，请长按网址复制后使用浏览器访问</text>
			<text selectable="true">{{url}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: null
			}
		},
		onLoad(option) {
			this.url = option.url
		},
		methods: {
			isOpen() {
				if (this.url) {
					// 不包含以下域名不允许访问
					return this.url.indexOf('www.taobao.com') !== -1
				}
			}
		}
	}
</script>

<style lang="scss">
	.tip {
		position: relative;
		top: 200rpx;
		width: 500rpx;
		margin: 0 auto;
		/* 自动换行 */
		word-wrap: break-word;
		font-size: 30rpx;
		text-align: center;

		text:first-child {
			font-size: 40rpx;
			font-weight: blod;
			margin-bottom: 30rpx;
		}
	}
</style>
