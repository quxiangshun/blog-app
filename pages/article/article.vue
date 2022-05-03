<template>
	<view class="container">
		<tab-bar :tabs="tabs" v-model="tabIndex"></tab-bar>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab,i) in tabs" :key="i">
				<mescroll-item ref="mescrollItem" :i="i" :index="tabIndex" :tabs="tabs" :height="height">
				</mescroll-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MescrollItem from "./components/article-swiper-item.vue";

	export default {
		components: {
			MescrollItem
		},
		data() {
			return {
				tabIndex: 0,
				tabs: [{
						id: 0,
						name: "课程"
					},
					{
						id: 1,
						name: "文章"
					},
					{
						id: 2,
						name: "问答"
					},
				],
				height: '400px'
			}
		},
		onLoad() {
			// 需要固定swiper的高度 (需减去悬浮tabs的高度64rpx)
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(64) + 'px'
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
