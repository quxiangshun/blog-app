<template>
	<view class="banner-box">
		<!-- 轮播图  ${bannerBackground || '#345DC2'}如果为空则显示和导航栏颜色一致，这个导航栏颜色是在page.json文件中设置的 -->
		<view class="banner-bg"
			:style="{'background-image': `linear-gradient(${bannerBackground || '#345DC2'} 50%, #FFF)`}"></view>
		<!-- 
		背景色 
		indicator-dots: 显示指示点
		indicator-color: 指示点颜色
		indicator-active-color: 指示点激活颜色
		autoplay: 自动切换
		interval: 自动切换时长
		duration: 动画时长
		circular: 是否采用衔接滑动，即播放到末尾后重新回到开头
		current: 当前所在滑块的 index
		-->
		<swiper class="banner-swiper" :indicator-dots="true" indicator-color="rgba(255,255,255,0.5)"
			indicator-active-color="#FFFFFF" :autoplay="true" :interval="4000" :duration="1000" :circular="true"
			:current="current" @change="swiperChange">
			<swiper-item class="swiper-item" v-for="(item, index) in bannerList" :key="index">
				<image @click="navTo(`${item.advertUrl}`)" :src="item.imageUrl"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			bannerList: {
				"type": Array,
				default: () => [{
						id: 1,
						imageUrl: '/static/images/banner1.jpg',
						// 背景图主色调
						background: '#45328C',
						advertUrl: '/pages/course/coure-details'
					},
					{
						id: 2,
						imageUrl: '/static/images/banner2.jpg',
						background: '#006C00',
						advertUrl: '/pages/course/coure-details'
					},
					{
						id: 3,
						imageUrl: '/static/images/banner3.jpg',
						background: '#0072B7',
						advertUrl: '/pages/course/coure-details'
					}
				]
			}
		},
		data() {
			return {
				// 当前所在滑块的index
				current: 0,
				// 背景色
				bannerBackground: '',
			}
		},
		watch: {
			// 解决首次加载背景色问题
			bannerList: {
				handler(newVal) {
					if (newVal && newVal.length > 0) {
						// 获取第一个元素中的背景色，然后设置
						this.current = 0
						// 设置第一张图背景色
						this.bannerBackground = this.bannerList[0] && this.bannerList[0].background
					}
				},
				// vue语法，表示第一次加载就执行此监听器
				immediate: true
			}
		},
		methods: {
			/**
			 * 每次切换滑块时触发
			 * @param {Object} event current 改变时会触发 change 事件，event.detail = {current: current, source: source}
			 */
			swiperChange(event) {
				this.current = event.detail.current
				// 轮播图切换背景色
				this.bannerBackground = this.bannerList[this.current].background
			}
		}
	}
</script>

<style lang="scss">
	.banner-box {
		padding-top: 120rpx;
		/* #ifdef APP-PLUS */
		padding-top: calc(var(--status-bar-height) + 120rpx);

		/* #endif */
		.banner-bg {
			position: absolute;
			top: 0;
			width: 100%;
			height: 470rpx;
			/* #ifdef APP-PLUS */
			padding-top: calc(var(--status-bar-height) + 470rpx);
			/* #endif */
			background-color: red;
			// 颜色渐变
			background-image: linear-gradient(red 50%, #FFF);
			// 过度效果
			transform: .5s;
		}

		.banner-swiper {
			width: 100%;
			height: 350rpx;

			.swiper-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 15rpx;
				}
			}
		}
	}
</style>
