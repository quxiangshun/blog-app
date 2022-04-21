<template>
	<list-box :name="name" :word="word">
		<course-item v-for="(item, i) in courseData" :key="i" :item="item"></course-item>
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
				default: '付费精选'
			},
			word: { // HOT
				type: String,
				default: 'NICE'
			},
			courseData: {
				type: Array,
				default: () => []
			}
		}
	}
</script>

<style lang="scss">
</style>
