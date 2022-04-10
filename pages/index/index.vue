<template>
	<view class="index-box">
		<!-- #ifdef MP -->
		<!-- 搜索框在小程序中显示 -->
		<search-input></search-input>
		<!-- #endif -->
	</view>
</template>

<script>
	import searchInput from '@/components/common/search-input.vue'
	export default {
		components: { searchInput },
		data() {
			return {
				title: ''
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>
