<template>
	<view class="container">
		<tab-bar ref="tabBar" :tabs="categoryList" v-model="tabIndex"></tab-bar>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab,i) in categoryList" :key="i">
				<mescroll-item ref="mescrollItem" :i="i" :index="tabIndex" :tabs="categoryList" :height="height">
				</mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MescrollItem from "./components/article-swiper-item.vue";
	import courseApi from '@/api/course.js'

	export default {
		components: {
			MescrollItem
		},
		data() {
			return {
				tabIndex: 0,
				categoryList: [],
				height: '400px'
			}
		},
		onLoad() {
			// 需要固定swiper的高度 (需减去悬浮tabs的高度64rpx)
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(64) + 'px'
			this.loadCategoryData()
		},
		/**
		 * 监听搜索框点击事件
		 */
		onNavigationBarSearchInputClicked() {
			// 通过封装的混合文件，跳转到搜索页
			this.navTo('/pages/search/search')
		},
		methods: {
			// 轮播菜单
			swiperChange(e) {
				this.tabIndex = e.detail.current
				// 左右切换重新计算移动宽度
				this.$refs.tabBar.changeTab(this.tabIndex)
			},
			// 查询分类数据
			async loadCategoryData() {
				uni.showLoading({
					title: '加载中'
				})
				const {
					data
				} = await courseApi.getCategoryList();
				data.unshift({id: null, name: '推荐'})
				this.categoryList = data
				uni.hideLoading()
			},
		}
	}
</script>

<style>
	page, .container {
		height: 100%;
		overflow: hidden;
	}
</style>
