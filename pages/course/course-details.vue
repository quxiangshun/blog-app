<template>
	<view>
		<!-- 主图和基本信息 -->
		<course-header></course-header>
		<view class="course-details" :style="'height:' + pageHeight + 'px'">
			<tab-bar :tabs="tabs" v-model="tabIndex"></tab-bar>
			<swiper class="swiper-box" :duration="300" :current="tabIndex" circular @change="changeTab">
				<swiper-item v-for="(item, index) in tabs" :key="index">
					<scroll-view class="scroll-box" :scroll-y="enableScrollY" :upper-threshold="0"
						@scrolltoupper="scrolltoupper">
						<view class="details-info">
							<course-info v-if="index === 0"></course-info>
							<course-dir v-if="index === 1"></course-dir>
							<course-comment v-if="index === 2"></course-comment>
							<course-group v-if="index === 3"></course-group>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 底部按钮 立即购买 -->
		<bottom-btn></bottom-btn>
	</view>
</template>

<script>
	import courseHeader from './components/course-hearder.vue'
	import courseInfo from './components/course-info.vue'
	import courseDir from './components/course-dir.vue'
	import courseComment from './components/course-comment.vue'
	import courseGroup from './components/course-group.vue'
	import bottomBtn from './components/bottom-btn.vue'
	import tabBar from '@/components/common/tab-bar.vue'
	import tabs from '@/config/course-details-tabs.js'
	export default {
		components: {
			courseHeader,
			courseInfo,
			courseDir,
			courseComment,
			courseGroup,
			bottomBtn,
			tabBar
		},
		data() {
			return {
				tabs, // 标签选项卡数据
				tabIndex: 0, // 当前选项卡下标,
				pageHeight: 3000, //手机屏幕的视口高度
				statusNavHeight: 0, // 状态栏和导航栏的高度
				enableScrollY: false, // 详情区域是否允许纵向滚动，默认false不允许
				detailTop: 0, // 详情区域距离顶部的距离
			}
		},
		onLoad(option) {
			console.log(option.id)
			this.getPageHeight()
			// #ifdef APP-PLUS
			// 禁用点击状态栏回到顶部
			this.noStatusScrollTop()
			// #endif
		},
		// 第一次页面渲染完成之后触发
		onReady() {
			let view = uni.createSelectorQuery().in(this).select(".course-details");
			view.fields({
				rect: true
			}, data => {
				// console.log("节点的位置为", JSON.stringify(data));
				this.detailTop = data.top
			}).exec();

		},
		/**
		 * 页面滚动到底部监听事件，不是scroll-view组件
		 */
		onReachBottom() {
			this.enableScrollY = true
		},
		/**
		 * 监听页面滚动
		 * @param {Object} e
		 */
		onPageScroll(e) {
			if(this.detailTop - this.statusNavHeight <= e.scrollTop) {
				// 如果页面到达底部则将详情区域滚动条开启
				this.enableScrollY = true
				return
			}
			if(this.enableScrollY && e.scrollTop < this.detailTop) {
				this.enableScrollY = false
			}
		},
		methods: {
			changeTab(event) {
				this.tabIndex = event.detail.current
				
				// 切换选项，页面切换到底部，只暴露scrollView区域
				uni.pageScrollTo({
					scrollTop: this.detailTop,
					duration: 300
				})
			},
			// 获取当前页面视口高度
			getPageHeight() {
				const res = uni.getSystemInfoSync()
				// 系统：ios、android
				const system = res.platform
				// 状态栏高度
				const statusBarHeight = res.statusBarHeight

				// uni提供的获取导航栏高度的的接口只支持百度小程序，因为在这边需要计算
				if (system === 'android') { // android 默认是48像素
					this.statusNavHeight = statusBarHeight + 48
				} else if (system === 'ios') { // ios 默认是44像素
					this.statusNavHeight = statusBarHeight + 44
				}
				// windowHeight是可使用高度(屏幕高度-状态栏高度),
				// 但是在page中配置"type":"transparent"透明渐变，res.windowHeight和res.screenHeight相等
				// console.log(res.screenHeight, res.windowHeight)
				this.pageHeight = res.screenHeight - this.statusNavHeight
				// console.log('pageHeight', this.pageHeight)
			},
			// 关于scrollView组件滚动到顶部
			scrolltoupper() {
				// 1. 让页面滚动条回到顶部
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 150
				})
				// 2. 禁用详情scrollView滚动
				this.enableScrollY = false
			},
			noStatusScrollTop() {
				// 此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
				const currentWebview = this.$scope.$getAppWebview();
				
				// 禁用点击状态栏回到顶部
				currentWebview.setStyle({
					"scrollsToTop": false
				});
			}
		}
	}
</script>

<style lang="scss">
	.course-details {
		overflow: hidden;

		.swiper-box,
		.scroll-box {
			height: 100%;
		}

		.details-info {
			// 被隐藏的80rpx(标签选项卡高度)，此处添加需要添加立即够吗button的高度
			padding-bottom: 180rpx;
		}
	}
</style>
