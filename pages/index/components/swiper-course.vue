<template>
	<list-box :name="name" :word="word" :params="params">
		<swiper class="list-swiper" next-margin="30rpx" :style="{height: `${200 * row}rpx`}">
			<swiper-item v-for="(n, index) in column" :key="index">
				<course-item v-for="(item, i) in courseData.slice(index * row, (index + 1) * row)" :key="i"
					:item="item"></course-item>
			</swiper-item>
		</swiper>
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
				default: () => []
			},
			params: Object, // 点击'全部'按钮要向搜索页传递的参数
		}
	}
</script>

<style lang="scss">
</style>
