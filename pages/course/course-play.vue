<template>
	<view class="course-play">
		<!-- #ifndef APP-PLUS -->
		<video id="myVideo" style="width: 750rpx; height: 423rpx;" :poster="videoMidea.mainImage"
			:src="videoMidea.videoUrl"></video>
		<!-- #endif -->
	</view>
</template>

<script>
	let videoContext = null
	export default {
		data() {
			return {
				videoMidea: {
					id: 1,
					title: '1-1 项目需求分析项目需求',
					mainImage: 'https://pics6.baidu.com/feed/0e2442a7d933c895ff4183829e8c4cfa830200b0.jpeg?token=02d84b8835896cf4af92fdd5fc822d8d',
					videoUrl: 'https://vd3.bdstatic.com/mda-jkkgqi4rmyigr1gh/sc/mda-jkkgqi4rmyigr1gh.mp4',
				},
			}
		},
		onReady() {
			// #ifndef MP-ALIPAY
			videoContext = uni.createVideoContext('myVideo', this)
			// #endif
		},
	}
</script>

<style>
</style>
