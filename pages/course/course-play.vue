<template>
	<view class="course-play">
		<!-- #ifndef APP-PLUS -->
		<video id="myVideo" style="width: 750rpx; height: 423rpx;" :poster="videoMidea.mainImage"
			:src="videoMidea.videoUrl"></video>
		<!-- #endif -->
		
		<!-- 课程标题与详情按钮 -->
		<view class="space-between course-info">
			<text class="title">标题</text>
			<view class="right">
				<text>详情</text>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		<!-- 课程列表 -->
		<course-dir :isBuy="true"></course-dir>
		
		<!-- 底部按钮 -->
		<view class="bottom center">
			<!-- #ifdef APP-PLUS -->
			<view class="btn-item one column">
				<text class="iconfont icon-Share-Outline"></text>
				<text>分享</text>
			</view>
			<!-- #endif -->
			<view class="btn-item one column">
				<text class="iconfont icon-edit"></text>
				<text>评价</text>
			</view>
		</view>
	</view>
</template>

<script>
	let videoContext = null
	import courseDir from './components/course-dir.vue'
	export default {
		components: {
			courseDir
		},
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
		onReady(option) {
			// #ifndef MP-ALIPAY
			videoContext = uni.createVideoContext('myVideo', this)
			// #endif
		},
	}
</script>

<style lang="scss">
	.course-play {
		padding-bottom: 100rpx;
	}
	.course-info {
		padding: 30rpx;
		font-weight: bold;
		border-bottom: $jh-underline;
		font-size: 38rpx;
		
		.title {
			width: 500rpx;
			font-size: 35rpx;
			line-height: 60rpx;
			color: $jh-text-color-black;
		}
		.right>text {
			font-size: 28rpx;
			line-height: 60rpx;
			color: $jh-text-color-black;
		}
	}
	.bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #FFFFFF;
		border-top: $jh-underline;
		.btn-item {
			text {
				text-align: center;
				color: $jh-text-color-grey;
				font-size: 25rpx;
			}
		}
		.iconfont {
			font-size: 38rpx !important;
		}
	}
</style>
