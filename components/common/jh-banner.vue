<template>
	<view class="banner-box">
		<!-- 轮播图 -->
		<view class="banner-bg"></view>
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
		<swiper class="banner-swiper" :indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#FFFFFF"
			:autoplay="true" :interval="4000" :duration="1000" :circular="true" :current="current" @change="change">
			<swiper-item class="swiper-item">
				<image src="../../static/images/banner1.jpg"></image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image src="../../static/images/banner2.jpg"></image>
			</swiper-item>
			<swiper-item class="swiper-item">
				<image src="../../static/images/banner3.jpg"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前所在滑块的index
				"current": 0
			}
		},
		methods: {
			/**
			 * 每次切换滑块时触发
			 * @param {Object} event current 改变时会触发 change 事件，event.detail = {current: current, source: source}
			 */
			change(event) {
				console.log(event.detail.current, this.current)
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
