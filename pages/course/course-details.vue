<template>
	<view>
		<!-- 主图和基本信息 -->
		<course-header :course="course"></course-header>
		<view class="course-details" :style="'height:' + pageHeight + 'px'">
			<tab-bar :tabs="tabs" v-model="tabIndex"></tab-bar>
			<swiper class="swiper-box" :duration="300" :current="tabIndex" circular @change="changeTab">
				<swiper-item v-for="(item, index) in tabs" :key="index">
					<scroll-view class="scroll-box" :scroll-y="enableScrollY" :upper-threshold="0"
						@scrolltoupper="scrolltoupper">
						<view class="details-info">
							<course-info v-if="index === 0" :detailUrls="course.detailUrls"></course-info>
							<course-dir v-if="index === 1" :chapterList="chapterList" :isBuy="isBuy"
								:activeObj="activeObj" @playVideo="playVideo"></course-dir>
							<course-comment v-if="index === 2" :commentList="commentList"></course-comment>
							<course-group v-if="index === 3" :groupList="groupList"></course-group>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 底部按钮 立即购买 -->
		<bottom-btn :btnText="isBuy || course.isFree? '立即观看' : '立即购买'" @clickBottom="clickBottom"></bottom-btn>

		<!-- #ifdef APP-PLUS -->
		<!-- 分享组件 -->
		<jh-share ref="jhShare" :shareData="course"></jh-share>
		<!-- #endif -->

		<!-- 试看窗口 -->
		<view v-if="videoUrl" class="video-box mask" @click="closePlay" @touchmove.stop.prevent="()=>{}">
			<view class="name">
				<text>免费试看</text>
				<text class="iconfont icon-close"></text>
			</view>
			<video id="playVideo" class="video" :src="videoUrl"></video>
		</view>
	</view>
</template>

<script>
	import courseHeader from './components/course-hearder.vue'
	import courseInfo from './components/course-info.vue'
	import courseDir from './components/course-dir.vue'
	import courseComment from './components/course-comment.vue'
	import courseGroup from './components/course-group.vue'
	import bottomBtn from './components/bottom-btn.vue'
	import tabs from '@/config/course-details-tabs.js'
	import api from '@/api/course.js'
	export default {
		components: {
			courseHeader,
			courseInfo,
			courseDir,
			courseComment,
			courseGroup,
			bottomBtn
		},
		data() {
			return {
				tabs, // 标签选项卡数据
				tabIndex: 0, // 当前选项卡下标,
				pageHeight: 3000, //手机屏幕的视口高度
				statusNavHeight: 0, // 状态栏和导航栏的高度
				enableScrollY: false, // 详情区域是否允许纵向滚动，默认false不允许
				detailTop: 0, // 详情区域距离顶部的距离
				id: null, // 课程ID
				course: {}, // 课程基本信息
				chapterList: [], // 章节信息
				commentList: [], // 评论信息
				groupList: [], // 套餐信息
				isBuy: false, // 是否购买课程，默认false未购买
				videoUrl: null, // 播放视频地址
				videoContext: null, // 播放器实例
				activeObj: {}, // 点击的章节下标
			}
		},
		onLoad(option) {
			this.getPageHeight()
			// #ifdef APP-PLUS
			// 禁用点击状态栏回到顶部
			this.noStatusScrollTop()
			// #endif
			// console.log(option.id)
			// 获取课程ID，查询课程相关数据
			this.id = option.id
			this.loadData()
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
			// 获取当前播放实例
			this.videoContext = uni.createVideoContext('playVideo', this)
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
			if (this.detailTop - this.statusNavHeight <= e.scrollTop) {
				// 如果页面到达底部则将详情区域滚动条开启
				this.enableScrollY = true
				return
			}
			if (this.enableScrollY && e.scrollTop < this.detailTop) {
				this.enableScrollY = false
			}
		},
		// #ifdef APP-PLUS
		/**
		 * 监听App端右上角分享按钮
		 * @param {Object} e
		 */
		onNavigationBarButtonTap(e) {
			if (e.type === 'share') {
				this.$refs.jhShare.showHandler()
			}
		},
		// #endif
		// #ifndef APP-PLUS || H5 || MP-BAIDU
		/**
		 * 针对小程序端分享
		 * @param {Object} res
		 */
		// #endif
		onShareAppMessage(res) {
			return {
				title: this.course.title,
				path: this.$util.routePath(),
				ImageUrl: this.course.mainImage
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
			},
			loadData() {
				// 0. 判断是否购买课程
				this.getCourseIsBuy()
				// 1. 查询课程基本信息
				this.getCourseById()
				// 2. 查询章节列表
				this.getChapterSectionById()
				// 3. 查询评论列表
				this.getCourseCommentById()
				// 4. 查询组合套餐列表
				this.getCourseGroupById()
			},
			async getCourseIsBuy() {
				// 如果已登录，则判断是否已购买
				// {nav: false}表示未登录不用跳转登录页
				const isLogin = this.$util.isLogin({
					nav: false
				})
				if (isLogin) {
					const {
						data
					} = await api.getCourseIsBuy(this.id);
					this.isBuy = data.isBuy
					// console.log('isbuy', data, data.isBuy)
				}
			},
			/**
			 * 查询课程基本信息
			 */
			async getCourseById() {
				const {
					data
				} = await api.getCourseById(this.id);
				this.course = data
				// 将当前课程标题动态传递给导航
				uni.setNavigationBarTitle({
					title: this.course.title
				})
			},
			async getChapterSectionById() {
				const {
					data
				} = await api.getChapterSectionById(this.id);
				this.chapterList = data
			},
			async getCourseCommentById() {
				const {
					data
				} = await api.getCourseCommentById(this.id);
				this.commentList = data
			},
			async getCourseGroupById() {
				const {
					data
				} = await api.getCourseGroupById(this.id);
				this.groupList = data
			},
			/**
			 * 点击底部按钮触发，从bottom-btn组件中传递的事件
			 */
			clickBottom() {
				if (this.isBuy || this.course.isFree) {
					// 已购买或免费，跳转视频播放页
					this.navTo(`/pages/course/course-play?id=${this.id}`, {login: true})
				} else {
					// 未购买，跳转确认购买页面
					this.navTo(`/pages/order/confirm-buy?course=${encodeURIComponent(JSON.stringify(this.course))}`, {login: true})
				}
			},
			// 关闭播放窗口
			closePlay() {
				this.videoContext.stop()
				this.videoUrl = null
			},
			/**
			 * 试看视频播放
			 * @param {Object} obj 章节信息
			 */
			playVideo(obj) {
				// 解决小程序高亮显示问题
				this.activeObj = obj.activeObj
				// console.log(obj.section)
				if (this.isBuy) {
					this.navTo(`/pages/course/course-play?id=${this.id}`, {login: true})
					return
				}
				this.videoUrl = obj.section.videoUrl
				this.$nextTick(() => {
					// 自动播放
					this.videoContext.play()
				})
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

	.video-box {
		z-index: 100;
		text-align: center;

		.name {
			color: #FFFFFF;
			position: relative;
			top: 380rpx;
			/* #ifdef MP */
			top: 300rpx;
			/* #endif */
			font-size: 38rpx;
			font-weight: bold;
		}

		.icon-close {
			margin-left: 20rpx;
		}

		.video {
			width: 750rpx;
			height: 430rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
