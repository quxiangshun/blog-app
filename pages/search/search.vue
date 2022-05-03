<template>
	<view>

		<!-- #ifdef MP -->
		<!-- navBack()小括号一定要添加，不添加的话会添加event方法，会添加一个对象，写了小括号表示没有参数 -->
		<uni-search-bar radius="100" placeholder="搜索你想要的内容" @confirm="doSearch" :focus="mpFocus" v-model="content"
			@cancel="navBack(1)">
		</uni-search-bar>
		<!-- #endif -->

		<!-- 搜索关键字组件 -->
		<keyword v-if="!searched" @doSearch="doSearch"></keyword>

		<!-- 标签导航 -->
		<!-- （1. props声明value；2. 修改它时触发input事件传递）
		 传递给子组件的绑定不能写:value="tabIndex"，这个是单向绑定，
		 如果实现双向绑定必须写v-model="tabIndex" -->
		<tab-bar v-if="searched" v-model="tabIndex"></tab-bar>
		
		<!-- <down-bar v-if="searched" :params="params"></down-bar> -->
		
		<!-- 标签体内容 -->
		<block v-if="searched">
			<!-- 子组件 (i: 每个tab页的专属下标;  index: 当前tab的下标) -->
			
			<!-- 如果每个子组件布局不一样, 可拆开写 (注意ref只能为 "mescrollItem下标" 的格式, 另外 :i="下标" :index="tabIndex"也是固定写法) : -->
			<!-- <home ref="mescrollItem0" :i="0" :index="tabIndex"></home>
			<shopcart ref="mescrollItem1" :i="1" :index="tabIndex"></shopcart>
			<user ref="mescrollItem2" :i="2" :index="tabIndex"></user> -->
			
			<course-list ref="mescrollItem0" :i="0" :index="tabIndex" :params="params" :content="content"></course-list>
			<article-list ref="mescrollItem1" :i="1" :index="tabIndex" :params="params" :content="content"></article-list>
			<question-list ref="mescrollItem2" :i="2" :index="tabIndex" :params="params" :content="content"></question-list>
		</block>
	</view>
</template>

<script>
	import keyword from './components/keyword.vue'
	// import downBar from './components/down-bar.vue'
	import courseList from './components/course-list.vue'
	import articleList from './components/article-list.vue'
	import questionList from './components/question-list.vue'
	import MescrollMoreMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js";
	
	// 页面实例
	let webView = null;
	export default {
		mixins: [MescrollMoreMixin], // 多个mescroll-body写在子组件时, 则使用mescroll-more.js补充子组件的页面生命周期
		components: {
			keyword,
			// downBar,
			courseList,
			articleList,
			questionList
		},
		data() {
			return {
				params: null, // 其他页面传递过来的参数
				content: null, // 搜索内容
				// #ifdef MP
				mpFocus: false, // 小程序自动获取焦点，默认false不获取焦点
				// #endif
				searched: false, // 是否搜索过，将keyword隐藏
				tabIndex: 0, // 当前所在标签下标
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
				// #ifdef MP
				this.mpFocus = true
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
			doSearch(obj) {
				// #ifdef MP
				this.mpFocus = false
				// #endif
				this.content = obj && obj.value ? obj.value : this.content
				// console.log(this.content)

				// 搜索过，隐藏关键字keyword.vue组件
				this.searched = true

				// 将当前搜索关键字保存到本地缓存
				this.storageHistory()
				
				// 页面加载完成后调用 $nextTick
				this.$nextTick(() => {
					// 调用搜索的时候进行节流处理，防止太快请求多次
					this.$util.throttle(() => {
						// 触发当前标签页面的列表子组件方法，开始查询
						this.$refs[`mescrollItem${this.tabIndex}`].search()
					}, 1000)
				})
				
				// uni.showLoading()
			},
			storageHistory() {
				// 历史搜索保存到本地的key
				const key = 'history_list'
				// 获取当前本地已经存在的记录
				uni.getStorage({
					key,
					// 写箭头函数，不然里面用不了this
					success: (res) => {
						// console.log('原历史关键字', res.data)
						// 查询到的原历史关键数组，判断数组中是否存在当前关键字
						// 不存在则添加到数组中第一个元素(res.data.unshift()追加到第一个元素)，存在不添加
						this.content && res.data.indexOf(this.content) < 0 && res.data.unshift(this.content)
						// 保存到本地缓存
						uni.setStorageSync(key, res.data)
					},
					fail: (err) => {
						// console.log('获取历史关键字失败', err)
						// 如果没有保存过，则会失败，即进行第一次保存。保存的值不要少了[]，值是一个数组
						this.content && uni.setStorageSync(key, [this.content])
					}
				})
			}
		}
	}
</script>

<style>

</style>
