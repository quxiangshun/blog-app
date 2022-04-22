<template>
	<view class="keyword">
		<view class="title">热门搜索</view>
		<view class="tag-list">
			<view v-for="(item, index) in hotList" :key="index" @click="clickTagHandler(item)">{{item}}</view>
		</view>
		<view class="title space-between">
			<text>历史搜索</text>
			<text @click="clearHistory">清空</text>
		</view>
		<view class="tag-list">
			<view v-for="(item, index) in historyList" :key="index" @click="clickTagHandler(item)">{{item}}</view>
		</view>
	</view>
</template>

<script>
	// 历史搜索保存到本地的key
	const key = 'history_list'
	export default {
		data() {
			return {
				// 热门搜索
				hotList: ['Java', 'Python', 'Vue.js', 'React'],
				// 历史搜索，从本地存储区获取历史搜索列表
				historyList: uni.getStorageSync(key) || [],
			}
		},
		methods: {
			// 清空历史数据
			clearHistory() {
				this.historyList = []
				uni.removeStorageSync(key)
			},
			clickTagHandler(content) {
				// #ifdef APP-PLUS
				// 传递给搜索框
				const pages = getCurrentPages()
				const webView = pages[pages.length-1].$getAppWebview();
				webView.setTitleNViewSearchInputText(content)
				// #endif 
				// #ifdef H5
				// 将提示内容清空
				const placeholder = document.querySelector('.uni-page-head-search-placeholder')
				placeholder.innerHTML = ''
				// 传递关键字给输入框
				const inputSearch = document.querySelector('.uni-input-input[type=search]')
				inputSearch.value = content
				// #endif 
				// 触发父组件搜索事件
				this.$emit('doSearch', {
					value: content
				})
			}
		}
	}
</script>

<style lang="scss">
	.keyword {
		padding: 25rpx;

		.title {
			font-size: 30rpx;
			color: #222222;

			text:last-child {
				color: #999
			}
		}

		.tag-list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 20rpx;
			margin-bottom: 60rpx;

			view {
				font-size: 25rpx;
				color: #999;
				border: 1rpx solid #999;
				border-radius: 8rpx;
				padding: 6rpx 15rpx;
				margin: 10rpx;
				// 超过一行处理(不换行以省略号代替)
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
</style>
