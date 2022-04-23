<template>
	<list-box :name="name" :word="word">
		<scroll-view class="list-scroll noScorll" scroll-x="true">
			<view class="list-scroll-view" v-for="(item, i) in courseData.slice(0, 8)" :key="i">
				<course-item :item="item" :isColumn="true"></course-item>
			</view>
		</scroll-view>
	</list-box>
</template>

<script>
	import listBox from './list-box.vue'
	import courseItem from '@/components/common/course-item.vue'
	export default {
		components: {
			listBox,
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
			courseData: {
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		// 不换行，一行显示
		white-space: nowrap;
		height: 380rpx;
		.list-scroll-view {
			display: inline-block;
			width: 310rpx;
			padding: 0 10rpx;
			margin-right: 20rpx;
			border-radius: 20rpx;
			box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
			background-color: #FFFFFF;
		}
	}
</style>
