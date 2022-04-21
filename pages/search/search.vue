<template>
	<view>
		搜索
	</view>
</template>

<script>
	// 页面实例
	let webView = null;
	export default {
		data() {
			return {
				params: null
			}
		},
		onLoad(option) {
			// #ifdef APP-PLUS
			// 获取当前页面实例
			webView = this.$scope.$getAppWebview();
			// #endif 
			
			// 如果有参数，不自动获取焦点，没有参数，自动获取焦点
			if(option.params) {
				// 接收参数
				// console.log('option', JSON.parse(option.params))
				this.params = JSON.parse(option.params)
				this.doSearch()
			} else {
				// #ifdef APP-PLUS
				// 获取焦点
				webView.setTitleNViewSearchInputFocus(true)
				// #endif 
			}
		},
		methods: {
			doSearch() {
				uni.showLoading()
			}
		}
	}
</script>

<style>

</style>
