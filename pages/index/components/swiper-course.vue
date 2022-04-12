<template>
	<view class="list-box">
		<view class="title space-between center">
			<view class="center">
				<text class="name">{{name}}</text>
				<text v-if="word" class="word">{{word}}</text>
			</view>
			<view class="all">
				<text>全部</text>
				<text class="iconfont icon-right"></text>
			</view>
		</view>
		
		<swiper class="list-swiper" next-margin="30rpx">
			<swiper-item v-for="(n, index) in column" :key="index">
				<course-item v-for="(item, i) in courseData.slice(index * row, (index + 1) * row)" :key="i" :item="item"></course-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import courseItem from '@/components/common/course-item.vue'
	import courseData from '@/mock/courseData.js'
	export default {
		components: {
			courseItem
		},
		props: {
			name: {
				type: String,
				default: '热门推荐'
			},
			word: { // HOT
				type: String,
				default: null
			},
			column: { // 默认swiper-item展示2列
				type: Number,
				default: 2
			},
			row: { // 默认swiper-item展示4行
				type: Number,
				default: 4
			},
			courseData: {
				type: Array,
				default: () => courseData
			}
		}
	}
</script>

<style lang="scss">
	.list-box {
		margin-top: 60rpx;

		.name {
			font-size: 38rpx;
			font-weight: 500;
			color: #303133;
			margin-right: 10rpx;
		}

		.word {
			font-size: 20rpx;
			background-image: linear-gradient(to right, $jh-color-orange, $jh-text-color-red);
			color: #FFFFFF;
			padding: 0 10rpx;
			// 左上 右上 右下 左下
			border-radius: 30rpx 30rpx 30rpx 0;
		}

		.all {
			font-weight: normal;
			color: $jh-text-color-grey;
			font-size: 28rpx;

			.iconfont {
				font-size: 25rpx;
			}
		}

		.list-swiper {
			height: 800rpx;

			.swiper-item {
				background-color: red;
			}
		}
	}
</style>
