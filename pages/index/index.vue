<template>
	<view class="index-box">
		<!-- #ifdef MP -->
		<!-- 搜索框在小程序中显示 -->
		<search-input></search-input>
		<!-- #endif -->
		<!-- 轮播图 -->
		<jh-banner></jh-banner>
		<!-- 分类区域 -->
		<category-box></category-box>
		<view class="list-container">
			<!-- 热门推荐 -->
			<swiper-course name="热门推荐" word="HOT"></swiper-course>
			<swiper-course name="免费精选" word="FREE"></swiper-course>
			<scroll-course name="近期上新" word="NEW"></scroll-course>
			<list-course name="付费精品" word="NICE"></list-course>
		</view>
	</view>
</template>

<script>
	import searchInput from '@/components/common/search-input.vue'
	import jhBanner from '@/components/common/jh-banner.vue'
	import categoryBox from './components/category-box.vue'
	import swiperCourse from './components/swiper-course.vue'
	import scrollCourse from './components/scroll-course.vue'
	import listCourse from './components/list-course.vue'
	export default {
		components: {
			searchInput,
			jhBanner,
			categoryBox,
			swiperCourse,
			scrollCourse,
			listCourse
		},
		data() {
			return {
				title: ''
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.updateSearchInputPlaceholderData()
			// #endif
		},
		/**
		 * 监听原生标题栏按钮点击事件，参数为Object
		 * 
		 * onlyFromCamera: 是否只能从相机扫码，不允许从相册选择图片，默认是false
		 * scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'] 一维码、二维码、DataMarix、pdf417
		 */
		onNavigationBarButtonTap(e) {
			if(e.index === 0) {
				// 打开扫一扫功能
				uni.scanCode({
					onlyFromCamera: false,
					scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
					// 如果要在方法中使用this，则使用箭头函数
					success: (res) => {
						// console.log('条码类型：' + res.scanType)
						// console.log('条码内容：' + res.result)
						uni.navigateTo({
							url: `/pages/public/web-view?url=${res.result}`
						})
					},
					fail: (err) => {
						uni.showToast({
							title: '扫码失败',
							icon: ''
						})
					}
				})
			}
		},
		methods: {
			/* https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewStyles
			setStyle({"titleNView": {"searchInput": {"placeholder": "java uniapp"}}}) 
			
			通过setStyle设置样式，需要先获取当前页面的实例
			https://uniapp.dcloud.io/tutorial/page.html#%E9%A1%B5%E9%9D%A2%E8%B0%83%E7%94%A8%E6%8E%A5%E5%8F%A3
			*/
			updateSearchInputPlaceholderData() {
				// 搜索框提示内容从搜索框中获取
				let hot  = ['App ・ 微信小程序', 'Java ・ Springboot', 'SpringCloud ・ SpringSecurity', 'Vue ・ React']
				// 此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
				const currentWebview = this.$scope.$getAppWebview();
				// 动态重设bounce效果
				
				let i = 0
				// 一加载页面就会调用一次
				currentWebview.setStyle({
					"titleNView": {
						"searchInput": {
							"placeholder": hot[i]
						}
					}
				});
				const hotLength = hot.length - 1;
				setInterval(() => {
					i = i < hotLength ? ++i : 0
					currentWebview.setStyle({
						"titleNView": {
							"searchInput": {
								"placeholder": hot[i]
							}
						}
					});
				}, 3000)
			},
			
		}
	}
</script>

<style>
	.list-container {
		padding: 0 30rpx;
	}
</style>
