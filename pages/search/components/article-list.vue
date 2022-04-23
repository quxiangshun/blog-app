<template>
	<view>
		<down-bar :params="params" @search="search"></down-bar>
	</view>
</template>

<script>
	import downBar from './down-bar.vue'
	export default {
		components: {
			downBar
		},
		props: {
			params: {
				type: Object,
				default: null
			},
			content: {
				type: String,
				default: ''
			}
		},
		methods: {
			/**
			 * this.$emit('search', {labelId: labelId, categoryId: label.categoryId})
			 * @param {Object} data
			 */
			search(data) {
				console.log('数据:::', data, this.content, this.params)
			}
		}
	}
</script>

<style>
</style>
