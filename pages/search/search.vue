<template>
	<view>

		<!-- #ifdef MP -->
		<!-- navBack()小括号一定要添加，不添加的话会添加event方法，会添加一个对象，写了小括号表示没有参数 -->
		<uni-search-bar radius="100" placeholder="搜索你想要的内容" @confirm="doSearch" :focus="true" v-model="content"
			@cancel="navBack(1)">
		</uni-search-bar>
		<!-- #endif -->
	</view>
</template>

<script>
	// 页面实例
	let webView = null;
	export default {
		data() {
			return {
				params: null, // 其他页面传递过来的参数
				content: null, // 搜索内容
			}
		},
		onLoad(option) {
			// #ifdef APP-PLUS
			// 获取当前页面实例
			webView = this.$scope.$getAppWebview();
			// #endif 

			// 如果有参数，不自动获取焦点，没有参数，自动获取焦点
			if (option.params) {
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
		// 取消按钮，点击事件
		onNavigationBarButtonTap(e) {
			// 此处不需要判断index，因为只有一个按钮，如果有多个按钮通过index判断
			this.navBack()
		},
		/**
		 * 监听原生标题栏搜索输入框输入内容变化事件
		 * 
		 * @param {Object} e e.text获取输入框输入的内容
		 */
		onNavigationBarSearchInputChanged(e) {
			this.content = e.text
		},
		/**
		 * 用户点击软键盘上的搜索按钮时触发
		 * 
		 * @param {Object} e e.text获取输入框输入的内容
		 */
		onNavigationBarSearchInputConfirmed(e) {
			// #ifdef APP-PLUS
			// 失去焦点
			webView.setTitleNViewSearchInputFocus(false)
			// #endif 
			this.doSearch()
		},
		methods: {
			doSearch() {
				uni.showLoading()
			},
		}
	}
</script>

<style>

</style>
