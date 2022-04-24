<template>
	<view class="index-box">
		<!-- #ifdef MP -->
		<!-- 搜索框在小程序中显示 在组件上面添加click.native是使用原生的click-->
		<search-input @click.native="navTo('/pages/search/search')"></search-input>
		<!-- #endif -->
		<!-- 轮播图 -->
		<jh-banner :bannerList="bannerList"></jh-banner>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			:up="upOption">
			<!-- 
			@init="mescrollInit" 
			@down="downCallback" 
			@up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致)
			
			 :down="downOption" :up="upOption" 绝大部分情况无需配置
			 :top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" (常用)
			 字节跳动小程序 ref="mescrollRef" 必须配置
			 此处支持写入原生组件 -->
			<!-- <view v-for="data in dataList"> 数据列表... </view> -->

			<!-- 分类区域 -->
			<category-box :categoryList="categoryList"></category-box>
			<view class="list-container">
				<!-- 热门推荐 -->
				<swiper-course name="热门推荐" word="HOT" :courseData="hotCourseList" :params="{sort: 'hot'}"></swiper-course>
				<scroll-course name="近期上新" word="NEW" :courseData="newCourseList" :params="{sort: 'new'}"></scroll-course>
				<swiper-course name="免费精选" word="FREE" :courseData="freeCourseList" :params="{isFree: 1}"></swiper-course>
				<list-course name="付费精品" word="NICE" :courseData="niceCourseList" :params="{isFree: 0}"></list-course>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";

	import searchInput from '@/components/common/search-input.vue'
	import jhBanner from '@/components/common/jh-banner.vue'
	import categoryBox from './components/category-box.vue'
	import swiperCourse from './components/swiper-course.vue'
	import scrollCourse from './components/scroll-course.vue'
	import listCourse from './components/list-course.vue'
	import api from '@/api/course.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
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
				bannerList: [],
				categoryList: [],
				// 热门列表数据
				hotCourseList: [],
				freeCourseList: [],
				newCourseList: [],
				niceCourseList: [],
				downOption: {
					// use: true, // 是否启用下拉刷新; 默认true
					// auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					// native: false, // 是否使用系统自带的下拉刷新; 默认false; 仅mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
					// autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
					// isLock: false, // 是否锁定下拉刷新,默认false;
					offset: 50, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
					// inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
					// outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
					// bottomOffset: 20, // 当手指touchmove位置在距离body底部20upx范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
					// minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
					// beforeEndDelay: 0, // 延时结束的时长 (显示加载成功/失败的时长, android小程序设置此项结束下拉会卡顿, 配置后请注意测试)
					// bgColor: "#E75A7C", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
					// textColor: "#fff", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
					// textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
					// textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
					textLoading: '加载中 ...' // 加载中的提示文本
				},
				upOption: {
					// use: true, // 是否启用上拉加载; 默认true
					// auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					// isLock: false, // 是否锁定上拉加载,默认false;
					// isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10, // 每页数据的数量
						// time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					// noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
					// offset: 80, // 距底部多远时,触发upCallback(仅mescroll-uni生效, 对于mescroll-body则需在pages.json设置"onReachBottomDistance")
					// bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
					// textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
					// textLoading: '加载中 ...', // 加载中的提示文本
					textNoMore: '-- 我是有底线的 --', // 没有更多数据的提示文本
					// toTop: {
					// 	// 回到顶部按钮,需配置src才显示
					// 	src: "https://www.mescroll.com/img/mescroll-totop.png", // 图片路径
					// 	offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
					// 	duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
					// 	zIndex: 9990, // fixed定位z-index值
					// 	left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
					// 	right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
					// 	bottom: 120, // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
					// 	safearea: false, // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取mescroll组件props的safearea值)
					// 	width: 72, // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
					// 	radius: "50%" // 圆角, 默认"50%" (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
					// },
					// empty: {
					// 	use: true, // 是否显示空布局
					// 	icon: "https://www.mescroll.com/img/mescroll-empty.png", // 图标路径
					// 	tip: '~ 暂无相关数据 ~', // 提示
					// 	btnText: '去逛逛 >', // 按钮
					// 	fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
					// 	top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
					// 	zIndex: 99 // fixed定位z-index值
					// },
					onScroll: true // 是否监听滚动事件, 默认false, 仅mescroll-uni生效; mescroll-body直接声明onPageScroll (配置为true时,可@scroll="scroll"获取到滚动条位置和方向; 注意监听列表滚动是非常耗性能的,很容易出现卡顿,非特殊情况不要配置此项)
				},

			}
		},
		// 如果要使用await，必须配置async
		// async onLoad() {
		onLoad() {
			// uni.startPullDownRefresh()
			// #ifdef APP-PLUS
			this.updateSearchInputPlaceholderData()
			// #endif
			// // const res = await request({url: '/article/api/advert/show/1'})
			// this.loadBannerData()
			// this.loadCategoryData()

			// // 查询热门课程
			// this.loadHotCourseData()
			// this.loadFreeCourseData()
			// this.loadNewCourseData()
			// this.loadNiceCourseData()
		},
		// onPullDownRefresh() {
		// // #ifdef APP-PLUS
		// this.updateSearchInputPlaceholderData()
		// // #endif
		// // const res = await request({url: '/article/api/advert/show/1'})
		// this.loadBannerData()
		// this.loadCategoryData()

		// // 查询热门课程
		// this.loadHotCourseData()
		// this.loadFreeCourseData()
		// this.loadNewCourseData()
		// this.loadNiceCourseData()
		// uni.stopPullDownRefresh()
		// },
		/**
		 * 监听原生标题栏按钮点击事件，参数为Object
		 * 
		 * onlyFromCamera: 是否只能从相机扫码，不允许从相册选择图片，默认是false
		 * scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'] 一维码、二维码、DataMarix、pdf417
		 */
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
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
		/**
		 * 监听搜索框点击事件
		 */
		onNavigationBarSearchInputClicked() {
			// console.log('点击原生搜索框')
			// 通过封装的混合文件，跳转到搜索页
			this.navTo('/pages/search/search')
		},
		methods: {
			/* https://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewStyles
			setStyle({"titleNView": {"searchInput": {"placeholder": "java uniapp"}}}) 
			
			通过setStyle设置样式，需要先获取当前页面的实例
			https://uniapp.dcloud.io/tutorial/page.html#%E9%A1%B5%E9%9D%A2%E8%B0%83%E7%94%A8%E6%8E%A5%E5%8F%A3
			*/
			updateSearchInputPlaceholderData() {
				// 搜索框提示内容从搜索框中获取
				let hot = ['App ・ 微信小程序', 'Java ・ Springboot', 'SpringCloud ・ SpringSecurity', 'Vue ・ React']
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
			// 查询轮播图数据
			async loadBannerData() {
				const {
					data
				} = await api.getAdvertList(1)
				this.bannerList = data
			},
			// 查询分类数据
			async loadCategoryData() {
				const {
					data
				} = await api.getCategoryList();
				this.categoryList = data
			},
			// 查询热门推荐数据
			async loadHotCourseData() {
				const {
					data
				} = await api.getList({
					sort: 'hot'
				}, 1, 8)
				this.hotCourseList = data.records
			},
			async loadFreeCourseData() {
				const {
					data
				} = await api.getList({
					// 0收费 1免费
					isFree: 1
				}, 1, 8)
				this.freeCourseList = data.records
			},
			async loadNewCourseData() {
				const {
					data
				} = await api.getList({
					sort: 'new'
				})
				this.newCourseList = data.records
			},
			async loadNiceCourseData() {
				const {
					data
				} = await api.getList({
					sort: 'nice'
				})
				this.niceCourseList = data.records
			},
			/*下拉刷新的回调, 重置列表为第一页 (此处可删,mixins已默认)，并且回调this.upCallback*/
			// downCallback() {
			// 	// this.mescroll.resetUpScroll();
			// 	console.log("下拉刷新")
			// },
			/*上拉加载的回调*/
			async upCallback(page) {
				let pageNum = page.num
				let pageSize = page.size
				// console.log("上拉加载的回调", page)

				// 如果是第一页，则下拉刷新
				if (page.num === 1) {
					this.loadBannerData()
					this.loadCategoryData()

					// 查询热门课程
					this.loadHotCourseData()
					this.loadFreeCourseData()
					this.loadNewCourseData()
				}


				// this.loadNiceCourseData()

				// mixin默认延时500自动结束加载
				// setTimeout(()=>{
				// 	this.mescroll.endErr();
				// }, 500)

				const {
					data
				} = await api.getList({
					sort: 'nice',
					isFree: 0
				}, page.num, page.size)
				this.niceCourseList = data.records

				const currentList = data.records

				// 判断是否是第一页，是则将原数据清空
				if (page.num === 1) this.niceCourseList = []
				//追加数据
				this.niceCourseList = this.niceCourseList.concat(currentList)

				// 请求成功，隐藏加载状态
				//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				this.mescroll.endBySize(currentList.length, data.total);
			}
		}
	}
</script>

<style>
	.list-container {
		padding: 0 30rpx;
	}
</style>
